"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@nevrora/types";
import { LIFECYCLE_STATUS_CONFIG, STATUTORY_DETAILS } from "@nevrora/config";
import { resolveProductPrimaryCta } from "../../lib/products-data";
import {
  trackProductCtaClick,
  trackProductPageView,
} from "../../lib/analytics";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  ExternalLink,
  HelpCircle,
  LifeBuoy,
  Shield,
  Smartphone,
  Globe,
  Cloud,
  FileText,
} from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const lifecycleRule = LIFECYCLE_STATUS_CONFIG[product.lifecycle_status];
  const resolvedCta = resolveProductPrimaryCta(product);
  const sortedFeatures = [...product.structuredFeatures].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
  const sortedMedia = [...product.mediaGallery].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
  const publishedFaqs = product.faqs
    .filter((f) => f.status === "published")
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const activeMedia = sortedMedia[activeMediaIndex] ?? sortedMedia[0];

  useEffect(() => {
    trackProductPageView({
      productId: product.id,
      productSlug: product.slug,
      lifecycleStatus: product.lifecycle_status,
    });
  }, [product.id, product.slug, product.lifecycle_status]);

  const handlePrimaryCtaClick = () => {
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
      className="product-showcase relative mx-auto max-w-7xl px-6 py-16 lg:px-8 space-y-16"
      data-slug={product.slug}
      data-lifecycle-status={product.lifecycle_status}
    >
      {/* 1. Lifecycle Status Notice Banner (Section 5 & NW-FR-03) */}
      <div
        role="status"
        className={`rounded-2xl border p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${lifecycleRule.badgeStyle}`}
      >
        <div className="flex items-start sm:items-center gap-3">
          <Clock className="h-5 w-5 shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold uppercase tracking-wider mr-2">
              [{lifecycleRule.label}]
            </span>
            <span>{product.statusNotice}</span>
          </div>
        </div>
        <Link
          href={resolvedCta.href}
          onClick={handlePrimaryCtaClick}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#0B1020] px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <span>{resolvedCta.label}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 2. Product Identity & Hero Overview (Section 7 Identity & Availability) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${lifecycleRule.badgeStyle}`}
            >
              {lifecycleRule.label}
            </span>
            <span className="product-category inline-flex items-center rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700">
              {product.category}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B1020]">
            {product.name}
          </h1>

          <p className="product-summary text-xl text-blue-600 font-medium leading-relaxed">
            {product.tagline}
          </p>

          <p className="product-overview text-base text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Primary & Support CTAs (NW-FR-03, NW-FR-04, NW-FR-12) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {resolvedCta.isExternal ? (
              <a
                href={resolvedCta.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handlePrimaryCtaClick}
                className="cta-btn inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/20 hover:opacity-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <span>{resolvedCta.label}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <Link
                href={resolvedCta.href}
                onClick={handlePrimaryCtaClick}
                className="cta-btn inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/20 hover:opacity-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <span>{resolvedCta.label}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            <Link
              href={product.support.supportUrl}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 hover:border-blue-400 hover:text-blue-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <LifeBuoy className="h-4 w-4 text-blue-600" />
              <span>Product Support &amp; FAQs</span>
            </Link>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="lg:col-span-5 relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl">
          <Image
            src={product.heroMedia.url}
            alt={product.heroMedia.altText}
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/85 via-[#0B1020]/20 to-transparent" />
          {product.heroMedia.caption && (
            <div className="absolute bottom-4 left-4 right-4 text-xs text-white/95 bg-[#0B1020]/70 backdrop-blur-md rounded-xl p-3 border border-white/15">
              {product.heroMedia.caption}
            </div>
          )}
        </div>
      </div>

      {/* 3. Platform Availability Matrix (Section 7 & NW-FR-04) */}
      <section
        aria-labelledby="platform-availability-heading"
        className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm space-y-6"
      >
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
            Platform Support &amp; Distribution
          </span>
          <h2
            id="platform-availability-heading"
            className="font-display text-2xl font-bold text-[#0B1020]"
          >
            Supported Platforms &amp; Availability
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.platforms.map((pl) => {
            const plRule = LIFECYCLE_STATUS_CONFIG[pl.status];
            return (
              <div
                key={pl.platformType}
                className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 font-display text-base font-bold text-[#0B1020]">
                      {pl.platformType === "android" ||
                      pl.platformType === "ios" ? (
                        <Smartphone className="h-4 w-4 text-blue-600" />
                      ) : pl.platformType === "saas" ? (
                        <Cloud className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Globe className="h-4 w-4 text-blue-600" />
                      )}
                      <span>{pl.label}</span>
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${plRule.badgeStyle}`}
                    >
                      {plRule.label}
                    </span>
                  </div>
                  {pl.minimumRequirements && (
                    <p className="text-xs text-slate-600">
                      Requirements: {pl.minimumRequirements}
                    </p>
                  )}
                </div>

                {pl.availability === "available" && pl.storeOrAppUrl ? (
                  <a
                    href={pl.storeOrAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    <span>
                      {pl.platformType === "android"
                        ? "Get it on Google Play"
                        : `Open ${pl.label}`}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-medium text-slate-500">
                    Store / app link will appear automatically once verified for
                    public release.
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Audience, Problem Solved & Value Proposition (Section 7 Problem/Value) */}
      <section
        aria-label="Product audience, problem solved, and value proposition"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="rounded-2xl border border-slate-200/80 bg-white p-7 space-y-3 shadow-sm">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
            Intended Audience
          </span>
          <h3 className="font-display text-xl font-bold text-[#0B1020]">
            Who It Is Built For
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {product.audience}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-7 space-y-3 shadow-sm">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
            Problem Solved
          </span>
          <h3 className="font-display text-xl font-bold text-[#0B1020]">
            Why It Exists
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {product.problemSolved}
          </p>
        </div>

        <div className="product-value-prop rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-7 space-y-3 shadow-sm">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
            User Benefit
          </span>
          <h3 className="font-display text-xl font-bold text-[#0B1020]">
            Value Proposition
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            {product.valueProposition}
          </p>
        </div>
      </section>

      {/* 5. Prioritized Features (Section 7 Features) */}
      <section
        aria-labelledby="product-features-heading"
        className="product-features rounded-2xl border border-slate-200/80 bg-white p-8 md:p-12 shadow-sm space-y-8"
      >
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
            Key Capabilities
          </span>
          <h2
            id="product-features-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#0B1020]"
          >
            Product Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedFeatures.map((feat) => (
            <div
              key={feat.id}
              className="rounded-xl border border-slate-200/70 bg-slate-50/50 p-6 flex items-start gap-4"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-mono text-xs font-bold shrink-0">
                0{feat.displayOrder}
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display text-base font-bold text-[#0B1020] flex items-center gap-2">
                  <span>{feat.title}</span>
                  <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Responsive Media & Screenshot Gallery (NW-FR-05, NW-FR-12) */}
      {sortedMedia.length > 0 && activeMedia && (
        <section
          aria-labelledby="product-gallery-heading"
          className="rounded-2xl border border-slate-200/80 bg-white p-8 md:p-12 shadow-sm space-y-6"
        >
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
              Visual Preview Gallery
            </span>
            <h2
              id="product-gallery-heading"
              className="font-display text-2xl font-bold text-[#0B1020]"
            >
              Screenshots &amp; Product Previews
            </h2>
          </div>

          <figure className="space-y-4">
            <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <Image
                src={activeMedia.url}
                alt={activeMedia.altText}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <figcaption className="text-xs text-slate-600 font-medium text-center">
              {activeMedia.caption}
            </figcaption>
          </figure>

          {sortedMedia.length > 1 && (
            <div
              className="flex flex-wrap items-center justify-center gap-3 pt-2"
              role="group"
              aria-label="Select product preview image"
            >
              {sortedMedia.map((media, idx) => {
                const isSelected = idx === activeMediaIndex;
                return (
                  <button
                    key={media.id}
                    type="button"
                    onClick={() => setActiveMediaIndex(idx)}
                    aria-label={`Show preview ${idx + 1}: ${media.caption}`}
                    aria-current={isSelected ? "true" : undefined}
                    className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      isSelected
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-400"
                    }`}
                  >
                    Preview 0{idx + 1}: {media.caption.slice(0, 32)}...
                  </button>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* 7. Product FAQs (NW-FR-06, NW-FR-12) */}
      {publishedFaqs.length > 0 && (
        <section
          aria-labelledby="product-faq-heading"
          className="rounded-2xl border border-slate-200/80 bg-white p-8 md:p-12 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
            <HelpCircle className="h-4 w-4 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2
            id="product-faq-heading"
            className="font-display text-2xl font-bold text-[#0B1020]"
          >
            {product.name} — FAQs
          </h2>

          <div className="space-y-4">
            {publishedFaqs.map((faq) => (
              <details
                key={faq.id}
                className="group rounded-xl border border-slate-200/80 bg-slate-50/60 p-5 open:bg-white open:shadow-sm transition-all"
              >
                <summary className="cursor-pointer font-display text-base font-bold text-[#0B1020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* 8. Trust, Publisher Identity, Support & Legal Links (Section 7 Trust, NW-FR-06, NW-FR-07) */}
      <section
        aria-labelledby="product-trust-heading"
        className="rounded-2xl border border-slate-200/80 bg-[radial-gradient(at_0%_0%,rgba(37,99,235,0.08)_0px,transparent_50%),linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-8 md:p-12 space-y-8 shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
              <Shield className="h-4 w-4 text-blue-600" />
              <span>Publisher &amp; Trust</span>
            </div>
            <h3
              id="product-trust-heading"
              className="font-display text-lg font-bold text-[#0B1020]"
            >
              Published by Nevrora Works
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Operated by {STATUTORY_DETAILS.legalName} (CIN:{" "}
              {STATUTORY_DETAILS.cin}).
            </p>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
              <LifeBuoy className="h-4 w-4 text-blue-600" />
              <span>Product Support</span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#0B1020]">
              Help &amp; Enquiries
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {product.support.responseInfo}
            </p>
            <div className="flex flex-wrap gap-3 pt-1 text-xs font-semibold">
              <a
                href={`mailto:${product.support.supportEmail}`}
                className="text-blue-600 hover:underline"
              >
                {product.support.supportEmail}
              </a>
              <span>&bull;</span>
              <Link
                href={product.support.supportUrl}
                className="text-blue-600 hover:underline"
              >
                Support Directory &rarr;
              </Link>
            </div>
          </div>

          <div className="space-y-2 product-privacy-link">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>Product Legal Disclosures</span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#0B1020]">
              Privacy &amp; Terms (v{product.legal.version})
            </h3>
            <p className="text-xs text-slate-600">
              Effective Date: {product.legal.effectiveDate}
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-xs font-semibold">
              <Link
                href={product.legal.privacyUrl}
                className="text-blue-600 underline hover:text-blue-800"
              >
                Privacy Notice &rarr;
              </Link>
              <Link
                href={product.legal.termsUrl}
                className="text-blue-600 underline hover:text-blue-800"
              >
                Product Terms &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
