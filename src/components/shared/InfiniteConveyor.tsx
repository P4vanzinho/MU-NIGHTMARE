import "@/components/home/news-conveyor.css";
import { useId, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Translated } from "@/i18n/Translated";
import type { InfiniteConveyorProps } from "./conveyor.types";
export function InfiniteConveyor<T>({
  items,
  renderItem,
  getKey,
  title,
  className = "",
  pauseLabel,
  resumeLabel,
}: InfiniteConveyorProps<T>) {
  const id = useId();
  const [paused, setPaused] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  return (
    <section className={className} aria-labelledby={id}>
      <div className="mb-4 flex items-center justify-between">
        <h2 id={id} className="text-2xl font-bold">
          <Translated text={title} />
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? resumeLabel : pauseLabel}
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
              {items.map((item) => (
                <div key={getKey(item)}>{renderItem(item, duplicate)}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
