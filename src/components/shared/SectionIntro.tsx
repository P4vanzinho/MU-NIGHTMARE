import "./promotion.css";
import { Translated } from "@/i18n/Translated";
import type { SectionIntroProps } from "./promotion.types";
export function SectionIntro({ title, description }: SectionIntroProps) {
  return (
    <div className="section-intro">
      <h2>
        <Translated text={title} />
      </h2>
      <p>
        <Translated text={description} />
      </p>
    </div>
  );
}
