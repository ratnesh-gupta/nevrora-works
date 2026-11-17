import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CASE_STUDIES } from "../../lib/case-studies-data";
import { Briefcase, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work & Case Studies | Portfolio",
  description:
    "Selected engineering transformations and venture delivery highlights.",
};

interface CaseStudyVisual {
  image: string;
  alt: string;
  kpiBadge: string;
  metricLabel: string;
  beforeLabel: string;
  afterLabel: string;
  beforePercent: number;
  afterPercent: number;
}

const CASE_STUDY_VISUALS: Record<string, CaseStudyVisual> = {
  "autonomous-intelligence-pipeline": {
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
    alt: "Autonomous supply-chain and logistics warehouse operations",
    kpiBadge: "-42% Dispatch Triage",
    metricLabel: "Manual Triage Overhead",
    beforeLabel: "Baseline: 100%",
    afterLabel: "After AI: 58% (-42%)",
    beforePercent: 100,
    afterPercent: 58,
  },
  "high-throughput-wealth-engine": {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    alt: "High-throughput fintech portfolio analytics dashboard",
    kpiBadge: "800x Compute Speedup",
    metricLabel: "Portfolio Batch Compute Window",
    beforeLabel: "Legacy: 4h (14,400s)",
    afterLabel: "Modernized: 18s (800x)",
    beforePercent: 100,
    afterPercent: 6,
  },
  "artisanal-provenance-commerce": {
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80",
    alt: "Artisanal luxury handloom weave and silk craftmanship",
    kpiBadge: "3.4x Provenance Lift",
    metricLabel: "Collector Dwell & Verification Lift",
    beforeLabel: "Baseline: 1.0x",
    afterLabel: "Verified Craft: 3.4x",
    beforePercent: 29,
    afterPercent: 100,
  },
};

const PORTFOLIO_TELEMETRY = [
  {
    value: "800x",
    label: "Compute Acceleration",
    detail: "4 hours compressed to 18s via Kafka & Rust workers",
  },
  {
    value: "-42%",
    label: "Dispatch Overhead",
    detail: "Automated LLM invoice & customs triage under 200ms",
  },
  {
    value: "3.4x",
    label: "Engagement Lift",
    detail: "Interactive cryptographic weave storytelling & proof",
  },
  {
    value: "99.99%",
    label: "Production Uptime",
    detail: "Multi-region Kubernetes reliability with zero-downtime SLA",
  },
];

export default function OurWorkPage() {
  return (
    <div className="case-studies min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Proven Outcomes</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1020]">
            Our Work & Case Studies
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Selected engineering transformations and venture delivery highlights
            demonstrating our commitment to durability, throughput, and clean
            architecture.
          </p>
        </div>

        {/* Portfolio Impact Telemetry Infographic */}
        <section
          aria-label="Portfolio Impact Telemetry"
          className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/35 to-indigo-50/40 p-6 sm:p-8 shadow-sm space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/70 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-display text-base sm:text-lg font-bold text-[#0B1020]">
                  Portfolio Impact Telemetry Infographic
                </h2>
                <p className="text-xs text-slate-600">
                  Measured production benchmarks across enterprise modernization
                  &amp; venture builds
                </p>
              </div>
            </div>
            <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-[11px] font-semibold text-blue-700">
              Verified Client Outcomes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO_TELEMETRY.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-slate-200/80 bg-white/90 p-5 shadow-sm flex flex-col justify-between gap-2"
              >
                <span className="font-display text-3xl font-bold bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
                  {metric.value}
                </span>
                <div>
                  <div className="font-display text-sm font-semibold text-[#0B1020]">
                    {metric.label}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    {metric.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Case Studies Listing */}
        <div className="space-y-12">
          {CASE_STUDIES.map((study) => {
            const visual = CASE_STUDY_VISUALS[study.slug];
            return (
              <article
                key={study.slug}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 md:p-12 hover:border-blue-400/50 shadow-sm hover:shadow-md transition-all space-y-8"
              >
                {visual && (
                  <div className="relative h-52 sm:h-64 w-full overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100">
                    <Image
                      src={visual.image}
                      alt={visual.alt}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/70 via-[#0B1020]/15 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#0B1020] shadow-sm">
                        {study.industry}
                      </span>
                      <span className="rounded-full bg-blue-600/95 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                        {visual.kpiBadge}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {study.industry}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1020] mt-1">
                      {study.title}
                    </h3>
                  </div>
                  {study.client && (
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600 font-medium">
                      Client: {study.client}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-display text-base font-semibold text-[#0B1020] mb-1">
                        The Operational Challenge
                      </h4>
                      <p className="text-slate-600 leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-display text-base font-semibold text-[#0B1020] mb-1">
                        Architectural Solution
                      </h4>
                      <p className="text-slate-600 leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-blue-500/15 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-6 space-y-5">
                    <h4 className="font-display text-base font-semibold text-blue-800">
                      Measured Business Results
                    </h4>

                    {visual && (
                      <div className="rounded-lg border border-blue-200/70 bg-white/85 p-3.5 space-y-2.5">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          Before / After Telemetry: {visual.metricLabel}
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-slate-600">
                              <span>Previous State</span>
                              <span className="font-medium">
                                {visual.beforeLabel}
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-200/80 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-slate-400"
                                style={{ width: `${visual.beforePercent}%` }}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-blue-800 font-semibold">
                              <span>Nevrora Architecture</span>
                              <span>{visual.afterLabel}</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-blue-100 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED]"
                                style={{ width: `${visual.afterPercent}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <ul className="space-y-2 text-xs text-[#0B1020]">
                      {study.results.map((res) => (
                        <li key={res} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-slate-200/60">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 block mb-2 font-semibold">
                        Tech Stacks Employed
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {study.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-white px-2.5 py-0.5 text-[11px] font-medium text-blue-700 border border-blue-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-200/80 bg-[radial-gradient(at_0%_0%,rgba(37,99,235,0.08)_0px,transparent_50%),linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-8 md:p-12 text-center space-y-6 shadow-sm">
          <h2 className="font-display text-3xl font-bold text-[#0B1020]">
            Ready to Engineer Your Own Success Story?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Schedule a technical discovery session with our engineering
            directors.
          </p>
          <div>
            <Link
              href="/contact?type=Business+collaboration"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/20 hover:opacity-95 transition-all"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
