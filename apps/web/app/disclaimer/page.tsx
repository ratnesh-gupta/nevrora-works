import React from "react";
import Link from "next/link";
import { STATUTORY_DETAILS } from "@nevrora/config";
import { AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Regulatory Disclosures",
  description:
    "Corporate, investment, and operational disclaimers for Nevrora Ventures.",
};

export default function DisclaimerPage() {
  return (
    <article className="disclaimer relative mx-auto max-w-4xl px-6 py-16 lg:px-8">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200/80 pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>Regulatory Notice</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1020]">
          Corporate & Regulatory Disclaimer
        </h1>
        <p className="text-sm text-slate-600">
          Last updated: 30 October 2026 &bull; {STATUTORY_DETAILS.legalName}
        </p>
      </div>

      {/* Body */}
      <div className="my-10 space-y-8 text-sm text-slate-600 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            1. No Offer of Securities or Investment Advice
          </h2>
          <p>
            The information contained on this website is provided solely for
            informational and institutional exploratory purposes. It does not
            constitute an offer, solicitation, or recommendation to purchase or
            sell any securities, shares, or financial instruments under the
            Securities and Exchange Board of India (SEBI) regulations or any
            other jurisdiction.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            2. Forward-Looking Statements
          </h2>
          <p>
            Statements on this platform that are not historical facts, including
            projections of venture milestones, technological capabilities, and
            strategic trajectories, constitute forward-looking statements. Such
            statements are subject to business risks, technological changes, and
            regulatory conditions that could cause actual outcomes to differ
            materially.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            3. Third-Party Links & References
          </h2>
          <p>
            This website may contain links to external third-party resources or
            partner documentation. Nevrora Technologies Private Limited assumes
            no responsibility for the content, privacy policies, or practices of
            third-party platforms.
          </p>
        </section>

        <div className="pt-6 border-t border-slate-200/80 text-xs text-slate-600">
          <Link href="/" className="text-blue-600 font-medium hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </article>
  );
}
