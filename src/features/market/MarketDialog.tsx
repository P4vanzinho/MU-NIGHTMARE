import { Translated } from "@/i18n/Translated";
import { JewelFields } from "./JewelFields";
import { parseJewels } from "@/lib/parseJewels";
import type { Currency } from "@/types/domain";
import { Checkout } from "@/components/shared/Checkout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/shared/LocalizedInput";
import { Field } from "@/components/shared/Field";
import { useGame } from "@/store/useGame";
import { toast } from "sonner";
export function MarketDialog({
  selection,
  onClose,
}: {
  selection: { id: string; offer: boolean } | null;
  onClose: () => void;
}) {
  const { state, user, dispatch } = useGame();
  const navigate = useNavigate();
  const [offerCurrency, setOfferCurrency] = useState<Currency | null>(null);
  const [checkout, setCheckout] = useState<string | null>(null);
  const listing = state.listings.find((l) => l.id === selection?.id);
  const currency = offerCurrency || listing?.offerCurrencies?.[0] || "NC";
  function close() {
    setOfferCurrency(null);
    onClose();
  }
  return (
    <>
      <Dialog
        open={!!listing}
        onOpenChange={(open) => {
          if (!open) close();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Translated
                text={selection?.offer ? "Faça sua oferta" : "Confirmar compra"}
              />
            </DialogTitle>
            <DialogDescription>
              <Translated text={listing?.item.name} />
              <Translated text="· Todos os pagamentos são simulados." />
            </DialogDescription>
          </DialogHeader>
          {listing && (
            <div className="form-stack">
              <p className="text-2xl font-bold">
                <Translated text={listing.price} />{" "}
                <Translated text={listing.currency} />
              </p>
              {!user ? (
                <Button onClick={() => navigate("/login?next=/marketplace")}>
                  <Translated text="Entre para continuar" />
                </Button>
              ) : listing.seller === user.username ? (
                <p>
                  <Translated text="Este anúncio é seu. Você pode cancelá-lo em Meus anúncios." />
                </p>
              ) : selection?.offer ? (
                <form
                  className="form-stack"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.currentTarget);
                    if (
                      dispatch({
                        type: "offer",
                        offer: {
                          id: crypto.randomUUID(),
                          listingId: listing.id,
                          buyer: user.username,
                          price:
                            currency === "Jewels"
                              ? parseJewels(data).reduce(
                                  (sum, r) => sum + r.quantity,
                                  0,
                                )
                              : Number(data.get("price")),
                          currency,
                          jewels:
                            currency === "Jewels"
                              ? parseJewels(data)
                              : undefined,
                          status: "pending",
                        },
                      })
                    ) {
                      toast.success(
                        "Oferta enviada. Acompanhe na aba Ofertas.",
                      );
                      close();
                    }
                  }}
                >
                  <Field label="Moeda da oferta">
                    <select
                      value={currency}
                      onChange={(e) =>
                        setOfferCurrency(e.target.value as Currency)
                      }
                    >
                      {(listing.offerCurrencies?.length
                        ? listing.offerCurrencies
                        : ["NC", "Bless", "Soul", "Jewels", "BRL"]
                      ).map((c) => (
                        <option key={c}>
                          <Translated text={c} />
                        </option>
                      ))}
                    </select>
                  </Field>
                  {currency === "Jewels" ? (
                    <JewelFields />
                  ) : (
                    <Field label={"Valor da oferta em " + currency}>
                      <Input
                        type="number"
                        min="1"
                        name="price"
                        required
                        defaultValue={Math.floor(listing.price * 0.9)}
                      />
                    </Field>
                  )}
                  <Button type="submit">
                    <Translated text="Enviar oferta" />
                  </Button>
                </form>
              ) : (
                <>
                  <p className="muted">
                    <Translated text="Vendedor:" />
                    <Translated text={listing.seller} />
                    <Translated text=". Após confirmar, o item será entregue ao banco do site." />
                  </p>
                  <Button
                    onClick={() => {
                      if (listing.currency === "BRL") {
                        const id = crypto.randomUUID();
                        if (
                          dispatch({
                            type: "order",
                            order: {
                              id,
                              user: user.username,
                              title: listing.item.name,
                              amount: listing.price,
                              coins: 0,
                              status: "pending",
                              listing,
                            },
                          })
                        ) {
                          setCheckout(id);
                          close();
                        }
                        return;
                      }
                      if (dispatch({ type: "buy", id: listing.id })) {
                        toast.success("Item entregue ao seu banco do site!");
                        close();
                      }
                    }}
                  >
                    <Translated
                      text={
                        listing.currency === "BRL"
                          ? "Continuar para PIX demo"
                          : "Confirmar compra"
                      }
                    />
                  </Button>
                  <Button variant="ghost" onClick={close}>
                    <Translated text="Cancelar" />
                  </Button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Checkout id={checkout} onClose={() => setCheckout(null)} />
    </>
  );
}
