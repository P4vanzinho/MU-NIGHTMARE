import { Translated } from "@/i18n/Translated";
import { events } from "@/data/seed";
import { PageHeading } from "@/components/shared/PageHeading";
import { NewsCard } from "@/components/home/NewsCard";
export function EventsPage() {
  return (
    <div className="page">
      <PageHeading title="Entre. Lute. Conquiste." />
      <div className="grid-cards">
        {events.map((e) => (
          <article key={e.name}>
            <NewsCard
              title={e.name}
              poster={e.name}
              tag={e.time + " · BRT"}
              badges={[`${e.duration} min`, "Experiência ×3"]}
              color={e.color}
              to="/events"
            />
            <p className="muted mt-3 text-sm">
              <Translated text={e.desc} />
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
