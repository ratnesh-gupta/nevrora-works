import React from "react";
import Link from "next/link";
import { HeroSection } from "../components/hero/HeroSection";
import { ProductCard } from "../components/products/ProductCard";
import { getFeaturedProducts } from "../lib/products-data";
import { getPublishedAnnouncements } from "../lib/announcements-data";
import { PRODUCT_CATEGORIES, OFFICIAL_SUPPORT_EMAIL } from "@nevrora/config";
import {
  ArrowRight,
  Smartphone,
  ShoppingBag,
  Layers,
  Cpu,
  ShieldCheck,
  LifeBuoy,
  Sparkles,
  Megaphone,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nevrora Works | Ideas into products.",
  description:
    "Nevrora Works is a product company creating, owning, and operating useful digital products across mobile, web, SaaS, and AI-enabled categories.",
};

const CATEGORY_CARDS = [
  {
    name: PRODUCT_CATEGORIES[0],
    icon: Smartphone,
    description:
      "Calm, offline-reliable mobile companions built for daily utility and personal focus.",
  },
  {
    name: PRODUCT_CATEGORIES[1],
    icon: ShoppingBag,
    description:
      "Transparent digital commerce and lifestyle products connecting craft provenance with everyday living.",
  },
  {
    name: PRODUCT_CATEGORIES[2],
    icon: Layers,
    description:
      "Focused SaaS workspaces that replace fragmented spreadsheets with clear operational workflows.",
  },
  {
    name: PRODUCT_CATEGORIES[3],
    icon: Cpu,
    description:
      "Applied AI and intelligent productivity utilities built with privacy and human control first.",
  },
];

const PRODUCT_PRINCIPLES = [
  {
    title: "Transparent Product Lifecycle",
    description:
      "Every product clearly communicates its lifecycle status — from Coming Soon and Beta through Live availability — with accurate platform links.",
    icon: Sparkles,
  },
  {
    title: "Privacy & Trust by Default",
    description:
      "Each product maintains dedicated DPDP Act 2023 privacy notices, transparent data practices, and clear Terms of Use.",
    icon: ShieldCheck,
  },
  {
    title: "Dedicated Product Support",
    description:
      "Direct product-specific FAQs, help routing, and responsive support via support@nevrora-works.com.",
    icon: LifeBuoy,
  },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const recentAnnouncements = getPublishedAnnouncements().slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Product-Company Hero (P0) */}
      <HeroSection />

      {/* 2. Featured Product Portfolio (P0) */}
      <section
        className="py-20 bg-white border-t border-slate-200/80"
        aria-labelledby="featured-products-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 font-mono">
                Product Portfolio &bull; Coming Soon Previews
              </span>
              <h2
                id="featured-products-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[#0B1020]"
              >
                Featured Digital Products
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Explore the products created and operated by Nevrora Works. Each
                product has a dedicated page with features, platform roadmap,
                support routing, and early-access notifications.
              </p>
            </div>
            <div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
              >
                <span>Browse All Products & Filters</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Categories Discovery (P0) */}
      <section
        className="py-20 bg-slate-50/70 border-t border-slate-200/80"
        aria-labelledby="product-categories-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 font-mono">
              Portfolio Categories
            </span>
            <h2
              id="product-categories-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#0B1020]"
            >
              Built Across Mobile, Web &amp; SaaS
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Filter and discover Nevrora Works products by domain and target
              platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORY_CARDS.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 flex flex-col justify-between hover:border-blue-400/50 hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <div className="space-y-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#0B1020] group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                    <span>Filter Category</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Product Philosophy & Trust Standards */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCT_PRINCIPLES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-8 space-y-4"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0B1020]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Recent Product Announcements (P2) */}
      <section className="py-20 bg-slate-50/60 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
                <Megaphone className="h-3.5 w-3.5 text-blue-600" />
                <span>Product Updates</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1020]">
                Latest Announcements
              </h2>
            </div>
            <Link
              href="/announcements"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
            >
              <span>View All Announcements</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                      {ann.productName}
                    </span>
                    <time
                      dateTime={ann.date}
                      className="font-mono text-slate-500"
                    >
                      {ann.date}
                    </time>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0B1020]">
                    {ann.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ann.summary}
                  </p>
                </div>
                <Link
                  href={`/products/${ann.productSlug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline pt-2"
                >
                  <span>View {ann.productName}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Product Discovery & Support CTA Banner */}
      <section className="py-20 bg-[radial-gradient(at_0%_0%,rgba(37,99,235,0.08)_0px,transparent_50%),linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] border-t border-slate-200/80">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1020]">
            Ready to Explore Our Product Portfolio?
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Browse our Coming Soon product previews, sign up for launch
            notifications, or reach our product support team at{" "}
            <a
              href={`mailto:${OFFICIAL_SUPPORT_EMAIL}`}
              className="text-blue-600 font-medium hover:underline"
            >
              {OFFICIAL_SUPPORT_EMAIL}
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-blue-500/20 hover:opacity-95 transition-all"
            >
              <span>Explore Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-[#0B1020] hover:border-blue-500 hover:text-blue-600 transition-all"
            >
              <span>Support Directory</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
