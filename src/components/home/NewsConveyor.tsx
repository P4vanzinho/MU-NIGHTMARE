import "./news-conveyor.css";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Translated } from "@/i18n/Translated";
import { NewsCard } from "./NewsCard";
import { news } from "@/data/seed";
export function NewsConveyor() {
  const [paused, setPaused] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  return (
    <section aria-labelledby="news-title">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="news-title" className="text-2xl font-bold">
          <Translated text="Notícias" />
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Retomar notícias" : "Pausar notícias"}
          aria-pressed={paused}
        >
          {paused ? (
            <Play className="h-4 w-4" />
          ) : (
            <Pause className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="news-conveyor" data-paused={paused}>
        <div className="news-conveyor-track">
          {[false, true].map((duplicate) => (
            <div
              className="news-conveyor-group"
              key={String(duplicate)}
              aria-hidden={duplicate || undefined}
            >
              {news.map((item) => (
                <NewsCard key={item.title} {...item} duplicate={duplicate} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
