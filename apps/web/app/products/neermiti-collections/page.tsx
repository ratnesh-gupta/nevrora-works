import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "../../../lib/products-data";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Sparkles,
  Shield,
  CheckCircle,
  Layers,
  Network,
} from "lucide-react";
import type { Metadata } from "next";

const NEERMITI_ECOSYSTEM_FLOW = [
  {
    stage: "01 CLUSTER",
    title: "14 Master Weaver Clusters",
    detail: "Direct sourcing across verified regional handloom cooperatives.",
    tech: "Provenance Metadata",
  },
  {
    stage: "02 LEDGER",
    title: "Cryptographic Origin Hash",
    detail:
      "Each weave batch anchored with loom ID, dye batch, and artisan attribution.",
    tech: "PostgreSQL • Audit",
  },
  {
    stage: "03 EDGE",
    title: "3D WebGL & Headless Store",
    detail:
      "Tactile fabric inspection paired with sub-second global storefront loads.",
    tech: "Next.js 15 • Three.js",
  },
  {
    stage: "04 SETTLE",
    title: "Omnichannel & Royalty Split",
    detail:
      "Automated split-payout settlements routing fair share directly to weavers.",
    tech: "Stripe Connect • GraphQL",
  },
];

export const metadata: Metadata = {
  title: "Neermiti Collections | Venture Showcase",
  description:
    "Artisanal handloom textiles and considered lifestyle pieces for mindful living.",
};

export default function NeermitiCollectionsPage() {
  const product = getProductBySlug("neermiti-collections");
  if (!product) notFound();

  return (
    <article
      className="product-showcase relative mx-auto max-w-7xl px-6 py-16 lg:px-8"
      data-slug={product.slug}
    >
      {/* 2-Column Visual Hero Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-full">
              VENTURE {product.number}
            </span>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="product-category">{product.category}</span>
            </div>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B1020]">
            {product.title}
          </h1>

          <p className="product-summary text-xl text-blue-600 font-medium leading-relaxed">
            {product.summary}
          </p>

          <p className="product-overview text-base text-slate-600 leading-relaxed">
            {product.overview}
          </p>
        </div>

        {/* Curated Product Visual + Telemetry Overlays */}
        <div className="lg:col-span-5 relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80"
            alt="Neermiti Collections artisanal textiles and curated lifestyle fashion"
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/85 via-[#0B1020]/20 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono font-bold text-[#0B1020] shadow-md">
              14 Artisan Clusters
            </span>
            <span className="rounded-full bg-blue-600/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono font-bold text-white shadow-md">
              &lt;0.8s Edge LCP
            </span>
          </div>
        </div>
      </div>

      {/* Artisan Heritage & Value Proposition */}
      <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 space-y-4 shadow-sm">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
            Audience Focus
          </span>
          <h3 className="font-display text-2xl font-bold text-[#0B1020]">
            For Connoisseurs of Restraint
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {product.audience}
          </p>
        </div>

        <div className="product-value-prop rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-8 space-y-4 shadow-sm">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
            Value Proposition
          </span>
          <h3 className="font-display text-2xl font-bold text-[#0B1020]">
            Ethical Artisan Supply Chains
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            {product.valueProposition}
          </p>
          <div className="pt-4 flex items-center gap-2 text-xs text-blue-700 font-medium">
            <Shield className="h-4 w-4 shrink-0" />
            <span>Cryptographically Verified Master Artisan Provenance</span>
          </div>
        </div>
      </div>

      {/* White-Label Ecosystem & Architecture Stack */}
      {(product.whiteLabelEcosystem || product.techBadges) && (
        <div className="my-12 rounded-2xl border border-slate-200/80 bg-white p-8 space-y-5 shadow-sm">
          {product.whiteLabelEcosystem && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                <Layers className="h-4 w-4 text-blue-600 shrink-0" />
                <span>{product.whiteLabelEcosystem.architectureType}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.whiteLabelEcosystem.highlight}
              </p>
            </div>
          )}
          {product.techBadges && product.techBadges.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {product.techBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center rounded-md border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-violet-500/5 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* 4-Stage Loom-to-Ledger Infographic */}
          <div className="pt-6 mt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
              <Network className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Loom-to-Ledger Provenance Pipeline Infographic</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {NEERMITI_ECOSYSTEM_FLOW.map((step) => (
                <div
                  key={step.stage}
                  className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 space-y-2"
                >
                  <span className="inline-block font-mono text-[10px] font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-2.5 py-0.5 rounded-full">
                    {step.stage}
                  </span>
                  <h4 className="font-display text-sm font-bold text-[#0B1020]">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.detail}
                  </p>
                  <span className="block font-mono text-[11px] font-semibold text-blue-700 pt-1">
                    {step.tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Core Features */}
      <div className="product-features my-12 rounded-2xl border border-slate-200/80 bg-white p-8 md:p-12 shadow-sm">
        <h3 className="font-display text-2xl font-bold text-[#0B1020] mb-6">
          Core Features & Craftsmanship Pillars
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {product.features.map((feature) => (
            <div key={feature} className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-200/60 shrink-0">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-display text-base font-semibold text-[#0B1020] mb-1">
                  {feature}
                </h4>
                <p className="text-xs text-slate-600">
                  Preserving indigenous craft heritage with contemporary design
                  precision.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory Privacy Link & Primary CTA */}
      <div className="my-16 rounded-2xl border border-slate-200/80 bg-[radial-gradient(at_0%_0%,rgba(37,99,235,0.08)_0px,transparent_50%),linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-display text-2xl font-bold text-[#0B1020]">
            Discover the Neermiti Collection
          </h3>
          <p className="text-sm text-slate-600">
            Explore curated garments and discuss bespoke corporate gifting
            collaborations.
          </p>
          <div className="product-privacy-link pt-2">
            <Link
              href="/products/neermiti-collections/privacy"
              className="text-xs font-medium text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              Privacy Notice for Neermiti Collections &rarr;
            </Link>
          </div>
        </div>

        <Link
          href="/contact?type=Venture+idea&category=neermiti-collections"
          className="cta-btn shrink-0 inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/20 hover:opacity-95 transition-all"
        >
          <span>{product.cta}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
