import React from "react";
import Link from "next/link";
import { STATUTORY_DETAILS } from "@nevrora/config";
import { FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of the Nevrora Works website and digital product portfolio.",
};

export default function TermsPage() {
  return (
    <article className="terms relative mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <div className="space-y-4 border-b border-slate-200/80 pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700">
          <FileText className="h-3.5 w-3.5" />
          <span>Statutory Terms &bull; Nevrora Works</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1020]">
          Terms of Use
        </h1>
        <p className="text-sm text-slate-600">
          Effective Date: 16 November 2026 &bull; {STATUTORY_DETAILS.legalName}{" "}
          (Nevrora Works)
        </p>
      </div>

      <div className="my-10 space-y-8 text-sm text-slate-600 leading-relaxed">
        <p className="text-base text-[#0B1020] font-medium">
          These Terms of Use govern your access to and use of the Nevrora Works
          website and product portfolio directory. Individual digital products
          may also include product-specific terms linked on their respective
          product pages.
        </p>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            1. Lawful Use of Website &amp; Product Directory
          </h2>
          <p>
            You agree to access and use this website solely for lawful product
            discovery, support, and communication purposes. You must not attempt
            unauthorized access, introduce malicious code, or misrepresent your
            identity.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            2. Product Lifecycle States &amp; Previews
          </h2>
          <p>
            Products listed with a &ldquo;Coming Soon&rdquo; or
            &ldquo;Beta&rdquo; lifecycle status represent approved previews or
            limited releases. Features, platform requirements, and release
            timelines may evolve prior to general availability.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            3. Intellectual Property &amp; Governing Law
          </h2>
          <p>
            All product names, icons, interfaces, and documentation published on
            Nevrora Works are the proprietary property of{" "}
            {STATUTORY_DETAILS.legalName} and are protected under Indian and
            international copyright and trademark laws. These terms are governed
            by the laws of the Republic of India, with exclusive jurisdiction in
            Bengaluru, Karnataka.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 space-y-3 text-xs shadow-sm">
          <h3 className="font-display text-sm font-semibold text-[#0B1020]">
            Product-Specific Terms &amp; Support
          </h3>
          <div className="flex flex-wrap gap-4 font-semibold">
            <Link
              href="/products/sadhana-daily/terms"
              className="text-blue-600 hover:underline"
            >
              Sadhana Daily Terms &rarr;
            </Link>
            <Link
              href="/products/neermiti-collections/terms"
              className="text-blue-600 hover:underline"
            >
              Neermiti Collections Terms &rarr;
            </Link>
            <Link
              href="/products/driveiq/terms"
              className="text-blue-600 hover:underline"
            >
              DriveIQ Terms &rarr;
            </Link>
          </div>
          <p className="pt-2">
            Legal and support questions may be directed to{" "}
            <a
              href={`mailto:${STATUTORY_DETAILS.supportEmail}`}
              className="text-blue-600 hover:underline break-all"
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
