import { Translated } from "@/i18n/Translated";
import { useState } from "react";
import { JewelFields } from "./JewelFields";
import { parseJewels } from "@/lib/parseJewels";
import { useGame } from "@/store/useGame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/shared/LocalizedInput";
import { Field } from "@/components/shared/Field";
import { AuthGate } from "@/components/shared/AuthGate";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { Currency } from "@/types/domain";
export function CreateListing() {
  const { user, dispatch } = useGame();
  const [currency, setCurrency] = useState<Currency>("NC");
  const items = user?.items.filter((i) => i.location === "site") || [];
  return (
    <AuthGate>
      {!items.length ? (
        <div className="panel">
          <p className="mb-4">
            <Translated text="Seu banco do site está vazio. Transfira um item do jogo para anunciar." />
          </p>
          <Button asChild>
            <Link to="/account">
              <Translated text="Abrir cofres" />
            </Link>
          </Button>
        </div>
      ) : (
        <form
          className="panel form-stack max-w-xl"
          onSubmit={(e) => {
            e.preventDefault();
            if (!user) return;
            const data = new FormData(e.currentTarget);
            const item = items.find((i) => i.id === data.get("item"));
            if (!item) return;
            if (
              dispatch({
                type: "list",
                listing: {
                  id: crypto.randomUUID(),
                  item,
                  seller: user.username,
                  price:
                    currency === "Jewels"
                      ? parseJewels(data).reduce(
                          (sum, r) => sum + r.quantity,
                          0,
                        )
                      : Number(data.get("price")),
                  currency,
                  jewels: currency === "Jewels" ? parseJewels(data) : undefined,
                  acceptsOffers: data.get("offers") === "on",
                  offerCurrencies: data.getAll("offerCurrency") as Currency[],
                },
              })
            ) {
              toast.success("Anúncio publicado no mercado demo.");
              e.currentTarget.reset();
            }
          }}
        >
          <h2 className="text-2xl font-bold">
            <Translated text="Seu item, uma nova história." />
          </h2>
          <Field label="Item do banco do site">
            <select name="item">
              {items.map((i) => (
                <option key={i.id} value={i.id}>
                  <Translated text={i.name} /> +<Translated text={i.level} />
                </option>
              ))}
            </select>
          </Field>
          <Field label="Moeda">
            <select
              name="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
            >
              <option value="NC">
                <Translated text="Nightmare Coins" />
              </option>
              <option value="Bless">
                <Translated text="Jewel of Bless" />
              </option>
              <option value="Soul">
                <Translated text="Jewel of Soul" />
              </option>
              <option value="Jewels">
                <Translated text="Cesta de joias" />
              </option>
              <option value="BRL">
                <Translated text="Real · PIX demo" />
              </option>
            </select>
          </Field>
          {currency === "Jewels" ? (
            <JewelFields />
          ) : (
            <Field label="Preço">
              <Input name="price" type="number" min="1" step="1" required />
            </Field>
          )}
          <label className="flex gap-3">
            <input type="checkbox" name="offers" defaultChecked />
            <Translated text="Aceitar ofertas" />
          </label>
          <div>
            <p className="mb-3 text-sm">
              <Translated text="Moedas aceitas em ofertas" />
            </p>
            <div className="flex flex-wrap gap-4">
              {["NC", "Bless", "Soul", "Jewels", "BRL"].map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <input
                    name="offerCurrency"
                    type="checkbox"
                    value={c}
                    defaultChecked={c === "NC"}
                  />
                  <Translated text={c} />
                </label>
              ))}
            </div>
          </div>
          <p className="muted text-sm">
            <Translated text="O item ficará reservado no anúncio. Cancelar devolve ao seu cofre. Vendas em reais exigem PIX e vínculo demo." />
          </p>
          <Button type="submit">
            <Translated text="Publicar anúncio" />
          </Button>
        </form>
      )}
    </AuthGate>
  );
}
