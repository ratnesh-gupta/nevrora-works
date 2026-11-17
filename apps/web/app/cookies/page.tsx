"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, CheckCircle2, XCircle } from "lucide-react";

export default function CookiesPage() {
  const [consentStatus, setConsentStatus] = useState<
    "accepted" | "declined" | "pending"
  >("pending");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nevrora-consent");
      if (stored === "accepted" || stored === "declined") {
        setConsentStatus(stored);
      }
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nevrora-consent", "accepted");
      setConsentStatus("accepted");
      setFeedback(
        "Analytics cookies accepted. Thank you for helping us improve.",
      );
    }
  };

  const handleDecline = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nevrora-consent", "declined");
      setConsentStatus("declined");
      setFeedback(
        "Analytics cookies declined. Only essential storage remains active.",
      );
      // Clear any existing GA cookies
      document.cookie.split(";").forEach((c) => {
        const parts = c.split("=");
        const name = parts[0]?.trim();
        if (name && name.startsWith("_ga")) {
          document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        }
      });
    }
  };

  return (
    <article className="cookie-policy relative mx-auto max-w-4xl px-6 py-16 lg:px-8">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200/80 pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700">
          <Cookie className="h-3.5 w-3.5" />
          <span>Cookie Notice & Preferences</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1020]">
          Cookie Policy & Preferences
        </h1>
        <p className="text-sm text-slate-600">
          Last updated: 30 October 2026 &bull; DPDP Act 2023 Compliant Consent
          Model
        </p>
      </div>

      {/* Interactive Controls Box */}
      <div className="my-10 rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 p-8 space-y-6 shadow-sm">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-[#0B1020]">
            Manage Cookie Preferences
          </h2>
          <p className="text-sm text-slate-600">
            Current status:{" "}
            <span className="font-semibold text-blue-600 capitalize">
              {consentStatus}
            </span>
          </p>
        </div>

        {feedback && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-xs text-blue-800 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
            <span>{feedback}</span>
          </div>
        )}

        <div className="cookie-controls flex flex-wrap gap-4 pt-2">
          <button
            id="accept-cookies"
            onClick={handleAccept}
            className="cta-btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:opacity-95 transition-all"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Accept Analytics Cookies</span>
          </button>
          <button
            id="decline-cookies"
            onClick={handleDecline}
            className="cta-btn inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-[#0B1020] hover:border-blue-600 hover:text-blue-600 transition-all"
          >
            <XCircle className="h-4 w-4" />
            <span>Decline Analytics Cookies</span>
          </button>
        </div>
      </div>

      {/* Explanatory Body */}
      <div className="my-10 space-y-8 text-sm text-slate-600 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            What are Cookies & Local Storage?
          </h2>
          <p>
            Cookies are small data files stored in your web browser. Similar
            client-side technologies, such as browser local storage, function
            similarly. We use the term &ldquo;cookies&rdquo; to encompass both.
          </p>
        </section>

        {/* Cookie Table */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            Cookies and Storage in Use
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <table className="w-full text-left text-xs text-[#0B1020]">
              <thead className="bg-slate-50 border-b border-slate-200 text-blue-700 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Classification</th>
                  <th className="p-4">Purpose</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Set By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-4 font-mono font-medium text-[#0B1020]">
                    nevrora-consent
                  </td>
                  <td className="p-4">Strictly Necessary</td>
                  <td className="p-4">Remembers your cookie consent choice.</td>
                  <td className="p-4">12 Months</td>
                  <td className="p-4">Nevrora Ventures</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-medium text-[#0B1020]">
                    _ga
                  </td>
                  <td className="p-4">Analytics (Optional)</td>
                  <td className="p-4">
                    Distinguishes unique visitors for site metrics (requires
                    consent).
                  </td>
                  <td className="p-4">2 Years</td>
                  <td className="p-4">Google</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-medium text-[#0B1020]">
                    _ga_*
                  </td>
                  <td className="p-4">Analytics (Optional)</td>
                  <td className="p-4">
                    Maintains session state for Google Analytics 4 (requires
                    consent).
                  </td>
                  <td className="p-4">2 Years</td>
                  <td className="p-4">Google</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#0B1020]">
            Unconditional Isolation
          </h2>
          <p>
            We adhere strictly to unconsented analytics isolation. No Google
            Analytics 4 tracking scripts are loaded or executed prior to
            affirmative consent from the user.
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
