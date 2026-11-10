import React from "react";
import { Star } from "lucide-react";
import { cn, formatRating } from "../../lib/utils";

/**
 * Rating — compact stars + numeric score + review count.
 */
export default function Rating({ value = 5, reviews, size = "sm", className }) {
  const starSize = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  const filled = Math.round(value);

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="inline-flex items-center gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(starSize, i < filled ? "fill-amber-400 text-amber-400" : "text-amber-200")}
          />
        ))}
      </span>
      <span className="text-[13px] font-semibold text-slate-800">
        {formatRating(value)}
      </span>
      {typeof reviews === "number" && (
        <span className="text-[13px] text-slate-400">({reviews})</span>
      )}
    </span>
  );
}
