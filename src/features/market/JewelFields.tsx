import { Translated } from "@/i18n/Translated";
import { useState } from "react";
import { jewelNames } from "@/data/jewels";
import { Field } from "@/components/shared/Field";
import { Input } from "@/components/shared/LocalizedInput";
import { Button } from "@/components/ui/button";
export function JewelFields() {
  const [count, setCount] = useState(1);
  return (
    <div className="form-stack">
      <p className="font-bold">
        <Translated text="Cesta de joias" />
      </p>
      {Array.from({ length: count }, (_, i) => (
        <div className="grid grid-cols-2 gap-3" key={i}>
          <Field label={"Joia " + (i + 1)}>
            <select name="jewelName" defaultValue={jewelNames[i]}>
              {jewelNames.map((name) => (
                <option key={name}>
                  <Translated text={name} />
                </option>
              ))}
            </select>
          </Field>
          <Field label="Quantidade">
            <Input
              name="jewelQty"
              type="number"
              min="1"
              required
              defaultValue="10"
            />
          </Field>
        </div>
      ))}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="secondary"
          disabled={count >= jewelNames.length}
          onClick={() => setCount(count + 1)}
        >
          <Translated text="Adicionar joia" />
        </Button>
        {count > 1 && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setCount(count - 1)}
          >
            <Translated text="Remover última" />
          </Button>
        )}
      </div>
    </div>
  );
}
