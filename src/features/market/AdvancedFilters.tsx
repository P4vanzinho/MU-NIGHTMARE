import { Translated } from "@/i18n/Translated";
import { Checkbox } from "@/components/ui/checkbox";
import type { AdvancedFilters as Filters } from "@/types/filters";
const options = [
  "Money +40% / Mana Kill",
  "Def Rate PvM / HP Kill",
  "Dmg Reflect / Atk Speed",
  "Dmg Decrease / Dmg Increase",
  "Max Mana / Dmg +Lvl",
  "Max HP / Exc Dmg Chance",
];
export function AdvancedFilters({
  value,
  onChange,
}: {
  value: Filters;
  onChange: (next: Filters) => void;
}) {
  return (
    <details className="panel mb-6">
      <summary className="cursor-pointer font-semibold">
        <Translated text="Opções avançadas de itens" />
      </summary>
      <div className="my-5 flex flex-wrap gap-6">
        {(
          [
            ["luck", "Luck"],
            ["skill", "Skill"],
            ["ancient", "Ancient"],
            ["socket", "Socket"],
            ["offers", "Aceita ofertas"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2">
            <Checkbox
              checked={value[key]}
              onCheckedChange={(v) => onChange({ ...value, [key]: v === true })}
            />
            <Translated text={label} />
          </label>
        ))}
      </div>
      <p className="mb-3 text-sm font-bold">
        <Translated text="Opções Excellent (todas as selecionadas)" />
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option, i) => (
          <label key={option} className="flex gap-2 text-sm">
            <Checkbox
              checked={value.excellentOptions.includes(i + 1)}
              onCheckedChange={(v) =>
                onChange({
                  ...value,
                  excellentOptions: v
                    ? [...value.excellentOptions, i + 1]
                    : value.excellentOptions.filter((n) => n !== i + 1),
                })
              }
            />
            <Translated text={i + 1} /> · <Translated text={option} />
          </label>
        ))}
      </div>
    </details>
  );
}
