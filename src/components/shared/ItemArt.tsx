import { Sword, Shield, Feather, Gem, Bird } from "lucide-react";
export function ItemArt({ category }: { category: string }) {
  const Icon =
    category === "Armas"
      ? Sword
      : category === "Asas"
        ? Feather
        : category === "Pets"
          ? Bird
          : category === "Armaduras"
            ? Shield
            : Gem;
  return (
    <div className="product-art" aria-hidden="true">
      <Icon strokeWidth={1.2} />
    </div>
  );
}
