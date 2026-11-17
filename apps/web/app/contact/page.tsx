import React from "react";
import { ContactForm } from "../../components/contact/ContactForm";
import { STATUTORY_DETAILS } from "@nevrora/config";
import {
  Mail,
  Phone,
  MapPin,
  Shield,
  Clock,
  Compass,
  Rocket,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Conversation | Contact",
  description:
    "Discuss a prospective venture, custom software engagement, or strategic partnership with Nevrora Ventures.",
};

interface ContactPageProps {
  searchParams?: Promise<{
    type?: string;
    category?: string;
  }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const initialType = resolvedSearchParams?.type || "";
  const initialCategory = resolvedSearchParams?.category || "";

  return (
    <div className="contact-container min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Statutory Disclosures */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700">
                <span>Engagement Portal</span>
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1020]">
                Start a Conversation
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you have an ambitious venture idea to co-build, require
                elite engineering architecture, or want to discuss strategic
                partnership—we look forward to hearing from you.
              </p>
            </div>

            {/* Context Callout if category is provided */}
            {initialCategory && (
              <div className="rounded-lg border border-blue-200/80 bg-blue-50/60 p-4 text-xs text-[#0B1020] space-y-1">
                <span className="font-semibold text-blue-700 uppercase tracking-wider block">
                  Preserved Engagement Context
                </span>
                <p className="text-slate-600">
                  Inquiring with context:{" "}
                  <code className="text-blue-700 font-mono">
                    {initialCategory}
                  </code>
                </p>
              </div>
            )}

            {/* Official Contact Strip */}
            <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 text-sm shadow-sm">
              <h3 className="font-display text-base font-semibold text-[#0B1020]">
                Direct Communication Channels
              </h3>
              <div className="space-y-3 text-slate-600">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-blue-600 shrink-0" />
                  <a
                    href={`mailto:${STATUTORY_DETAILS.email}`}
                    className="text-[#0B1020] hover:text-blue-600 transition-colors break-all"
                  >
                    {STATUTORY_DETAILS.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>{STATUTORY_DETAILS.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{STATUTORY_DETAILS.registeredOffice}</span>
                </div>
              </div>
            </div>

            {/* 7-Day Technical Onboarding & Architecture SLA Infographic */}
            <div className="rounded-2xl border border-blue-500/15 bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/35 p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <h2 className="font-display text-sm font-bold text-[#0B1020]">
                    7-Day Technical Onboarding &amp; SLA
                  </h2>
                </div>
                <span className="rounded-full bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 text-[10px] font-semibold text-blue-700">
                  Deterministic Intake
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white/90 p-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 font-display font-bold">
                    24h
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1020]">
                      Hour 24: Principal Architect Triage
                    </div>
                    <p className="text-slate-600 leading-relaxed mt-0.5">
                      Direct systems review of your existing stack, bottlenecks,
                      compliance posture, and delivery timeline.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white/90 p-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-600">
                    <Compass className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1020]">
                      Day 3: System Architecture &amp; Scope Blueprint
                    </div>
                    <p className="text-slate-600 leading-relaxed mt-0.5">
                      Interactive technical RFC detailing cloud topology,
                      AI/data pipelines, milestone SLAs, and fixed cost
                      envelopes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white/90 p-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-600/10 text-violet-600">
                    <Rocket className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1020]">
                      Day 7: Engineering Pod Kickoff
                    </div>
                    <p className="text-slate-600 leading-relaxed mt-0.5">
                      Repository provisioning, CI/CD observability baseline, and
                      Sprint 1 execution inside your security perimeter.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Assurance */}
            <div className="flex items-start gap-3 text-xs text-slate-600 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4">
              <Shield className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <p>
                In compliance with the DPDP Act 2023, submissions are used
                exclusively to evaluate and respond to your inquiry. We never
                share or monetize your information.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm
              initialType={initialType}
              initialCategory={initialCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
