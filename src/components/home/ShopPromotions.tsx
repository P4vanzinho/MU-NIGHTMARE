import { SectionIntro } from "@/components/shared/SectionIntro";
import { ImagePromotion } from "@/components/shared/ImagePromotion";
export function ShopPromotions() {
  return (
    <section className="section shop-promotions">
      <SectionIntro
        title="Seu poder. Sem limites."
        description="Nightmare Coins e VIP para acelerar a evolução e dominar a Season 6."
      />
      <ImagePromotion
        title="VIP FULL. Jogue com vantagem."
        description="Mais experiência, craft e drop por 30 dias. Evolua mais rápido e chegue preparado para as disputas."
        image="/images/mu/dw.jpg"
        imageAlt="Dark Wizard com armadura e asas"
        cta="Ver VIP FULL"
        to="/shop?product=vip-2"
      />
      <ImagePromotion
        reversed
        title="2.200 Coins. Seu próximo upgrade."
        description="Garanta 2.200 Nightmare Coins, com 10% de bônus, e use na loja e nas negociações do mercado."
        image="/images/mu/dk.jpg"
        imageAlt="Dark Knight com armadura e espadas"
        cta="Ver Nightmare Coins"
        to="/shop?product=coins-2"
      />
    </section>
  );
}
