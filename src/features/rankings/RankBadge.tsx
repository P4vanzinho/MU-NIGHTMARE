import { Crown, Shield, Sparkles } from "lucide-react";
import type { RankBadgeProps } from "./ranking.types";
import "./rankings.css";
export function RankBadge({ position }: RankBadgeProps) {
  return (
    <span
      className="rank-badge"
      data-rank={position <= 5 ? position : undefined}
      aria-label={`${position}º lugar`}
    >
      {position === 1 ? (
        <Crown className="rank-emblem" aria-hidden="true" />
      ) : position <= 3 ? (
        <Sparkles className="rank-emblem" aria-hidden="true" />
      ) : position <= 5 ? (
        <Shield className="rank-emblem" aria-hidden="true" />
      ) : null}
      <span>{String(position).padStart(2, "0")}</span>
    </span>
  );
}
