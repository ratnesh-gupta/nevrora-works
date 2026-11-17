import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "../components/hero/HeroSection";
import { ProductCard } from "../components/products/ProductCard";
import {
  EnterpriseTelemetryStrip,
  MarketArchitectureInfographic,
  MethodologyLifecycleInfographic,
  SERVICE_VISUAL_META,
} from "../components/infographics/MarketInfographics";
import { getPublishedServices } from "../lib/services-data";
import { getPublishedProducts } from "../lib/products-data";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nevrora Ventures | Institutional Venture Studio & Engineering Advisory",
  description:
    "Pioneering high-conviction technology ventures, intelligent automation pipelines, and resilient platforms.",
};

export default function HomePage() {
  const services = getPublishedServices();
  const products = getPublishedProducts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 3D Interactive Hero */}
      <HeroSection />

      {/* Measured Enterprise Telemetry Strip Infographic */}
      <EnterpriseTelemetryStrip />

      {/* Services Overview Section */}
      <section className="services-overview py-20 bg-slate-50/50 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 font-mono">
                Market IT Engineering Disciplines
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1020]">
                Our Core Capabilities
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Six dedicated practices architecting custom software, autonomous
                AI pipelines, and resilient cloud systems backed by verified
                production SLAs.
              </p>
            </div>
            <div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
              >
                <span>View All Services</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const meta =
                SERVICE_VISUAL_META[service.slug] ??
                SERVICE_VISUAL_META["custom-software-development"];
              if (!meta) return null;

              return (
                <div
                  key={service.slug}
                  className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden flex flex-col justify-between hover:border-blue-400/50 hover:shadow-xl shadow-sm transition-all group"
                >
                  <div>
                    {/* Curated Visual Header + Primary KPI Overlay */}
                    <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={meta.imageUrl}
                        alt={meta.imageAlt}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/85 via-[#0B1020]/25 to-transparent" />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] font-bold bg-white/95 text-[#0B1020] px-2.5 py-0.5 rounded-full shadow-sm">
                          {service.number}
                        </span>
                        <span className="font-mono text-[11px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                          {meta.primaryMetric.value} {meta.primaryMetric.label}
                        </span>
                      </div>
                      <span className="absolute bottom-2.5 left-3.5 right-3.5 text-[11px] font-mono text-cyan-200 truncate">
                        {meta.tagline}
                      </span>
                    </div>

                    <div className="p-6 pb-2 space-y-3">
                      <h3 className="font-display text-xl font-bold text-[#0B1020] group-hover:text-blue-600 transition-colors">
                        <Link href={`/services/${service.slug}`}>
                          {service.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {service.statement}
                      </p>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {service.techBadges.slice(0, 3).map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center rounded-md border border-blue-500/20 bg-blue-50/60 px-2 py-0.5 text-[11px] font-medium text-blue-700"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 mt-4 border-t border-slate-100">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:underline"
                    >
                      <span>View Architecture & Specs</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-Tier Market IT Solutions Architecture Infographic */}
      <MarketArchitectureInfographic />

      {/* Incubation Portfolio Preview */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 font-mono">
                Incubation Portfolio
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1020]">
                Venture Showcases
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Transformative standalone businesses incubated and engineered
                in-house as white-label-ready engines.
              </p>
            </div>
            <div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
              >
                <span>Explore Full Portfolio</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Operating Methodology Pipeline Infographic: Ideas -> Build -> Grow -> Impact */}
      <MethodologyLifecycleInfographic />

      {/* Primary CTA Banner */}
      <section className="py-20 bg-[radial-gradient(at_0%_0%,rgba(37,99,235,0.08)_0px,transparent_50%),linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] border-t border-slate-200/80">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1020]">
            Have a Consequential Platform or Venture to Build?
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We partner with discerning enterprises, investors, and founders to
            architect software platforms and incubation-grade ventures that
            endure.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-blue-500/20 hover:opacity-95 transition-all"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
