import React from "react";
import Link from "next/link";
import { ContactForm } from "../../components/contact/ContactForm";
import { STATUTORY_DETAILS, OFFICIAL_SUPPORT_EMAIL } from "@nevrora/config";
import { Mail, Phone, MapPin, Shield, LifeBuoy, Bell } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Nevrora Works",
  description:
    "Product early-access notifications, product support, and partnership enquiries for Nevrora Works.",
};

interface ContactPageProps {
  searchParams?: Promise<{
    type?: string;
    product?: string;
    category?: string;
  }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const initialType = resolvedSearchParams?.type || "";
  const initialProduct =
    resolvedSearchParams?.product || resolvedSearchParams?.category || "";

  return (
    <div className="contact-container min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Support Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700">
                <span>Nevrora Works &bull; Product &amp; Partnership Enquiries</span>
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1020]">
                Contact Nevrora Works
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Register for Coming Soon product release notifications, request
                product support, or discuss distribution and ecosystem
                partnerships.
              </p>
            </div>

            {initialProduct && (
              <div className="rounded-xl border border-blue-200/80 bg-blue-50/60 p-4 text-xs text-[#0B1020] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-blue-700 uppercase tracking-wider">
                  <Bell className="h-3.5 w-3.5" />
                  <span>Selected Product Context</span>
                </div>
                <p className="text-slate-600">
                  Product:{" "}
                  <code className="text-blue-700 font-mono font-bold">
                    {initialProduct}
                  </code>
                </p>
              </div>
            )}

            {/* Official Contact Strip */}
            <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 text-sm shadow-sm">
              <h2 className="font-display text-base font-semibold text-[#0B1020]">
                Direct Product Support &amp; Enquiries
              </h2>
              <div className="space-y-3 text-slate-600">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-blue-600 shrink-0" />
                  <a
                    href={`mailto:${OFFICIAL_SUPPORT_EMAIL}`}
                    className="text-[#0B1020] font-medium hover:text-blue-600 transition-colors break-all"
                  >
                    {OFFICIAL_SUPPORT_EMAIL}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>{STATUTORY_DETAILS.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{STATUTORY_DETAILS.registeredOffice}</span>
                </div>
              </div>
            </div>

            {/* Support Directory Callout */}
            <div className="rounded-2xl border border-blue-500/15 bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/35 p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                <LifeBuoy className="h-4 w-4 text-blue-600" />
                <span>Looking for Product FAQs?</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Check our Product Support Directory for immediate answers on
                Sadhana Daily, Neermiti Collections, and DriveIQ.
              </p>
              <Link
                href="/support"
                className="inline-block text-xs font-semibold text-blue-600 hover:underline"
              >
                Visit Product Support Directory &rarr;
              </Link>
            </div>

            {/* Privacy Assurance */}
            <div className="flex items-start gap-3 text-xs text-slate-600 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4">
              <Shield className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <p>
                In compliance with the DPDP Act 2023, your contact details are
                used strictly to respond to your product notification or support
                request.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm
              initialType={initialType}
              initialCategory={initialProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
