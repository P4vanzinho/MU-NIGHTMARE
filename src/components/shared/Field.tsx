import { Translated } from "@/i18n/Translated";
import type { ReactNode } from "react";
export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="field">
      <span>
        <Translated text={label} />
      </span>
      <Translated text={children} />
    </label>
  );
}
