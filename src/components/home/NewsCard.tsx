import { Translated } from "@/i18n/Translated";
import { Link } from "react-router-dom";
import { Sword, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
export function NewsCard({
  title,
  poster,
  tag,
  color,
  to,
}: {
  title: string;
  poster: string;
  tag: string;
  color: string;
  to: string;
}) {
  return (
    <Link to={to} className="group">
      <div
        className="poster transition-transform group-hover:-translate-y-1"
        style={{ "--poster-color": color } as CSSProperties}
      >
        <Sword />
        <span className="absolute left-4 top-4 rounded bg-black/25 px-2 py-1 text-xs font-bold">
          <Translated text={tag} />
        </span>
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
