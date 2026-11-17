"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@nevrora/types";
import { LIFECYCLE_STATUS_CONFIG } from "@nevrora/config";
import { resolveProductPrimaryCta } from "../../lib/products-data";
import { trackProductCtaClick } from "../../lib/analytics";
import {
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Globe,
  Cloud,
  ExternalLink,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const lifecycleRule = LIFECYCLE_STATUS_CONFIG[product.lifecycle_status];
  const resolvedCta = resolveProductPrimaryCta(product);

  const handleCtaClick = () => {
    trackProductCtaClick({
      productId: product.id,
      productSlug: product.slug,
      lifecycleStatus: product.lifecycle_status,
      platform: resolvedCta.platformType,
      ctaLabel: resolvedCta.label,
      destinationUrl: resolvedCta.href,
    });
  };

  return (
    <article
      className="product-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-elevated transition-all duration-300 hover:border-blue-400/40 hover:shadow-xl"
      data-product-slug={product.slug}
      data-lifecycle-status={product.lifecycle_status}
    >
      {/* Visual Header Banner */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <Image
          src={product.heroMedia.url}
          alt={product.heroMedia.altText}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/85 via-[#0B1020]/30 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold shadow-sm ${lifecycleRule.badgeStyle}`}
          >
            {lifecycleRule.label}
          </span>
          <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-[#0B1020] uppercase tracking-wider shadow-sm">
            {product.category}
          </span>
        </div>
        <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center gap-2 text-white">
          {product.platforms.map((pl) => (
            <span
              key={pl.platformType}
              className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-medium text-cyan-100 border border-white/20"
            >
              {pl.platformType === "android" || pl.platformType === "ios" ? (
                <Smartphone className="h-3 w-3" />
              ) : pl.platformType === "saas" ? (
                <Cloud className="h-3 w-3" />
              ) : (
                <Globe className="h-3 w-3" />
              )}
              <span>{pl.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
        <div className="space-y-4">
          {/* Title, tagline & summary */}
          <div>
            <h3 className="font-display text-2xl font-bold text-[#0B1020] transition-colors group-hover:text-blue-600">
              <Link
                href={`/products/${product.slug}`}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
              >
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-xs font-semibold text-blue-700">
              {product.tagline}
            </p>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {product.summary}
            </p>
          </div>

          {/* Features highlight */}
          <ul className="space-y-2 text-xs text-slate-600 pt-1">
            {product.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card footer actions (NW-FR-03, NW-FR-12) */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label={`View details for ${product.name}`}
            >
              <span>View Product</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {resolvedCta.isExternal ? (
              <a
                href={resolvedCta.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCtaClick}
                className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/70 px-4 py-2.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                aria-label={`${resolvedCta.label} for ${product.name}`}
              >
                <span>{resolvedCta.label}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <Link
                href={resolvedCta.href}
                onClick={handleCtaClick}
                className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/70 px-4 py-2.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                aria-label={`${resolvedCta.label} for ${product.name}`}
              >
                <span>{resolvedCta.label}</span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href={product.support.supportUrl}
              className="font-medium text-slate-500 hover:text-blue-600 transition-colors"
            >
              Support
            </Link>
            <Link
              href={product.legal.privacyUrl}
              className="font-medium text-slate-500 hover:text-blue-600 transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
