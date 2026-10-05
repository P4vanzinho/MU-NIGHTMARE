import { Translated } from "@/i18n/Translated";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, Zap } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { NewsCard } from "@/components/home/NewsCard";
import { Button } from "@/components/ui/button";
import { news, events } from "@/data/seed";
export function HomePage() {
  return (
    <>
      <Hero />
      <div className="page home-content">
        <section>
          <div className="mb-4 flex justify-between">
            <h2 className="text-2xl font-bold">
              <Translated text="Notícias" />
            </h2>
            <Link to="/news" className="flex items-center gap-2 text-sm">
              <Translated text="Ver todas" />
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="news-rail">
            {news.map((n) => (
              <NewsCard key={n.title} {...n} />
            ))}
          </div>
        </section>
        <section className="section grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Season 6",
              sub: "Um clássico. Um novo desafio.",
            },
            {
              icon: Users,
              title: "Servidor online",
              sub: "284 jogadores · dados demonstrativos",
            },
            {
              icon: Zap,
              title: "EXP ×3 · DROP ×3",
              sub: "400 níveis. 250 resets. Sem atalhos.",
            },
          ].map(({ icon: Icon, title, sub }) => (
            <Link
              to="/server"
              key={title}
              className="panel flex items-center gap-4"
            >
              <Icon className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-bold">
                  <Translated text={title} />
                </h3>
                <p className="muted text-sm">
                  <Translated text={sub} />
                </p>
              </div>
            </Link>
          ))}
        </section>
        <section className="section">
          <div className="mb-6 flex justify-between">
            <div>
              <p className="eyebrow mb-2">
                <Translated text="Encontre seu desafio" />
              </p>
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
                to="/events"
              />
            ))}
          </div>
        </section>
        <section className="section panel flex flex-wrap items-center justify-between gap-6 !bg-[#28204a]">
          <div>
            <p className="eyebrow mb-2">
              <Translated text="Jogue junto" />
            </p>
            <h2 className="text-3xl font-bold">
              <Translated text="Entre no pesadelo." />
            </h2>
            <p className="muted mt-2">
              <Translated text="Guildas, trocas e histórias que ficam. Sua comunidade está aqui." />
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/community">
              <Translated text="Conhecer a comunidade" />
              <ArrowRight />
            </Link>
          </Button>
        </section>
      </div>
    </>
  );
}
