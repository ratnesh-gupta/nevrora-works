import React from "react";
import Link from "next/link";
import type { Service } from "@nevrora/types";
import { ProcessStepper } from "./ProcessStepper";
import { TechBadgeGrid } from "./TechBadgeGrid";
import { ServiceArchitectureInfographic } from "../infographics/MarketInfographics";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";

interface ServiceDetailViewProps {
  service: Service;
}

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  return (
    <article
      className="service-detail relative mx-auto max-w-7xl px-6 py-16 lg:px-8"
      data-slug={service.slug}
    >
      {/* Service Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-xs font-semibold text-blue-700">
          <span>SERVICE {service.number}</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1020]">
          {service.title}
        </h1>
        <p className="commercial-statement text-xl text-blue-600 font-medium leading-relaxed">
          {service.statement}
        </p>
        <p className="text-base text-slate-600 leading-relaxed">
          {service.short}
        </p>
      </div>

      {/* Visual Hero, System Topology & Before/After Benchmark Infographic */}
      <ServiceArchitectureInfographic slug={service.slug} />

      {/* Problems & Capabilities Grid */}
      <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Pain Points Addressed */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#0B1020]">
              Challenges We Eliminate
            </h2>
          </div>
          <ul className="space-y-4 text-sm text-slate-600">
            {service.problems.map((problem) => (
              <li key={problem} className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span>{problem}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Capabilities Provided */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#0B1020]">
              Core Capabilities
            </h2>
          </div>
          <ul className="space-y-4 text-sm text-slate-600">
            {service.capabilities.map((capability) => (
              <li key={capability} className="flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Deliverables Section */}
      <div className="my-12 rounded-2xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm">
        <h3 className="font-display text-xl font-bold text-[#0B1020] mb-6">
          Commercial Deliverables & Artifacts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {service.deliverables.map((deliv, idx) => (
            <div
              key={deliv}
              className="rounded-xl border border-slate-200/60 bg-slate-50/70 p-4 space-y-2"
            >
              <span className="text-xs font-mono font-bold text-blue-600">
                0{idx + 1}
              </span>
              <p className="text-sm font-medium text-slate-800">{deliv}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Process Stepper */}
      <ProcessStepper
        steps={service.processSteps}
        serviceTitle={service.title}
      />

      {/* Technology Badges Grid */}
      <TechBadgeGrid badges={service.techBadges} />

      {/* Service CTA Section */}
      <div className="service-cta my-16 rounded-2xl border border-slate-200/80 bg-[radial-gradient(at_0%_0%,rgba(37,99,235,0.08)_0px,transparent_50%),linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-8 md:p-12 text-center space-y-6 shadow-md">
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1020]">
          Ready to deploy {service.title}?
        </h3>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Start a direct conversation with our engineering leadership to review
          requirements, scope architectures, and receive a tailored
          implementation plan.
        </p>
        <div>
          <Link
            href={`/contact?category=${encodeURIComponent(service.slug)}&type=Business+collaboration`}
            className="cta-btn inline-flex max-w-full items-center justify-center text-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-blue-500/20 hover:opacity-95 transition-all break-words"
          >
            <span className="break-words">
              Start a Conversation for {service.title}
            </span>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        </div>
      </div>
    </article>
  );
}
