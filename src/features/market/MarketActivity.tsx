import { Translated } from "@/i18n/Translated";
import { useState } from "react";
import { Checkout } from "@/components/shared/Checkout";
import { useGame } from "@/store/useGame";
import { Button } from "@/components/ui/button";
import { AuthGate } from "@/components/shared/AuthGate";
import { toast } from "sonner";
export function MarketActivity({
  tab,
}: {
  tab: "mine" | "offers" | "transactions";
}) {
  const { state, user, dispatch } = useGame();
  const [checkout, setCheckout] = useState<string | null>(null);
  const [all, setAll] = useState(false);
  return (
    <AuthGate>
      <div className="panel">
        {tab === "mine" && (
          <>
            {state.listings
              .filter((l) => l.seller === user?.username)
              .map((l) => (
                <div key={l.id} className="data-row">
                  <span>
                    <Translated text={l.item.name} /> ·{" "}
                    <Translated text={l.price} />{" "}
                    <Translated text={l.currency} />
                  </span>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      if (dispatch({ type: "cancel", id: l.id }))
                        toast.success("Anúncio cancelado. Item devolvido.");
                    }}
                  >
                    <Translated text="Cancelar anúncio" />
                  </Button>
                </div>
              ))}
            {!state.listings.some((l) => l.seller === user?.username) && (
              <p className="muted">
                <Translated text="Nenhum anúncio ativo. Crie seu primeiro anúncio." />
              </p>
            )}
          </>
        )}
        {tab === "offers" && (
          <>
            {state.offers
              .filter(
                (o) =>
                  o.buyer === user?.username ||
                  state.listings.find((l) => l.id === o.listingId)?.seller ===
                    user?.username,
              )
              .map((o) => (
                <div key={o.id} className="data-row">
                  <div>
                    <p>
                      <Translated
                        text={
                          state.listings.find((l) => l.id === o.listingId)?.item
                            .name || "Item negociado"
                        }
                      />
                      <Translated text={" "} />
                      · <Translated text={o.price} />{" "}
                      <Translated text={o.currency} />
                    </p>
                    <p className="muted text-sm">
                      <Translated text="De" />
                      <Translated text={o.buyer} /> ·{" "}
                      <Translated text={o.status} />
                    </p>
                  </div>
                  {o.status === "pending" &&
                    state.listings.find((l) => l.id === o.listingId)?.seller ===
                      user?.username && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            if (
                              dispatch({
                                type: "offerStatus",
                                id: o.id,
                                status: "accepted",
                              })
                            )
                              toast.success(
                                "Oferta aceita. Em reais, o comprador recebeu uma cobrança PIX demo.",
                              );
                          }}
                        >
                          <Translated text="Aceitar" />
                          <Translated
                            text={o.currency === "BRL" ? " PIX demo" : ""}
                          />
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            dispatch({
                              type: "offerStatus",
                              id: o.id,
                              status: "rejected",
                            })
                          }
                        >
                          <Translated text="Recusar" />
                        </Button>
                      </div>
                    )}
                </div>
              ))}
            {!state.offers.length && (
              <p className="muted">
                <Translated text="Nenhuma oferta. Explore o mercado para negociar." />
              </p>
            )}
          </>
        )}
        {tab === "transactions" && (
          <>
            <div className="mb-4 flex gap-3">
              <Button
                variant={all ? "secondary" : "default"}
                onClick={() => setAll(false)}
              >
                <Translated text="Minhas transações" />
              </Button>
              <Button
                variant={all ? "default" : "secondary"}
                onClick={() => setAll(true)}
              >
                <Translated text="Todas as transações" />
              </Button>
            </div>
            {state.transactions
              .filter(
                (t) =>
                  all ||
                  t.buyer === user?.username ||
                  t.seller === user?.username,
              )
              .map((t) => (
                <div className="data-row" key={t.id}>
                  <div>
                    <p className="font-bold">
                      <Translated text={t.item} />
                    </p>
                    <p className="muted text-sm">
                      <Translated text={t.seller} /> →{" "}
                      <Translated text={t.buyer} /> ·<Translated text={" "} />
                      {new Date(t.date).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <Translated text={t.price} />{" "}
                    <Translated text={t.currency} />
                    <p className="muted text-xs">
                      <Translated text="Taxa 5% · Líquido" />
                      {(t.price * 0.95).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            {!state.transactions.length && (
              <p className="muted">
                <Translated text="Seu histórico aparecerá aqui após a primeira compra ou venda." />
              </p>
            )}
          </>
        )}
        {state.orders
          .filter((o) => o.user === user?.username && o.listing)
          .map((o) => (
            <div key={o.id} className="data-row">
              <span>
                <Translated text="PIX ·" />
                <Translated text={o.title} /> · <Translated text={o.status} />
              </span>
              <Button variant="secondary" onClick={() => setCheckout(o.id)}>
                <Translated text="Ver pagamento" />
              </Button>
            </div>
          ))}
      </div>
      <Checkout id={checkout} onClose={() => setCheckout(null)} />
    </AuthGate>
  );
}
