import React from "react";
import Link from "next/link";
import Image from "next/image";
import { STATUTORY_DETAILS, OFFICIAL_SUPPORT_EMAIL } from "@nevrora/config";
import {
  ArrowRight,
  ShieldCheck,
  Target,
  Heart,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Nevrora Works & Innovation",
  description:
    "Product philosophy, build principles, lifecycle standards, and corporate governance of Nevrora Works — Ideas into products.",
};

const PRINCIPLES = [
  {
    title: "User Problem First",
    desc: "Every Nevrora Works product starts with a clear everyday problem and a well-defined audience rather than technology for its own sake.",
    icon: Target,
  },
  {
    title: "Calm & Accessible Craft",
    desc: "We design interfaces that respect user attention, support keyboard navigation, and perform reliably across devices.",
    icon: Heart,
  },
  {
    title: "Honest Lifecycle Transparency",
    desc: "From Coming Soon and Beta through Live availability, we state platform readiness clearly and never publish unverified store links.",
    icon: Layers,
  },
  {
    title: "Privacy & Trust by Design",
    desc: "Each product ships with dedicated DPDP Act 2023 privacy disclosures, data minimization, and direct product support.",
    icon: ShieldCheck,
  },
];

const LIFECYCLE_STAGES = [
  {
    stage: "Coming Soon",
    detail:
      "Approved product preview with accurate scope and Notify Me registration — without speculative launch dates.",
  },
  {
    stage: "Beta",
    detail:
      "Limited early-access release with clear eligibility criteria and documented preview boundaries.",
  },
  {
    stage: "Live",
    detail:
      "Generally available on verified Google Play, iOS, or web destinations with active support.",
  },
  {
    stage: "Maintenance & Long-Term Care",
    detail:
      "Transparent status notices during upgrades and responsible migration paths if a product is ever retired.",
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
              <Sparkles className="h-3.5 w-3.5" />
              <span>About Nevrora Works &amp; Product Philosophy</span>
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B1020]">
              Ideas into Products That Earn Everyday Trust.
            </h1>
            <p className="text-xl text-blue-600 font-medium leading-relaxed">
              Nevrora Works is the product business of Nevrora, dedicated to
              creating, owning, and operating useful digital products.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              We build focused applications across mobile, web, SaaS, and
              AI-enabled categories. Whether it is a calm daily practice
              companion like Sadhana Daily, a provenance-first commerce
              experience like Neermiti Collections, or an operational SaaS like
              DriveIQ, every product is crafted for long-term utility.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                alt="Nevrora Works product design and innovation studio"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/75 via-[#0B1020]/15 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/25 bg-white/95 backdrop-blur-md p-3.5 shadow-sm">
                <div className="flex items-center justify-between text-xs font-semibold text-[#0B1020]">
                  <span>Nevrora Works Product Portfolio</span>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-200">
                    Ideas into products.
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Independent product experiences backed by unified quality,
                  privacy, and support standards.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Build Principles */}
        <section className="space-y-8" aria-labelledby="principles-heading">
          <h2
            id="principles-heading"
            className="font-display text-3xl font-bold text-[#0B1020]"
          >
            Our Product Build Principles
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
        </section>

        {/* Product Lifecycle Governance */}
        <section
          aria-labelledby="lifecycle-governance-heading"
          className="rounded-2xl border border-slate-200/80 bg-white p-8 md:p-12 shadow-sm space-y-6"
        >
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
              How We Release &amp; Operate
            </span>
            <h2
              id="lifecycle-governance-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#0B1020]"
            >
              Structured Product Lifecycle Standards
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every published product on Nevrora Works carries an explicit
              lifecycle state so users always know what is available today and
              how to get support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LIFECYCLE_STAGES.map((item) => (
              <div
                key={item.stage}
                className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-5 space-y-2"
              >
                <div className="flex items-center gap-2 font-display text-base font-bold text-[#0B1020]">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>{item.stage}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Corporate Governance Section */}
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-8 md:p-12 space-y-6 shadow-sm">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1020]">
            Corporate Governance &amp; Statutory Transparency
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            Nevrora Works is operated by {STATUTORY_DETAILS.legalName},
            incorporated under the Companies Act, 2013, with full commitment to
            user privacy under the Digital Personal Data Protection Act, 2023
            (DPDP Act 2023).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <span className="font-semibold text-blue-700 block mb-1">
                Operating Legal Entity
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
                Official Support &amp; Grievance Contact
              </span>
              <p className="text-[#0B1020] break-words">
                {OFFICIAL_SUPPORT_EMAIL}
              </p>
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="rounded-2xl border border-slate-200/80 bg-[radial-gradient(at_0%_0%,rgba(37,99,235,0.08)_0px,transparent_50%),linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-8 md:p-12 text-center space-y-6 shadow-sm">
          <h2 className="font-display text-3xl font-bold text-[#0B1020]">
            Explore the Nevrora Works Portfolio
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Browse our digital products, sign up for launch notifications, or
            get in touch with our product team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/20 hover:opacity-95 transition-all"
            >
              <span>Explore Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-[#0B1020] hover:border-blue-500 hover:text-blue-600 transition-all"
            >
              <span>Contact Works Team</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
