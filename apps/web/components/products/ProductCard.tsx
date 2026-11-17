"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@nevrora/types";
import { ArrowRight, CheckCircle2, Layers } from "lucide-react";

const PRODUCT_VISUALS: Record<
  string,
  { imageUrl: string; imageAlt: string; telemetry: string }
> = {
  "neermiti-collections": {
    imageUrl:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80",
    imageAlt:
      "Neermiti Collections artisanal handloom textiles and luxury lifestyle showcase",
    telemetry: "14 Artisan Clusters • <0.8s Edge LCP",
  },
  "sadhana-daily": {
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
    imageAlt:
      "Sadhana Daily calm sunrise meditation and daily spiritual practice environment",
    telemetry: "WASM Ephemeris • 100% Offline SQLite",
  },
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const visual = PRODUCT_VISUALS[product.slug];

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-elevated transition-all duration-300 hover:border-blue-400/40 hover:shadow-xl">
      {/* Curated Visual Header Banner */}
      {visual && (
        <div className="relative h-52 w-full overflow-hidden bg-slate-100">
          <Image
            src={visual.imageUrl}
            alt={visual.imageAlt}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/85 via-[#0B1020]/25 to-transparent" />
          <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 rounded-full shadow-sm">
              VENTURE {product.number}
            </span>
            <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-semibold text-[#0B1020] uppercase tracking-wider shadow-sm">
              {product.category}
            </span>
          </div>
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2 text-white">
            <span className="font-mono text-[11px] font-medium text-cyan-200">
              {visual.telemetry}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
        <div className="space-y-5">
          {!visual && (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full">
                VENTURE {product.number}
              </span>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                {product.category}
              </span>
            </div>
          )}

          {/* Title & summary */}
          <div>
            <h3 className="font-display text-2xl font-bold text-[#0B1020] transition-colors group-hover:text-blue-600">
              {product.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {product.summary}
            </p>
          </div>

          {/* White-Label Ecosystem Highlight */}
          {product.whiteLabelEcosystem && (
            <div className="rounded-xl border border-blue-500/15 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-800">
                <Layers className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span>{product.whiteLabelEcosystem.architectureType}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {product.whiteLabelEcosystem.highlight}
              </p>
            </div>
          )}

          {/* Features highlight */}
          <ul className="space-y-2 text-xs text-slate-600">
            {product.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Modern Tech Stack Badges */}
          {product.techBadges && product.techBadges.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Architecture & Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.techBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-md border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-violet-500/5 px-2.5 py-0.5 text-[11px] font-medium text-blue-700"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Card footer actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-95 hover:scale-[1.02]"
          >
            <span>{product.cta || "View Showcase"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {product.privacySlug && (
            <Link
              href={product.privacySlug}
              className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors"
            >
              Privacy Notice
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
