import { NewsConveyor } from "@/components/home/NewsConveyor";
import { Translated } from "@/i18n/Translated";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { NewsCard } from "@/components/home/NewsCard";
import { Button } from "@/components/ui/button";
import { events } from "@/data/seed";
export function HomePage() {
  return (
    <>
      <Hero />
      <div className="page home-content">
        <NewsConveyor />
        <section className="section">
          <div className="mb-6 flex justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                <Translated text="O mundo não espera." />
              </h2>
            </div>
            <Button asChild variant="ghost">
              <Link to="/events">
                <Translated text="Agenda" />
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="grid-cards">
            {events.map((e) => (
              <NewsCard
                key={e.name}
                title={e.desc}
                poster={e.name}
                tag={e.time + " · hoje"}
                color={e.color}
                image={e.image}
                to="/events"
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
