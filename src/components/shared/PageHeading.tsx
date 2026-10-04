import { Translated } from "@/i18n/Translated";
import type { ReactNode } from "react";
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="eyebrow mb-3">
          <Translated text={eyebrow} />
        </p>
        <h1 className="page-title">
          <Translated text={title} />
        </h1>
        {description && (
          <p className="muted mt-4 max-w-2xl">
            <Translated text={description} />
          </p>
        )}
      </div>
      <Translated text={action} />
    </div>
  );
}
