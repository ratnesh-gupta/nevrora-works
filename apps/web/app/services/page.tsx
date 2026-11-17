import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublishedServices } from "../../lib/services-data";
import { SERVICE_VISUAL_META } from "../../components/infographics/MarketInfographics";
import { ArrowRight, CheckCircle2, Layers, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering & Advisory Services",
  description:
    "Six dedicated engineering and strategy practices architecting resilient platforms and AI systems.",
};

const DELIVERY_ENGAGEMENT_MODELS = [
  {
    id: "01",
    name: "Dedicated Engineering Pods",
    cadence: "Bi-Weekly Sprints • Direct Principal Lead",
    sla: "99.99% CI/CD Readiness",
    description:
      "Cross-functional architects, AI engineers, and full-stack builders embedded directly into your roadmap.",
  },
  {
    id: "02",
    name: "Fixed-Scope Architecture Builds",
    cadence: "6–12 Week Turnkey Delivery",
    sla: "Full IP & Runbook Transfer",
    description:
      "End-to-end production platforms engineered to strict performance benchmarks with deterministic handover.",
  },
  {
    id: "03",
    name: "AI & Cloud Modernization",
    cadence: "10-Day Audit → Phased Strangler Rollout",
    sla: "Zero-Downtime Cutover",
    description:
      "Transform high-latency legacy monoliths into event-driven multi-region Kubernetes & RAG pipelines.",
  },
];

export default function ServicesPage() {
  const services = getPublishedServices();

  return (
    <div className="services-index min-h-screen py-16 md:py-24 bg-canvas">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-20">
        <div>
          {/* Header */}
          <div className="max-w-3xl space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3.5 py-1 text-xs font-semibold text-blue-700">
              <Layers className="h-3.5 w-3.5" />
              <span>Commercial Market IT Capabilities</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1020]">
              Engineering & Advisory Services
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              From autonomous AI agents and high-throughput systems to
              cross-platform mobile apps and cloud SRE hardening, our six
              practices deliver institutional-grade engineering with transparent
              architectural blueprints.
            </p>
          </div>

          {/* Services Grid */}
          <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const meta =
                SERVICE_VISUAL_META[service.slug] ??
                SERVICE_VISUAL_META["custom-software-development"];
              if (!meta) return null;

              return (
                <div
                  key={service.slug}
                  className="service-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:border-blue-400/50 hover:shadow-xl hover:-translate-y-1"
                >
                  <div>
                    {/* Visual Header Banner */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={meta.imageUrl}
                        alt={meta.imageAlt}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/85 via-[#0B1020]/25 to-transparent" />
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 text-xs font-bold">
                        <span className="font-mono bg-white/95 text-[#0B1020] px-2.5 py-0.5 rounded-full shadow-sm">
                          PRACTICE {service.number}
                        </span>
                        <span className="font-mono text-[11px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                          {meta.primaryMetric.value}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                        <span className="font-mono text-[11px] text-cyan-200 truncate">
                          {meta.tagline}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 pb-4 space-y-4">
                      <h3 className="font-display text-2xl font-bold text-[#0B1020] group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {service.short}
                      </p>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {service.techBadges.slice(0, 4).map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center rounded-md border border-blue-500/20 bg-blue-50/60 px-2.5 py-0.5 text-[11px] font-medium text-blue-700"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 py-5 border-t border-slate-100">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:underline"
                    >
                      <span>View Architecture & Specs</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enterprise IT Solutions Delivery & SLA Infographic */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-elevated space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-blue-700">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span>Enterprise IT Solutions Delivery & SLA Infographic</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1020]">
                Structured Engagement Models Engineered for Predictability
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Select an execution topology matched to your internal team
                maturity, compliance boundaries, and target time-to-production.
              </p>
            </div>
            <Link
              href="/contact?type=Business+collaboration"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-6 py-3 text-xs font-semibold text-white shadow-sm hover:opacity-95 transition-all"
            >
              <span>Request Architecture Scoping</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DELIVERY_ENGAGEMENT_MODELS.map((model) => (
              <div
                key={model.id}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-2.5 py-0.5 rounded-full">
                      MODEL {model.id}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-blue-700">
                      {model.cadence}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0B1020]">
                    {model.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {model.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 flex items-center gap-2 text-xs font-semibold text-blue-700">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Guarantee: {model.sla}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
