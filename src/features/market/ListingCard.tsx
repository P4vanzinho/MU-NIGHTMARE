import { Translated } from "@/i18n/Translated";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ItemArt } from "@/components/shared/ItemArt";
import type { Listing } from "@/types/domain";
export function ListingCard({
  listing,
  onBuy,
  onOffer,
}: {
  listing: Listing;
  onBuy: () => void;
  onOffer: () => void;
}) {
  return (
    <article className="panel">
      <div className="flex justify-between">
        <Badge variant="secondary">
          <Translated text={listing.item.category} />
        </Badge>
        {listing.item.excellent && (
          <Badge>
            <Translated text="Excellent" />
          </Badge>
        )}
      </div>
      <ItemArt category={listing.item.category} />
      <h3 className="text-xl font-bold">
        <Translated text={listing.item.name} /> +
        <Translated text={listing.item.level} />
      </h3>
      <p className="muted mt-1 text-sm">
        <Translated text="Vendido por" />
        <Translated text={listing.seller} />
      </p>
      <p className="my-5 text-2xl font-bold">
        <Translated text={listing.currency === "BRL" ? "R$ " : ""} />
        <Translated
          text={
            listing.currency === "Jewels"
              ? listing.jewels
                  ?.map((r) => r.quantity + " " + r.name)
                  .join(" + ")
              : listing.price
          }
        />
        <Translated text={" "} />
        <Translated text={listing.currency === "BRL" ? "" : listing.currency} />
      </p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onBuy}>
          <Translated text="Ver e comprar" />
        </Button>
        {listing.acceptsOffers && (
          <Button variant="secondary" onClick={onOffer}>
            <Translated text="Fazer oferta" />
          </Button>
        )}
      </div>
    </article>
  );
}
