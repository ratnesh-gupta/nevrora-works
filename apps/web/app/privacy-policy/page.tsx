import React from "react";
import Link from "next/link";
import { SITE_PRIVACY_POLICY } from "../../lib/legal-data";
import { STATUTORY_DETAILS } from "@nevrora/config";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DPDP Act 2023 Compliance",
  description:
    "Comprehensive privacy policy conforming to the Digital Personal Data Protection Act, 2023.",
};

export default function PrivacyPolicyPage() {
  const policy = SITE_PRIVACY_POLICY;

  return (
    <article className="privacy-policy relative mx-auto max-w-5xl px-6 py-16 lg:px-8">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200/80 pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Statutory Data Protection Disclosure</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1020]">
          {policy.title}
        </h1>
        <p className="text-sm text-slate-600">
          Last updated: {policy.lastUpdated} &bull; Applicable Law: Digital
          Personal Data Protection Act, 2023 (DPDP Act 2023)
        </p>
      </div>

      {/* Overview & Notice */}
      <div className="my-10 space-y-6 text-sm text-slate-600 leading-relaxed">
        <p className="text-base text-[#0B1020] font-medium">
          Nevrora Technologies Private Limited (&ldquo;Nevrora Ventures&rdquo;)
          is committed to transparent, purposeful processing of personal data in
          strict alignment with the Digital Personal Data Protection Act, 2023
          (&ldquo;DPDP Act 2023&rdquo;).
        </p>

        {/* Clauses */}
        <div className="space-y-10 pt-4">
          {policy.clauses.map((clause, idx) => (
            <section key={clause.heading} className="space-y-4">
              <h2 className="font-display text-xl font-bold text-[#0B1020] flex items-center gap-2">
                <span className="text-blue-600 font-mono text-sm">
                  0{idx + 1}.
                </span>
                <span>{clause.heading}</span>
              </h2>
              {clause.body.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
              {clause.list && (
                <ul className="space-y-2 list-disc pl-5 text-slate-700">
                  {clause.list.map((item, lIdx) => (
                    <li key={lIdx}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Data Principal Statutory Rights Section */}
        <section className="my-12 rounded-2xl border border-blue-200/80 bg-blue-50/40 p-8 space-y-4">
          <h2 className="font-display text-2xl font-bold text-[#0B1020]">
            Statutory Data Principal Rights & Redressal (Section 11 & 12)
          </h2>
          <p>
            As a Data Principal under Indian law, you possess enforceable rights
            that can be exercised directly through our Grievance Officer:
          </p>
          <ul className="space-y-3 pl-2">
            {policy.rights.map((right) => (
              <li key={right} className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span className="text-[#0B1020]">{right}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Designated Grievance Officer */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-8 space-y-4 shadow-sm">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            Designated Grievance & Data Protection Officer
          </h2>
          <p>
            In compliance with Section 13 of the DPDP Act 2023 and Companies Act
            2013 Rule 26, direct all queries, correction requests, or grievances
            to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[#0B1020]">
                Officer Name:
              </span>
              <span className="text-blue-700 font-medium">
                {STATUTORY_DETAILS.grievanceContact.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-blue-600 shrink-0" />
              <a
                href={`mailto:${STATUTORY_DETAILS.grievanceContact.email}`}
                className="text-blue-600 hover:underline break-all"
              >
                {STATUTORY_DETAILS.grievanceContact.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-blue-600 shrink-0" />
              <span>{STATUTORY_DETAILS.grievanceContact.phone}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span>{STATUTORY_DETAILS.registeredOffice}</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 pt-2">
            Turnaround Commitment: Acknowledgment within 24 hours &bull;
            Grievance Resolution within 30 days.
          </p>
        </section>

        {/* Back Link */}
        <div className="pt-8 text-xs text-slate-600">
          <Link href="/" className="text-blue-600 font-medium hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </article>
  );
}
