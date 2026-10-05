import "./promotion.css";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Translated } from "@/i18n/Translated";
import type { ImagePromotionProps } from "./promotion.types";
export function ImagePromotion({
  title,
  description,
  image,
  imageAlt,
  cta,
  to,
  reversed,
}: ImagePromotionProps) {
  return (
    <article className="image-promotion" data-reversed={reversed || undefined}>
      <div className="promotion-copy">
        <h3>
          <Translated text={title} />
        </h3>
        <p>
          <Translated text={description} />
        </p>
        <Button asChild size="lg">
          <Link to={to}>
            <Translated text={cta} />
            <ArrowUpRight />
          </Link>
        </Button>
      </div>
      <img src={image} alt={imageAlt} loading="lazy" />
    </article>
  );
}
