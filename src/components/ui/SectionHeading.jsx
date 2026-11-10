import React from "react";
import { cn } from "../../lib/utils";

/**
 * SectionHeading — eyebrow + title + optional description, with a right-hand slot.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
