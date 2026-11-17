import React from "react";
import Link from "next/link";
import { getPublishedProducts } from "../../lib/products-data";
import { ProductCard } from "../../components/products/ProductCard";
import { ArrowRight, Compass, Layers } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venture Portfolio",
  description:
    "Curated launch products incubated and scaled by Nevrora Ventures.",
};

const WHITE_LABEL_STEPS = [
  {
    step: "01",
    title: "Core Engine Provisioning",
    description:
      "Deploy verified headless commerce or offline-first WASM kernels with hardened API contracts.",
    tag: "Multi-Tenant Core",
  },
  {
    step: "02",
    title: "Brand Token & Domain Skinning",
    description:
      "Inject enterprise design tokens, custom domains, and localized copy without forking core logic.",
    tag: "White-Label Ready",
  },
  {
    step: "03",
    title: "API & ERP Integration",
    description:
      "Wire Stripe Connect, webhooks, telemetry streams, and regulatory privacy ledgers into your stack.",
    tag: "Event-Driven",
  },
  {
    step: "04",
    title: "Dedicated Cloud Launch",
    description:
      "Roll out onto isolated Kubernetes clusters with 99.99% SLA observability and full source handover.",
    tag: "Zero-Downtime",
  },
];

export default function ProductsPage() {
  const products = getPublishedProducts();

  return (
    <div className="products-index min-h-screen py-16 md:py-24 bg-canvas">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-20">
        <div>
          {/* Header */}
          <div className="max-w-3xl space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3.5 py-1 text-xs font-semibold text-blue-700">
              <Compass className="h-3.5 w-3.5" />
              <span>Incubated Ventures & White-Label Engines</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1020]">
              Venture Portfolio
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our incubation-grade products combine rigorous engineering
              execution with distinct cultural and market conviction, built as
              reusable multi-tenant and white-label platforms.
            </p>
          </div>

          {/* Products Grid */}
          <div className="products-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>

        {/* White-Label & Multi-Tenant Platform Licensing Infographic */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-elevated space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-blue-700">
                <Layers className="h-3.5 w-3.5 text-blue-600" />
                <span>White-Label Licensing Blueprint</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1020]">
                Deploy Nevrora Core Engines Under Your Brand
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every internal product we incubate doubles as a battle-tested
                reference architecture that enterprise partners can white-label
                in weeks instead of years.
              </p>
            </div>
            <Link
              href="/contact?type=Strategic+partnership"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-xs font-semibold text-white shadow-sm hover:opacity-95 transition-all"
            >
              <span>Request White-Label License</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHITE_LABEL_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 space-y-3 hover:border-blue-400/50 hover:bg-white transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-2.5 py-0.5 rounded-full">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-mono font-medium text-blue-700">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-[#0B1020]">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
