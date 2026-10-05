import { Translated } from "@/i18n/Translated";
import { Link } from "react-router-dom";
import { Sword, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
function PosterBadge({ text, className }: { text: string; className: string }) {
  return (
    <span
      className={`absolute z-10 rounded bg-black/25 px-2 py-1 text-xs font-bold ${className}`}
    >
      <Translated text={text} />
    </span>
  );
}
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
        className="poster transition-transform group-hover:-translate-y-1"
        style={{ "--poster-color": color } as CSSProperties}
      >
        {image ? (
          <img className="poster-image" src={image} alt="" loading="lazy" />
        ) : (
          <Sword />
        )}
        <PosterBadge text={tag} className="left-4 top-4" />
        {badges?.[0] ? (
          <PosterBadge text={badges[0]} className="right-4 top-4" />
        ) : null}
        {badges?.[1] ? (
          <PosterBadge text={badges[1]} className="bottom-4 left-4" />
        ) : null}
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
