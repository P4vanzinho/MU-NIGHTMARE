import { Translated } from "@/i18n/Translated";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/shared/LocalizedInput";
import { Field } from "@/components/shared/Field";
import { useGame } from "@/store/useGame";
import { toast } from "sonner";
export function PaymentsPanel() {
  const { user, dispatch } = useGame();
  if (!user) return null;
  return (
    <div className="panel form-stack max-w-xl">
      <h2 className="text-2xl font-bold">
        <Translated text="Receba suas vendas" />
      </h2>
      <p className="muted">
        <Translated text="Configuração simulada de PIX e Mercado Pago. Use uma chave fictícia. Necessária para anunciar em reais." />
      </p>
      <form
        className="form-stack"
        onSubmit={(e) => {
          e.preventDefault();
          const pix = String(new FormData(e.currentTarget).get("pix") || "");
          dispatch({ type: "user", user: { ...user, pix } });
          toast.success("Chave demo salva.");
        }}
      >
        <Field label="Chave PIX demonstrativa">
          <Input
            name="pix"
            defaultValue={user.pix}
            required
            placeholder="jogador@exemplo.local"
          />
        </Field>
        <Button type="submit">
          <Translated text="Salvar chave PIX" />
        </Button>
      </form>
      {user.pix && (
        <Button
          variant="ghost"
          onClick={() => dispatch({ type: "user", user: { ...user, pix: "" } })}
        >
          <Translated text="Remover chave" />
        </Button>
      )}
      <div className="data-row">
        <span>
          <Translated text="Mercado Pago ·" />
          <Translated
            text={user.connected ? "Vinculado (demo)" : "Não vinculado"}
          />
        </span>
        <Button
          variant="secondary"
          onClick={() =>
            dispatch({
              type: "user",
              user: { ...user, connected: !user.connected },
            })
          }
        >
          <Translated
            text={user.connected ? "Desvincular" : "Simular vínculo"}
          />
        </Button>
      </div>
      <p className="muted text-sm">
        <Translated text="Taxa demonstrativa do marketplace: 5%. Nenhum vínculo externo é realizado." />
      </p>
    </div>
  );
}
