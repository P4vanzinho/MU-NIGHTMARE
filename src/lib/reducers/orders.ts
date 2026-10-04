import { updateUser } from "./users";
import type { State, User } from "@/types/domain";
import type { OrderAction, ApplyAction } from "@/types/reducers";
export function reduceOrders(
  state: State,
  action: OrderAction,
  apply: ApplyAction,
): State {
  const user = state.users.find((u) => u.username === state.session);
  const update = (next: User) => updateUser(state, next);
  switch (action.type) {
    case "order":
      if (
        action.order.listing &&
        state.orders.some(
          (o) =>
            o.listing?.id === action.order.listing?.id &&
            o.status === "pending",
        )
      )
        throw Error("Item já reservado.");
      return {
        ...state,
        orders: [
          { ...action.order, createdAt: new Date().toISOString() },
          ...state.orders,
        ],
      };
    case "orderStatus": {
      const o = state.orders.find((x) => x.id === action.id);
      if (
        !user ||
        !o ||
        o.user !== user.username ||
        (action.status === "refunded"
          ? o.status !== "delivered"
          : o.status !== "pending")
      )
        throw Error("Pedido indisponível.");
      if (o.listing) {
        if (action.status === "delivered") {
          const next = apply(
            {
              ...state,
              listings: state.listings.map((l) =>
                l.id === o.listing!.id ? o.listing! : l,
              ),
            },
            { type: "buy", id: o.listing.id },
          );
          return {
            ...next,
            orders: next.orders.map((x) =>
              x.id === o.id ? { ...x, status: "delivered" } : x,
            ),
          };
        }
        if (action.status === "refunded") {
          if (!user.items.some((i) => i.id === o.listing!.item.id))
            throw Error(
              "Item já transferido ou negociado. Solicite revisão no suporte.",
            );
          return {
            ...update({
              ...user,
              items: user.items.filter((i) => i.id !== o.listing!.item.id),
            }),
            listings: [o.listing, ...state.listings],
            orders: state.orders.map((x) =>
              x.id === o.id ? { ...x, status: action.status } : x,
            ),
          };
        }
        return {
          ...state,
          orders: state.orders.map((x) =>
            x.id === o.id ? { ...x, status: action.status } : x,
          ),
        };
      }
      const start =
        o.vip && user.vip === o.vip && user.vipExpires
          ? Math.max(Date.now(), Date.parse(user.vipExpires))
          : Date.now();
      const next =
        action.status === "delivered"
          ? update({
              ...user,
              coins: user.coins + o.coins,
              vip: o.vip || user.vip,
              vipExpires: o.vip
                ? new Date(start + 30 * 86400000).toISOString()
                : user.vipExpires,
            })
          : action.status === "refunded"
            ? update({
                ...user,
                coins: Math.max(0, user.coins - o.coins),
                vip: o.vip ? "Sem VIP" : user.vip,
                vipExpires: o.vip ? undefined : user.vipExpires,
              })
            : state;
      return {
        ...next,
        orders: state.orders.map((x) =>
          x.id === o.id ? { ...x, status: action.status } : x,
        ),
      };
    }
  }
}
