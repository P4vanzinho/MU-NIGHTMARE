import { Translated } from "@/i18n/Translated";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Sword, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
export function NewsCard({
  title,
  poster,
  tag,
  color,
  to,
  duplicate = false,
  image,
  badges,
}: {
  title: string;
  poster: string;
  tag: string;
  color: string;
  to: string;
  duplicate?: boolean;
  image?: string;
  badges?: string[];
}) {
  return (
    <Link to={to} className="group" tabIndex={duplicate ? -1 : undefined}>
      <div
        className={`poster transition-transform group-hover:-translate-y-1${badges?.length ? " has-badges" : ""}`}
        style={{ "--poster-color": color } as CSSProperties}
      >
        {image ? (
          <img className="poster-image" src={image} alt="" loading="lazy" />
        ) : (
          <Sword />
        )}
        {badges?.length ? (
          <span className="absolute left-3 top-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-col items-start gap-1.5">
            <span className="rounded bg-black/25 px-2 py-1 text-xs font-bold">
              <Translated text={tag} />
            </span>
            <span className="flex flex-wrap gap-1">
              {badges.map((badge) => (
                <Badge
                  key={badge}
                  variant="secondary"
                  className="border-white/15 bg-black/45 text-white"
                >
                  <Translated text={badge} />
                </Badge>
              ))}
            </span>
          </span>
        ) : (
          <span className="absolute left-4 top-4 rounded bg-black/25 px-2 py-1 text-xs font-bold">
            <Translated text={tag} />
          </span>
        )}
        <h3>
          <Translated text={poster} />
        </h3>
        <ArrowUpRight className="!absolute !right-3 !bottom-3 !h-5 !w-5 !opacity-100" />
      </div>
      <p className="mt-3 font-semibold">
        <Translated text={title} />
      </p>
    </Link>
  );
}
