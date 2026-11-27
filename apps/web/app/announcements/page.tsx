import React from "react";
import Link from "next/link";
import { getPublishedAnnouncements } from "../../lib/announcements-data";
import { Megaphone, ArrowRight, Calendar } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Announcements",
  description:
    "Official product previews, release updates, and portfolio news from Nevrora Works.",
};

export default function AnnouncementsPage() {
  const announcements = getPublishedAnnouncements();

  return (
    <div className="announcements-page min-h-screen py-16 md:py-24 bg-canvas">
      <div className="mx-auto max-w-5xl px-6 lg:px-8 space-y-14">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3.5 py-1 text-xs font-semibold text-blue-700">
            <Megaphone className="h-3.5 w-3.5" />
            <span>Nevrora Works &bull; Portfolio Updates</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1020]">
            Product Announcements
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Follow verified product previews, milestone updates, and release
            notices across the Nevrora Works portfolio.
          </p>
        </div>

        <div className="space-y-8">
          {announcements.map((ann) => (
            <article
              key={ann.id}
              className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-sm space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 font-semibold text-blue-700">
                  {ann.productName}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-slate-500">
                  <Calendar className="h-3.5 w-3.5 text-blue-600" />
                  <time dateTime={ann.date}>{ann.date}</time>
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold text-[#0B1020]">
                {ann.title}
              </h2>

              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                {ann.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href={`/products/${ann.productSlug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
                >
                  <span>View {ann.productName} Product Page</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={`/contact?type=Product+early+access+%2F+Notify+me&product=${ann.productSlug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  <span>Notify Me</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
