import React from "react";
import Link from "next/link";
import { getPublishedProducts } from "../../lib/products-data";
import { ProductsDirectoryClient } from "../../components/products/ProductsDirectoryClient";
import { OFFICIAL_SUPPORT_EMAIL } from "@nevrora/config";
import { Compass, LifeBuoy, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products Directory",
  description:
    "Explore the Nevrora Works digital product portfolio across mobile, web, SaaS, and AI-enabled categories.",
};

interface ProductsPageProps {
  searchParams?: Promise<{
    category?: string;
    platform?: string;
    status?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const products = getPublishedProducts();
  const resolvedParams = searchParams ? await searchParams : {};

  return (
    <div className="products-index min-h-screen py-16 md:py-24 bg-canvas">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3.5 py-1 text-xs font-semibold text-blue-700">
            <Compass className="h-3.5 w-3.5" />
            <span>Nevrora Works &bull; Product Portfolio Directory</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1020]">
            Products Directory
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Discover digital products created and operated by Nevrora Works.
            Filter by category, supported platform, or lifecycle status to
            explore features, availability, and early-access notifications.
          </p>
        </div>

        {/* Interactive Directory & Filters (NW-FR-01, NW-FR-12) */}
        <ProductsDirectoryClient
          products={products}
          initialCategory={resolvedParams.category || "all"}
          initialPlatform={resolvedParams.platform || "all"}
          initialStatus={resolvedParams.status || "all"}
        />

        {/* Product Support & Early Access Banner */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-elevated flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-blue-700">
              <LifeBuoy className="h-3.5 w-3.5 text-blue-600" />
              <span>Dedicated Product Support</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-[#0B1020]">
              Looking for Product Help or Release Updates?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Visit our Support Directory for product-specific FAQs and help
              links, or contact our team directly at{" "}
              <a
                href={`mailto:${OFFICIAL_SUPPORT_EMAIL}`}
                className="text-blue-600 font-medium hover:underline"
              >
                {OFFICIAL_SUPPORT_EMAIL}
              </a>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/support"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-xs font-semibold text-white shadow-sm hover:opacity-95 transition-all"
            >
              <span>Open Support Directory</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
