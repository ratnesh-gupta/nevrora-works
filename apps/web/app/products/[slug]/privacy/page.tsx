import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCT_PRIVACY_NOTICES } from "@/lib/legal-data";
import { getProductBySlug } from "@/lib/products-data";
import { STATUTORY_DETAILS } from "@nevrora/config";
import type { PrivacyClause } from "@nevrora/types";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface ProductPrivacyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPrivacyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const notice = PRODUCT_PRIVACY_NOTICES[slug];

  return {
    title: notice ? `${notice.title} | DPDP Act 2023` : "Privacy Notice",
    description: `Product-specific privacy notice for ${slug} under the Digital Personal Data Protection Act, 2023.`,
  };
}

export default async function ProductPrivacyPage({
  params,
}: ProductPrivacyPageProps) {
  const { slug } = await params;

  // STRICT: Verify product is published. If unpublished (e.g. driveiq), return 404!
  const product = getProductBySlug(slug);
  const notice = PRODUCT_PRIVACY_NOTICES[slug];

  if (!product || !notice) {
    notFound();
  }

  return (
    <article className="privacy-document relative mx-auto max-w-4xl px-6 py-16 lg:px-8">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200/80 pb-8">
        <div className="flex items-center gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to {product.title}</span>
          </Link>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Product Privacy Notice</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1020]">
          {notice.title}
        </h1>

        <p className="text-sm text-slate-600">
          Conforming to the Digital Personal Data Protection Act, 2023 (DPDP Act
          2023) &bull; Last updated: {notice.lastUpdated}
        </p>
      </div>

      {/* Main Content */}
      <div className="my-10 space-y-8 text-sm text-slate-600 leading-relaxed">
        {/* Clauses */}
        {notice.clauses.map((clause: PrivacyClause, idx: number) => (
          <section key={clause.heading} className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="text-blue-600 font-mono text-sm">
                0{idx + 1}.
              </span>
              <span>{clause.heading}</span>
            </h2>
            {clause.body.map((p: string, pIdx: number) => (
              <p key={pIdx}>{p}</p>
            ))}
          </section>
        ))}

        {/* Data Principal Rights */}
        <section className="rounded-2xl border border-blue-200/80 bg-blue-50/40 p-6 md:p-8 space-y-3">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            Data Principal Rights & Redressal
          </h2>
          <p>
            Users may exercise statutory rights of access, correction, and
            erasure directly through our Grievance Officer:
          </p>
          <ul className="space-y-2 pl-2">
            {notice.rights.map((r: string) => (
              <li key={r} className="flex items-start gap-2 text-[#0B1020]">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Grievance Officer Details */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 text-xs space-y-3 shadow-sm">
          <h3 className="font-display text-base font-semibold text-[#0B1020]">
            Grievance Officer Contact
          </h3>
          <p className="text-[#0B1020] break-words">
            Grievance Officer:{" "}
            <strong>{STATUTORY_DETAILS.grievanceContact.name}</strong> (
            <span className="break-all">
              {STATUTORY_DETAILS.grievanceContact.email}
            </span>
            )
          </p>
          <p>
            Official Turnaround: Acknowledgment within 24 hours &bull; Final
            resolution within 30 days.
          </p>
        </section>

        {/* Bidirectional Navigation Links */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <Link
            href={`/products/${product.slug}`}
            className="text-blue-600 hover:underline font-semibold"
          >
            &larr; Back to {product.title}
          </Link>
          <Link
            href="/privacy-policy"
            className="text-blue-600 hover:underline font-medium"
          >
            View Site-wide Privacy Policy &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
