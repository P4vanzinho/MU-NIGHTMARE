import { Translated } from "@/i18n/Translated";
import { downloadEvent } from "@/lib/download";
import { useState } from "react";
import { events } from "@/data/seed";
import { PageHeading } from "@/components/shared/PageHeading";
import { NewsCard } from "@/components/home/NewsCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export function EventsPage() {
  const [open, setOpen] = useState<string | null>(null);
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
              color={e.color}
              to="/events"
            />
            <p className="muted my-4">
              <Translated text={e.desc} />
            </p>
            <p className="mb-4 text-sm">
              <Translated text="Duração:" />
              <Translated text={e.duration} />
              <Translated text="min · Experiência ×3" />
            </p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setOpen(open === e.name ? null : e.name)}
              >
                <Translated text={open === e.name ? "Ocultar" : "Horários"} />
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  downloadEvent(e.name, e.time);
                  toast.success("Evento demo exportado.");
                }}
              >
                <Translated text="Exportar agenda" />
              </Button>
            </div>
            {open === e.name && (
              <p className="panel mt-4">
                <Translated text="Todos os dias às" />
                <Translated text={e.time} />
                <Translated text="(Brasília). Agenda demonstrativa." />
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
