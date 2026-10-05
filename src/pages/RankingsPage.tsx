import { FormSelect, SelectOption } from "@/components/shared/FormSelect";
import { Translated } from "@/i18n/Translated";
import { useState } from "react";
import { rankings } from "@/data/seed";
import { Input } from "@/components/shared/LocalizedInput";
import { PageHeading } from "@/components/shared/PageHeading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
export function RankingsPage() {
  const [query, setQuery] = useState("");
  const [className, setClassName] = useState("Todas");
  const [selected, setSelected] = useState<(typeof rankings)[number] | null>(
    null,
  );
  const rows = rankings.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) &&
      (className === "Todas" || r.className === className),
  );
  return (
    <div className="page">
      <PageHeading title="Os reis do pesadelo" />
      <div className="mb-6 flex flex-wrap gap-4">
        <Input
          className="max-w-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar personagem"
          aria-label="Buscar personagem"
        />
        <label className="field w-52">
          <span className="sr-only">
            <Translated text="Classe" />
          </span>
          <FormSelect
            aria-label="Classe"
            value={className}
            onValueChange={(value) => setClassName(value)}
          >
            {[
              "Todas",
              "Blade Knight",
              "Soul Master",
              "Muse Elf",
              "Dark Lord",
            ].map((c) => (
              <SelectOption key={c} value={c}>
                <Translated text={c} />
              </SelectOption>
            ))}
          </FormSelect>
        </label>
      </div>
      <div className="panel">
        <div className="data-row muted text-xs">
          <span>
            <Translated text="CAÇADOR" />
          </span>
          <span>
            <Translated text="RESETS / NÍVEL" />
          </span>
        </div>
        {rows.map((r) => (
          <button
            className="data-row w-full text-left"
            key={r.name}
            onClick={() => setSelected(r)}
          >
            <div className="flex items-center gap-5">
              <span className="text-xl font-bold text-primary">
                {String(rankings.indexOf(r) + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-bold">
                  <Translated text={r.name} />
                </p>
                <p className="muted text-sm">
                  <Translated text={r.className} />
                </p>
              </div>
            </div>
            <p>
              <Translated text={r.resets} />{" "}
              <span className="muted">
                / <Translated text={r.level} />
              </span>
            </p>
          </button>
        ))}
        {!rows.length && (
          <p className="py-8 muted">
            <Translated text="Nenhum personagem encontrado." />
          </p>
        )}
      </div>
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Translated text={selected?.name} />
            </DialogTitle>
            <DialogDescription>
              <Translated text="Perfil público demonstrativo" />
            </DialogDescription>
          </DialogHeader>
          <p>
            <Translated text={selected?.className} />
            <Translated text="· Nível" />
            <Translated text={selected?.level} />
          </p>
          <p>
            <Translated text={selected?.resets} />
            <Translated text="resets ·" />
            <Translated text={" "} />
            {selected?.score.toLocaleString("pt-BR")}
            <Translated text="pontos de caça" />
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
