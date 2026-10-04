import { moveCurrency, validateJewels } from "../currency";
import { updateUser } from "./users";
import type { State, User } from "@/types/domain";
import type { MarketAction, ApplyAction } from "@/types/reducers";
export function reduceMarket(
  state: State,
  action: MarketAction,
  apply: ApplyAction,
): State {
  const user = state.users.find((u) => u.username === state.session);
  const update = (next: User) => updateUser(state, next);
  switch (action.type) {
    case "list":
      if (!user) throw Error("Entre para anunciar.");
      if (
        action.listing.acceptsOffers &&
        action.listing.offerCurrencies?.length === 0
      )
        throw Error("Selecione ao menos uma moeda para ofertas.");
      if (action.listing.currency === "Jewels")
        validateJewels(action.listing.jewels);
      if (action.listing.price <= 0) throw Error("Informe um preço positivo.");
      if (
        !user.items.some(
          (i) => i.id === action.listing.item.id && i.location === "site",
        )
      )
        throw Error("Item indisponível.");
      if (action.listing.currency === "BRL" && (!user.pix || !user.connected))
        throw Error("Cadastre PIX e vincule Mercado Pago na sua conta.");
      return {
        ...update({
          ...user,
          items: user.items.filter((i) => i.id !== action.listing.item.id),
        }),
        listings: [action.listing, ...state.listings],
      };
    case "cancel": {
      const listing = state.listings.find((l) => l.id === action.id);
      if (!user || listing?.seller !== user.username)
        throw Error("Anúncio indisponível.");
      if (
        state.orders.some(
          (o) => o.listing?.id === listing.id && o.status === "pending",
        )
      )
        throw Error("Aguarde o pagamento reservado expirar ou ser cancelado.");
      return {
        ...update({ ...user, items: [...user.items, listing.item] }),
        listings: state.listings.filter((l) => l.id !== action.id),
        offers: state.offers.filter((o) => o.listingId !== action.id),
      };
    }
    case "buy": {
      const l = state.listings.find((l) => l.id === action.id);
      if (!user || !l) throw Error("Compra indisponível.");
      if (
        state.orders.some(
          (o) =>
            o.listing?.id === l.id &&
            o.status === "pending" &&
            o.user !== user.username,
        )
      )
        throw Error("Item reservado para outro comprador.");
      if (l.seller === user.username)
        throw Error("Você não pode comprar seu anúncio.");
      const buyer = {
        ...moveCurrency(user, l.currency, l.price, l.jewels, "debit"),
        items: [...user.items, { ...l.item, location: "site" as const }],
      };
      const users = state.users.map((u) =>
        u.username === buyer.username
          ? buyer
          : u.username === l.seller
            ? moveCurrency(u, l.currency, l.price, l.jewels, "credit")
            : u,
      );
      return {
        ...state,
        users,
        listings: state.listings.filter((x) => x.id !== l.id),
        offers: state.offers.filter((o) => o.listingId !== l.id),
        transactions: [
          {
            id: crypto.randomUUID(),
            buyer: user.username,
            seller: l.seller,
            item: l.item.name,
            price: l.price,
            currency: l.currency,
            date: new Date().toISOString(),
          },
          ...state.transactions,
        ],
      };
    }
    case "offer":
      if (!user || action.offer.price <= 0) throw Error("Oferta inválida.");
      const offered = state.listings.find(
        (l) => l.id === action.offer.listingId,
      );
      if (
        !offered ||
        !offered.acceptsOffers ||
        offered.seller === user.username
      )
        throw Error("Oferta indisponível.");
      if (
        offered.offerCurrencies?.length &&
        !offered.offerCurrencies.includes(action.offer.currency)
      )
        throw Error("Moeda não aceita pelo vendedor.");
      if (action.offer.currency === "Jewels")
        validateJewels(action.offer.jewels);
      return { ...state, offers: [action.offer, ...state.offers] };
    case "offerStatus": {
      const o = state.offers.find((x) => x.id === action.id);
      const l = state.listings.find((x) => x.id === o?.listingId);
      if (!o || o.status !== "pending" || !l || l.seller !== user?.username)
        throw Error("Oferta indisponível.");
      if (action.status === "rejected")
        return {
          ...state,
          offers: state.offers.map((x) =>
            x.id === o.id ? { ...x, status: "rejected" } : x,
          ),
        };
      if (
        state.orders.some(
          (order) => order.listing?.id === l.id && order.status === "pending",
        )
      )
        throw Error("Item reservado para pagamento.");
      if (o.currency === "BRL") {
        return {
          ...state,
          offers: state.offers.map((x) =>
            x.id === o.id ? { ...x, status: "accepted" } : x,
          ),
          orders: [
            {
              id: crypto.randomUUID(),
              user: o.buyer,
              title: l.item.name,
              amount: o.price,
              coins: 0,
              status: "pending",
              createdAt: new Date().toISOString(),
              listing: { ...l, price: o.price, currency: o.currency },
            },
            ...state.orders,
          ],
        };
      }
      const sold = apply(
        {
          ...state,
          session: o.buyer,
          listings: state.listings.map((x) =>
            x.id === l.id
              ? { ...x, price: o.price, currency: o.currency, jewels: o.jewels }
              : x,
          ),
        },
        { type: "buy", id: l.id },
      );
      return {
        ...sold,
        session: state.session,
        offers: [...sold.offers, { ...o, status: "accepted" }],
      };
    }
  }
}
