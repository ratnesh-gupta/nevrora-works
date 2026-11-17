"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("nevrora-consent");
      if (!consent) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nevrora-consent", "accepted");
      setShowBanner(false);
    }
  };

  const handleDecline = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nevrora-consent", "declined");
      setShowBanner(false);
    }
  };

  if (!showBanner) return null;

  return (
    <aside
      className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6"
      aria-label="Cookie consent banner"
    >
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-200/60">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display text-base font-bold text-[#0B1020]">
              Cookie & Data Privacy Notice
            </h4>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              We use strictly necessary storage to operate this website. We use
              optional analytics cookies only if you consent. You may update
              your choice at any time on our{" "}
              <Link
                href="/cookies"
                className="text-blue-600 font-medium underline hover:text-blue-800"
              >
                Cookie Policy
              </Link>{" "}
              page.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={handleDecline}
            className="flex-1 md:flex-none rounded-full border border-slate-300 bg-slate-50 px-5 py-2.5 text-xs font-medium text-[#0B1020] hover:border-blue-600 hover:text-blue-600 transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 md:flex-none rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:opacity-95 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  );
}
