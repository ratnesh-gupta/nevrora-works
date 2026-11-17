import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 mb-6">
        <Compass className="h-8 w-8 animate-spin-slow" />
      </div>

      <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
        Error 404
      </span>

      <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1020] mb-4">
        Page Not Found
      </h1>

      <p className="max-w-md text-sm text-slate-600 leading-relaxed mb-8">
        The route you requested does not exist, has been permanently removed, or
        is strictly restricted under security governance.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:opacity-95 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-[#0B1020] hover:border-blue-600 hover:text-blue-600 transition-all"
        >
          <span>Contact Support</span>
        </Link>
      </div>
    </div>
  );
}
