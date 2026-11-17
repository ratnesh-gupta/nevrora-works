"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { isWebGLAvailable, prefersReducedMotion } from "./webglDetector";
import { ConstellationFallback } from "./ConstellationFallback";
import dynamic from "next/dynamic";

// Dynamically import VentureConstellation with SSR disabled to prevent server-side WebGL context errors
const VentureConstellation = dynamic(
  () =>
    import("./VentureConstellation").then((mod) => mod.VentureConstellation),
  {
    ssr: false,
    loading: () => <ConstellationFallback />,
  },
);

export function HeroSection() {
  const [canRender3D, setCanRender3D] = useState<boolean | null>(null);

  useEffect(() => {
    const webglSupported = isWebGLAvailable();
    const reducedMotion = prefersReducedMotion();
    setCanRender3D(webglSupported && !reducedMotion);
  }, []);

  return (
    <section className="hero-section relative overflow-hidden bg-[radial-gradient(at_0%_0%,rgba(37,99,235,0.12)_0px,transparent_50%),radial-gradient(at_100%_0%,rgba(124,58,237,0.10)_0px,transparent_50%),radial-gradient(at_50%_100%,rgba(8,145,178,0.08)_0px,transparent_50%),linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] py-20 lg:py-28">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] max-w-full bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3.5 py-1 text-xs font-semibold text-blue-700 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span>Institutional Venture Studio & Engineering Advisory</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B1020] leading-[1.12]">
              Pioneering High-Conviction{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Tech Ventures
              </span>{" "}
              & Intelligent Systems.
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              Nevrora Ventures pairs institutional capital discipline with elite
              engineering execution. We build, incubate, and scale
              transformative platforms that solve deep real-world problems.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:opacity-95 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white/80 px-7 py-3.5 text-base font-medium text-slate-800 backdrop-blur-sm shadow-sm transition-all hover:border-blue-400 hover:text-blue-600"
              >
                Explore Capabilities
              </Link>
            </div>
          </div>

          {/* 3D Interactive Hero Constellation with Automatic Fallback */}
          <div className="lg:col-span-5 constellation-container relative flex items-center justify-center min-w-0 max-w-full overflow-hidden">
            {canRender3D === true ? (
              <VentureConstellation />
            ) : (
              <ConstellationFallback />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
