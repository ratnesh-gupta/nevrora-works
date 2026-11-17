import React from "react";
import Link from "next/link";
import Image from "next/image";
import { STATUTORY_DETAILS } from "@nevrora/config";
import {
  ArrowRight,
  ShieldCheck,
  Target,
  Heart,
  Award,
  RefreshCw,
  Cpu,
  Layers,
  Rocket,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Institutional Venture Studio",
  description:
    "Company vision, engineering methodology, operating principles, and corporate governance.",
};

const PRINCIPLES = [
  {
    title: "Customer & Problem First",
    desc: "We prioritize real, verified operational friction over speculative technological novelties.",
    icon: Target,
  },
  {
    title: "Operational Discipline",
    desc: "Rigorous milestone governance, test-driven implementations, and continuous telemetry.",
    icon: ShieldCheck,
  },
  {
    title: "Responsible Growth",
    desc: "Sustainable business unit economics and capital-efficient venture scaling.",
    icon: Award,
  },
  {
    title: "Meaningful Impact",
    desc: "Engineering systems and ventures that leave positive, durable impact on human communities.",
    icon: Heart,
  },
];

export default function AboutPage() {
  return (
    <article className="about-page relative min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700">
              <span>Corporate Vision & Governance</span>
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B1020]">
              Engineering Durable Value with Institutional Conviction.
            </h1>
            <p className="text-xl text-blue-600 font-medium leading-relaxed">
              Engineering philosophy: Ideas &rarr; Build &rarr; Grow &rarr;
              Impact.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Nevrora Technologies Private Limited is a specialized venture
              studio and engineering consultancy. We design, construct, and
              scale software platforms and bespoke venture companies engineered
              to endure market shifts.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                alt="Nevrora Technologies engineering studio and architecture lab"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/75 via-[#0B1020]/15 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/25 bg-white/95 backdrop-blur-md p-3.5 shadow-sm">
                <div className="flex items-center justify-between text-xs font-semibold text-[#0B1020]">
                  <span>Venture Studio &amp; IT Advisory Lab</span>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-200">
                    Dual-Engine R&amp;D
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Production systems hardened in-house before deployment to
                  client enterprises.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Nevrora Dual-Engine Flywheel Infographic */}
        <section
          aria-label="The Nevrora Dual-Engine Flywheel"
          className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/40 to-violet-50/40 p-6 sm:p-8 md:p-10 shadow-sm space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/70 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white shadow-sm">
                <RefreshCw className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-[#0B1020]">
                  The Nevrora Dual-Engine Flywheel Infographic
                </h2>
                <p className="text-xs text-slate-600">
                  How enterprise client transformations and proprietary product
                  ventures compound shared engineering IP
                </p>
              </div>
            </div>
            <span className="rounded-full border border-violet-200 bg-white px-3 py-1 text-[11px] font-semibold text-violet-700">
              Continuous IP Compounding
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            <div className="rounded-xl border border-slate-200/80 bg-white p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 border border-blue-200/70">
                  Engine 01
                </span>
                <Layers className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-display text-base font-bold text-[#0B1020]">
                Enterprise IT Advisory
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real-world constraints from high-throughput FinTech,
                supply-chain logistics, and cloud modernization engagements feed
                battle-tested architectural patterns directly into our R&amp;D
                core.
              </p>
            </div>

            <div className="rounded-xl border border-blue-300/70 bg-gradient-to-br from-blue-600/5 via-white to-violet-600/5 p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-gradient-to-r from-[#2563EB] to-[#7C3AED] px-2.5 py-1 text-[11px] font-semibold text-white">
                  Shared Core Hub
                </span>
                <Cpu className="h-4 w-4 text-violet-600" />
              </div>
              <h3 className="font-display text-base font-bold text-[#0B1020]">
                Shared Core IP &amp; AI Accelerators
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reusable multi-agent orchestration pipelines, TypeScript-strict
                SDKs, Kubernetes GitOps blueprints, and zero-trust compliance
                modules accelerate time-to-production across every build.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700 border border-violet-200/70">
                  Engine 02
                </span>
                <Rocket className="h-4 w-4 text-violet-600" />
              </div>
              <h3 className="font-display text-base font-bold text-[#0B1020]">
                In-House Venture Studio
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Proprietary platforms like Neermiti Collections and Sadhana
                Daily stress-test edge performance, WASM offline compute, and
                modern UX at consumer scale—returning proven innovations to
                enterprise clients.
              </p>
            </div>
          </div>
        </section>

        {/* Operating Principles */}
        <div className="space-y-8">
          <h2 className="font-display text-3xl font-bold text-[#0B1020]">
            Our Four Guiding Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRINCIPLES.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6 space-y-4 hover:border-blue-400/50 hover:shadow-md shadow-sm transition-all"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-200/60">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0B1020]">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Corporate Governance Section */}
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-8 md:p-12 space-y-6 shadow-sm">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1020]">
            Corporate Governance & Statutory Transparency
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            Incorporated under the Companies Act, 2013, Nevrora operates with
            unwavering regulatory transparency, data minimization under the DPDP
            Act 2023, and rigorous corporate fiduciary standards.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <span className="font-semibold text-blue-700 block mb-1">
                Corporate Entity
              </span>
              <p className="text-[#0B1020] break-words">
                {STATUTORY_DETAILS.legalName}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <span className="font-semibold text-blue-700 block mb-1">
                Corporate Identity Number (CIN)
              </span>
              <p className="text-[#0B1020] font-mono break-words">
                {STATUTORY_DETAILS.cin}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <span className="font-semibold text-blue-700 block mb-1">
                Registered Jurisdiction
              </span>
              <p className="text-[#0B1020] break-words">
                {STATUTORY_DETAILS.registeredOffice}
              </p>
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="rounded-2xl border border-slate-200/80 bg-[radial-gradient(at_0%_0%,rgba(37,99,235,0.08)_0px,transparent_50%),linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-8 md:p-12 text-center space-y-6 shadow-sm">
          <h2 className="font-display text-3xl font-bold text-[#0B1020]">
            Collaborate with Nevrora
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Discuss strategic partnerships, bespoke technology engagements, or
            investment inquiries with our leadership team.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/20 hover:opacity-95 transition-all"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
