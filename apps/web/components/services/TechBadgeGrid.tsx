import React from "react";

interface TechBadgeGridProps {
  badges: string[];
  title?: string;
}

export function TechBadgeGrid({
  badges,
  title = "Technology Stack & Tooling",
}: TechBadgeGridProps) {
  if (!badges || badges.length === 0) return null;

  return (
    <div className="tech-badges-grid my-8 space-y-4">
      <h3 className="font-display text-lg font-semibold text-[#0B1020]">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {badges.map((badge) => (
          <span
            key={badge}
            className="tech-badge inline-flex items-center rounded-lg border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-violet-500/5 px-3 py-1 text-xs font-medium text-blue-700 shadow-sm transition-colors hover:border-blue-400"
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
