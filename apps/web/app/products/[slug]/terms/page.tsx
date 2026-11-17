import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCT_TERMS_NOTICES } from "@/lib/legal-data";
import { getProductBySlug } from "@/lib/products-data";
import { STATUTORY_DETAILS } from "@nevrora/config";
import type { PrivacyClause } from "@nevrora/types";
import { FileText, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface ProductTermsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductTermsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const notice = PRODUCT_TERMS_NOTICES[slug];

  return {
    title: notice ? `${notice.title}` : "Product Terms of Use",
    description: `Product-specific Terms of Use for ${slug} under Nevrora Works.`,
  };
}

export default async function ProductTermsPage({
  params,
}: ProductTermsPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const notice = PRODUCT_TERMS_NOTICES[slug];

  if (!product || !notice) {
    notFound();
  }

  return (
    <article className="terms-document relative mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <div className="space-y-4 border-b border-slate-200/80 pb-8">
        <div className="flex items-center gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to {product.name}</span>
          </Link>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700">
          <FileText className="h-3.5 w-3.5" />
          <span>Product Terms of Use &bull; v{product.legal.version}</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1020]">
          {notice.title}
        </h1>

        <p className="text-sm text-slate-600">
          Operated by {STATUTORY_DETAILS.legalName} (Nevrora Works) &bull;
          Effective: {notice.lastUpdated}
        </p>
      </div>

      <div className="my-10 space-y-8 text-sm text-slate-600 leading-relaxed">
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

        <div className="pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <Link
            href={`/products/${product.slug}`}
            className="text-blue-600 hover:underline font-semibold"
          >
            &larr; Back to {product.name}
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={product.legal.privacyUrl}
              className="text-blue-600 hover:underline font-medium"
            >
              Product Privacy Notice &rarr;
            </Link>
            <Link
              href="/terms"
              className="text-blue-600 hover:underline font-medium"
            >
              Company Terms of Use &rarr;
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
