import React from "react";
import Link from "next/link";
import { getPublishedProducts } from "../../lib/products-data";
import {
  LIFECYCLE_STATUS_CONFIG,
  OFFICIAL_SUPPORT_EMAIL,
  STATUTORY_DETAILS,
} from "@nevrora/config";
import {
  LifeBuoy,
  Mail,
  HelpCircle,
  FileText,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Support Directory",
  description:
    "Official support directory, product FAQs, and help contacts for all Nevrora Works digital products.",
};

export default function SupportDirectoryPage() {
  const products = getPublishedProducts();

  return (
    <div className="support-directory min-h-screen py-16 md:py-24 bg-canvas">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3.5 py-1 text-xs font-semibold text-blue-700">
            <LifeBuoy className="h-3.5 w-3.5" />
            <span>Nevrora Works &bull; Support Routing Hub</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1020]">
            Product Support Directory
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Select your Nevrora Works product below to find product-specific
            FAQs, release status notices, privacy disclosures, and direct
            support channels.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
            <a
              href={`mailto:${OFFICIAL_SUPPORT_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-2 text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{OFFICIAL_SUPPORT_EMAIL}</span>
            </a>
            <Link
              href="/contact?type=Product+support+%26+feedback"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[#0B1020] hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              <span>Submit Support Request</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Quick Jump Links */}
        <nav
          aria-label="Jump to product support section"
          className="flex flex-wrap gap-3"
        >
          {products.map((product) => (
            <a
              key={product.slug}
              href={`#${product.slug}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-[#0B1020] hover:border-blue-500 hover:text-blue-600 shadow-sm transition-all"
            >
              {product.name} Support &darr;
            </a>
          ))}
        </nav>

        {/* Per-Product Support Cards (NW-FR-06) */}
        <div className="space-y-10">
          {products.map((product) => {
            const rule = LIFECYCLE_STATUS_CONFIG[product.lifecycle_status];
            const publishedFaqs = product.faqs.filter(
              (f) => f.status === "published",
            );

            return (
              <section
                key={product.slug}
                id={product.slug}
                aria-labelledby={`support-heading-${product.slug}`}
                className="scroll-mt-28 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-sm space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        className={`rounded-full border px-3 py-0.5 text-xs font-bold ${rule.badgeStyle}`}
                      >
                        {rule.label}
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-500 uppercase">
                        {product.category}
                      </span>
                    </div>
                    <h2
                      id={`support-heading-${product.slug}`}
                      className="font-display text-2xl sm:text-3xl font-bold text-[#0B1020]"
                    >
                      {product.name}
                    </h2>
                    <p className="text-sm text-slate-600">
                      {product.support.responseInfo}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <a
                      href={`mailto:${product.support.supportEmail}?subject=${encodeURIComponent(
                        `[${product.name} Support] Help Request`,
                      )}`}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:opacity-95 transition-all"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Email {product.support.supportEmail}</span>
                    </a>
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-[#0B1020] hover:border-blue-400 hover:text-blue-600 transition-colors"
                    >
                      <span>Product Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Product FAQs */}
                {publishedFaqs.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                      <span>Frequently Asked Questions</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {publishedFaqs.map((faq) => (
                        <div
                          key={faq.id}
                          className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-5 space-y-2"
                        >
                          <h3 className="font-display text-sm font-bold text-[#0B1020]">
                            {faq.question}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Legal & Policy Links for this Product */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-blue-600" />
                    <span>
                      Legal Policies for <strong>{product.name}</strong>:
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 font-semibold">
                    <Link
                      href={product.legal.privacyUrl}
                      className="text-blue-600 hover:underline"
                    >
                      Privacy Policy &rarr;
                    </Link>
                    <Link
                      href={product.legal.termsUrl}
                      className="text-blue-600 hover:underline"
                    >
                      Terms of Use &rarr;
                    </Link>
                    <Link
                      href={`/contact?type=Product+early+access+%2F+Notify+me&product=${product.slug}`}
                      className="text-blue-600 hover:underline"
                    >
                      Notify Me on Launch &rarr;
                    </Link>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Grievance & Data Protection Escalation */}
        <section className="rounded-2xl border border-blue-200/80 bg-blue-50/40 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Statutory Grievance &amp; Privacy Redressal</span>
            </div>
            <h2 className="font-display text-xl font-bold text-[#0B1020]">
              Data Principal &amp; Regulatory Grievance Officer
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              For privacy rights requests under the DPDP Act 2023 or formal
              grievances across any Nevrora Works product, contact{" "}
              <strong>{STATUTORY_DETAILS.grievanceContact.name}</strong> at{" "}
              <a
                href={`mailto:${STATUTORY_DETAILS.grievanceContact.email}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                {STATUTORY_DETAILS.grievanceContact.email}
              </a>
              .
            </p>
          </div>
          <Link
            href="/privacy-policy"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-blue-300 bg-white px-5 py-2.5 text-xs font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
          >
            <span>View Privacy Policy</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </div>
    </div>
  );
}
