import { FormSelect, SelectOption } from "@/components/shared/FormSelect";
import { Translated } from "@/i18n/Translated";
import { useState } from "react";
import { useGame } from "@/store/useGame";
import { PageHeading } from "@/components/shared/PageHeading";
import { AuthGate } from "@/components/shared/AuthGate";
import { Checkout } from "@/components/shared/Checkout";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/shared/Field";
export function DonationPage() {
  const { user, dispatch } = useGame();
  const [amount, setAmount] = useState(25);
  const [checkout, setCheckout] = useState<string | null>(null);
  return (
    <div className="page">
      <PageHeading title="Apoie o servidor." />
      <AuthGate>
        <div className="panel form-stack max-w-xl">
          <div className="flex flex-wrap gap-3">
            {[10, 25, 50, 100].map((n) => (
              <Button
                variant={amount === n ? "default" : "secondary"}
                key={n}
                onClick={() => setAmount(n)}
              >
                <Translated text="R$" />
                <Translated text={n} />
              </Button>
            ))}
          </div>
          <p className="text-2xl font-bold">
            <Translated text="Você recebe" />
            <Translated text={amount * 40} />
            <Translated text="NC" />
          </p>
          <Field label="Forma de pagamento">
            <FormSelect>
              <SelectOption value="pix">
                <Translated text="PIX · demonstração" />
              </SelectOption>
              <SelectOption value="card">
                <Translated text="Cartão · demonstração" />
              </SelectOption>
              <SelectOption value="boleto">
                <Translated text="Boleto · demonstração" />
              </SelectOption>
            </FormSelect>
          </Field>
          <Button
            onClick={() => {
              if (!user) return;
              const id = crypto.randomUUID();
              dispatch({
                type: "order",
                order: {
                  id,
                  user: user.username,
                  title: "Doação demo",
                  amount,
                  coins: amount * 40,
                  status: "pending",
                },
              });
              setCheckout(id);
            }}
          >
            <Translated text="Continuar" />
          </Button>
          <p className="muted">
            <Translated text="Moedas creditadas após simular a confirmação. Sem cobrança real." />
          </p>
        </div>
      </AuthGate>
      <Checkout id={checkout} onClose={() => setCheckout(null)} />
    </div>
  );
}
