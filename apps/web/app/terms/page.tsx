import React from "react";
import Link from "next/link";
import { STATUTORY_DETAILS } from "@nevrora/config";
import { FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of the Nevrora Ventures website and platform services.",
};

export default function TermsPage() {
  return (
    <article className="terms relative mx-auto max-w-4xl px-6 py-16 lg:px-8">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200/80 pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700">
          <FileText className="h-3.5 w-3.5" />
          <span>Statutory Terms</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1020]">
          Terms of Use
        </h1>
        <p className="text-sm text-slate-600">
          Effective Date: 30 October 2026 &bull; {STATUTORY_DETAILS.legalName}
        </p>
      </div>

      {/* Body */}
      <div className="my-10 space-y-8 text-sm text-slate-600 leading-relaxed">
        <p className="text-base text-[#0B1020] font-medium">
          These terms govern your access to and use of this website. By
          accessing or browsing the Nevrora Ventures platform, you agree to
          comply with and be bound by these Terms of Use.
        </p>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            1. Lawful Use of Platform
          </h2>
          <p>
            You agree to access and use this website solely for lawful purposes.
            You must not attempt unauthorized access to restricted systems,
            introduce malicious code, execute volumetric scraping attacks, or
            misrepresent your identity or affiliation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            2. Intellectual Property & Governing Law
          </h2>
          <p>
            All materials, codebases, design tokens, trademarks, and
            documentation published on this website are the proprietary property
            of {STATUTORY_DETAILS.legalName} and are protected under Indian and
            international copyright and intellectual property laws.
          </p>
          <p>
            These terms are governed exclusively by the laws of the Republic of
            India. The courts of Bengaluru, Karnataka shall have exclusive
            jurisdiction over any disputes arising from these terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            3. Limitation of Liability
          </h2>
          <p>
            While we take reasonable measures to maintain platform accuracy and
            availability, this website is provided on an &ldquo;as is&rdquo; and
            &ldquo;as available&rdquo; basis without warranties of any kind.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 space-y-2 text-xs shadow-sm">
          <h3 className="font-display text-sm font-semibold text-[#0B1020]">
            Contact & Legal Notices
          </h3>
          <p>
            Legal questions regarding these Terms may be directed to{" "}
            <a
              href={`mailto:${STATUTORY_DETAILS.email}`}
              className="text-blue-600 hover:underline break-all"
            >
              {STATUTORY_DETAILS.email}
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
