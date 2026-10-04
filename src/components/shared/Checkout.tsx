import { Translated } from "@/i18n/Translated";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGame } from "@/store/useGame";
import { toast } from "sonner";
const labels = {
  pending: "Aguardando pagamento",
  delivered: "Entregue",
  cancelled: "Cancelado",
  expired: "Expirado",
  refunded: "Estornado",
  failed: "Falha de entrega",
};
export function Checkout({
  id,
  onClose,
}: {
  id: string | null;
  onClose: () => void;
}) {
  const { state, dispatch } = useGame();
  const order = state.orders.find((x) => x.id === id);
  const [clock, setClock] = useState(() => Date.now());
  useEffect(() => {
    if (!id) return;
    const timer = setInterval(() => setClock(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [id]);
  const seconds = order?.createdAt
    ? Math.max(
        0,
        900 - Math.floor((clock - Date.parse(order.createdAt)) / 1000),
      )
    : 900;
  useEffect(() => {
    if (order?.status === "pending" && seconds === 0)
      dispatch({ type: "orderStatus", id: order.id, status: "expired" });
  }, [seconds, order, dispatch]);
  function status(
    next: "delivered" | "cancelled" | "expired" | "refunded" | "failed",
  ) {
    if (order && dispatch({ type: "orderStatus", id: order.id, status: next }))
      toast.success("Pedido demo: " + labels[next]);
  }
  return (
    <Dialog
      open={!!order}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Translated text="Pagamento simulado" />
          </DialogTitle>
          <DialogDescription>
            <Translated text="Este protótipo não cobra dinheiro nem comunica com o Mercado Pago." />
          </DialogDescription>
        </DialogHeader>
        {order && (
          <div className="form-stack">
            <p className="text-xl font-bold">
              <Translated text={order.title} />
              <Translated text="· R$" />
              {order.amount.toFixed(2)}
            </p>
            {order.listing && (
              <p className="muted text-sm">
                <Translated text="Taxa do mercado: R$" />
                {(order.amount * 0.05).toFixed(2)}
                <Translated text="· Vendedor recebe R$" />
                {(order.amount * 0.95).toFixed(2)}
                <Translated text=". O item fica reservado por 15 minutos." />
              </p>
            )}
            <p role="status">
              <Translated text="Status:" />
              {labels[order.status]}
            </p>
            {order.status === "pending" && (
              <>
                <p className="muted">
                  <Translated text="Expira em" />
                  {Math.floor(seconds / 60)}:
                  {String(seconds % 60).padStart(2, "0")}
                </p>
                <div className="panel break-all font-mono text-xs">
                  <Translated text="PIX-DEMO-" />
                  <Translated text={order.id} />
                </div>
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard
                      .writeText("PIX-DEMO-" + order.id)
                      .then(() => toast.success("Código demonstrativo copiado"))
                      .catch(() => toast.error("Não foi possível copiar"));
                  }}
                >
                  <Translated text="Copiar código PIX demo" />
                </Button>
                <Button onClick={() => status("delivered")}>
                  <Translated text="Simular pagamento aprovado" />
                </Button>
                <Button variant="ghost" onClick={() => status("cancelled")}>
                  <Translated text="Cancelar pedido" />
                </Button>
                <details>
                  <summary className="muted cursor-pointer text-sm">
                    <Translated text="Testar outros estados" />
                  </summary>
                  <div className="mt-3 flex gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => status("expired")}
                    >
                      <Translated text="Expirar" />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => status("failed")}
                    >
                      <Translated text="Falha na entrega" />
                    </Button>
                  </div>
                </details>
              </>
            )}
            {order.status === "delivered" && (
              <>
                <p className="muted">
                  <Translated text="Pronto! Benefício entregue à conta ou item ao banco do site." />
                </p>
                <Button variant="secondary" onClick={() => status("refunded")}>
                  <Translated text="Simular estorno" />
                </Button>
              </>
            )}
            {order.status === "failed" && (
              <p className="muted">
                <Translated text="Nenhum benefício creditado. Fale com o suporte com o número do pedido para simular uma revisão." />
              </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
