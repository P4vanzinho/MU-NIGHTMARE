import { Translated } from "@/i18n/Translated";
import type { ReactNode } from "react";
export function PageHeading({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
      <div>
        <h1 className="page-title">
          <Translated text={title} />
        </h1>
      </div>
      <Translated text={action} />
    </div>
  );
}
