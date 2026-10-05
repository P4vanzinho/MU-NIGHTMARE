import { NewsConveyor } from "@/components/home/NewsConveyor";
import { EventsConveyor } from "@/components/home/EventsConveyor";
import { ShopPromotions } from "@/components/home/ShopPromotions";
import { Hero } from "@/components/home/Hero";
export function HomePage() {
  return (
    <>
      <Hero />
      <div className="page home-content">
        <NewsConveyor />
        <EventsConveyor />
        <ShopPromotions />
      </div>
    </>
  );
}
