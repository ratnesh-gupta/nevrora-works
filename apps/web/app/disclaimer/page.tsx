import React from "react";
import Link from "next/link";
import { STATUTORY_DETAILS } from "@nevrora/config";
import { AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Regulatory Disclosures",
  description:
    "Product portfolio and regulatory disclaimers for Nevrora Works.",
};

export default function DisclaimerPage() {
  return (
    <article className="disclaimer relative mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <div className="space-y-4 border-b border-slate-200/80 pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>Regulatory Notice &bull; Nevrora Works</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1020]">
          Product Portfolio &amp; Regulatory Disclaimer
        </h1>
        <p className="text-sm text-slate-600">
          Last updated: 16 November 2026 &bull; {STATUTORY_DETAILS.legalName}
        </p>
      </div>

      <div className="my-10 space-y-8 text-sm text-slate-600 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            1. Product Previews &amp; Lifecycle Statuses
          </h2>
          <p>
            Nevrora Works publishes product information according to each
            product&apos;s current lifecycle state (Coming Soon, Beta, Live,
            Maintenance, or Discontinued). Coming Soon previews describe
            intended product capabilities and do not constitute a binding
            release date guarantee.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            2. Third-Party App Stores &amp; Platforms
          </h2>
          <p>
            Google Play and Android are trademarks of Google LLC. External store
            and platform links are provided only when verified for public
            access.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            3. Official Support Contact
          </h2>
          <p>
            For official support across any Nevrora Works product, contact{" "}
            <a
              href={`mailto:${STATUTORY_DETAILS.supportEmail}`}
              className="text-blue-600 hover:underline"
            >
              {STATUTORY_DETAILS.supportEmail}
            </a>
            .
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
