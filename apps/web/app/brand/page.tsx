import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Download,
  Layers,
  TrendingUp,
  Infinity as InfinityIcon,
  Globe,
  Smartphone,
  Monitor,
  CheckCircle2,
  FileCode2,
} from "lucide-react";
import { NevroraIcon, NevroraLogo } from "../../components/brand/NevroraLogo";

export const metadata: Metadata = {
  title: "Brand Identity & Asset Kit",
  description:
    "Nevrora Ventures official Brand Board, Logo System, SVG/PNG downloads, Favicons, and Android Adaptive Icons.",
};

const LOGO_VARIATIONS = [
  {
    id: "primary-dark",
    label: "Primary (Dark)",
    theme: "dark" as const,
    bgClass: "bg-[#0B1020] border-[#7C3AED]/40",
    badgeClass: "bg-[#7C3AED] text-white",
    svgHref: "/brand/logo-primary-dark.svg",
    pngHref: "/brand/png/logo-primary-dark.png",
  },
  {
    id: "primary-light",
    label: "Primary (Light)",
    theme: "light" as const,
    bgClass: "bg-white border-slate-200",
    badgeClass: "bg-slate-100 text-[#0B1020]",
    svgHref: "/brand/logo-primary-light.svg",
    pngHref: "/brand/png/logo-primary-light.png",
  },
  {
    id: "monochrome-dark",
    label: "Monochrome (Dark)",
    theme: "mono-dark" as const,
    bgClass: "bg-[#0B1020] border-white/20",
    badgeClass: "bg-white/10 text-white",
    svgHref: "/brand/logo-monochrome-dark.svg",
    pngHref: "/brand/png/logo-monochrome-dark.png",
  },
  {
    id: "monochrome-light",
    label: "Monochrome (Light)",
    theme: "mono-light" as const,
    bgClass: "bg-white border-slate-200",
    badgeClass: "bg-slate-100 text-[#0B1020]",
    svgHref: "/brand/logo-monochrome-light.svg",
    pngHref: "/brand/png/logo-monochrome-light.png",
  },
];

const APP_SQUIRCLES = [
  {
    label: "App Icon (Dark)",
    variant: "dark" as const,
    svgHref: "/brand/icon-dark.svg",
    pngHref: "/brand/png/app-icon-dark-1024.png",
  },
  {
    label: "App Icon (Light)",
    variant: "light" as const,
    svgHref: "/brand/icon-light.svg",
    pngHref: "/brand/png/app-icon-light-1024.png",
  },
  {
    label: "App Icon (Gradient)",
    variant: "gradient" as const,
    svgHref: "/brand/icon-gradient.svg",
    pngHref: "/brand/png/app-icon-gradient-1024.png",
  },
  {
    label: "App Icon (Mono)",
    variant: "mono" as const,
    svgHref: "/brand/icon-mono.svg",
    pngHref: "/brand/png/app-icon-mono-1024.png",
  },
];

const BRAND_PALETTE = [
  {
    name: "Midnight",
    hex: "#0B1020",
    role: "Primary Dark Canvas",
    textDark: false,
  },
  { name: "Blue", hex: "#3B82F6", role: "Tech & Velocity", textDark: false },
  {
    name: "Violet",
    hex: "#7C3AED",
    role: "Core Brand Gradient",
    textDark: false,
  },
  {
    name: "Magenta",
    hex: "#D946EF",
    role: "Energy & Innovation",
    textDark: false,
  },
  {
    name: "Cyan",
    hex: "#06D6D6",
    role: "Descriptor & Accents",
    textDark: true,
  },
];

const ANDROID_DENSITIES = [
  {
    folder: "mipmap-mdpi",
    scale: "1x",
    launcherSize: "48×48",
    fgSize: "108×108",
  },
  {
    folder: "mipmap-hdpi",
    scale: "1.5x",
    launcherSize: "72×72",
    fgSize: "162×162",
  },
  {
    folder: "mipmap-xhdpi",
    scale: "2x",
    launcherSize: "96×96",
    fgSize: "216×216",
  },
  {
    folder: "mipmap-xxhdpi",
    scale: "3x",
    launcherSize: "144×144",
    fgSize: "324×324",
  },
  {
    folder: "mipmap-xxxhdpi",
    scale: "4x",
    launcherSize: "192×192",
    fgSize: "432×432",
  },
];

const WEB_FAVICONS = [
  {
    label: "favicon.ico (16/32/48 multi-res)",
    href: "/favicon.ico",
    size: "ICO",
  },
  { label: "favicon.svg (Vector)", href: "/favicon.svg", size: "SVG" },
  { label: "favicon-16x16.png", href: "/favicon-16x16.png", size: "16×16" },
  { label: "favicon-32x32.png", href: "/favicon-32x32.png", size: "32×32" },
  {
    label: "apple-touch-icon.png",
    href: "/apple-touch-icon.png",
    size: "180×180",
  },
  {
    label: "og-image.png (Social Card)",
    href: "/og-image.png",
    size: "1200×630",
  },
  {
    label: "site.webmanifest",
    href: "/site.webmanifest",
    size: "JSON",
  },
];

export default function BrandReviewPage() {
  return (
    <div className="min-h-screen bg-[#050814] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Top Review Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-[#3B82F6]/30 bg-[#0B1020] px-6 py-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#06D6D6]">
              <CheckCircle2 className="h-4 w-4" />
              <span>Brand Board Version — Live Review</span>
            </div>
            <h1 className="mt-1 font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Nevrora Ventures — Brand Identity & Asset Kit
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              Preview the updated website navigation, favicons, high-res PNGs,
              scalable SVGs, and complete Android app icon suite before
              committing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              View Live Homepage
            </Link>
            <a
              href="/brand/png/logo-primary-dark.png"
              download="nevrora-logo-primary-dark.png"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:opacity-95 transition-opacity"
            >
              <Download className="h-4 w-4" />
              <span>Download Primary PNG</span>
            </a>
          </div>
        </div>

        {/* Brand Board Section 1: Hero Showcase & Logo Variations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Hero Showcase Card */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-[#7C3AED]/30 bg-[#0B1020] p-10 flex flex-col items-center justify-center min-h-[340px] shadow-2xl">
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#D946EF]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#06D6D6]/15 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <NevroraLogo variant="stacked" theme="dark" size="xl" />
              <div className="mt-6 h-px w-48 bg-gradient-to-r from-transparent via-[#7C3AED]/70 to-transparent" />
              <p className="mt-4 font-['Space_Grotesk',sans-serif] text-sm text-slate-200 tracking-wide">
                A Global Technology Holding Company
              </p>
            </div>
          </div>

          {/* Right Panel: Logo Variations & Lockup Options */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0B1020] p-6 sm:p-8 space-y-8">
            {/* Variations */}
            <div>
              <h2 className="font-['Space_Grotesk',sans-serif] text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
                Logo Variations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {LOGO_VARIATIONS.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center space-y-2.5"
                  >
                    <div
                      className={`w-full aspect-[4/3] rounded-xl border ${item.bgClass} flex items-center justify-center p-4 shadow-md`}
                    >
                      <NevroraLogo
                        variant="stacked"
                        theme={item.theme}
                        size="sm"
                      />
                    </div>
                    <span
                      className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-medium ${item.badgeClass}`}
                    >
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2 text-[11px]">
                      <a
                        href={item.svgHref}
                        download
                        className="text-[#06D6D6] hover:underline"
                      >
                        SVG
                      </a>
                      <span className="text-slate-600">•</span>
                      <a
                        href={item.pngHref}
                        download
                        className="text-[#3B82F6] hover:underline"
                      >
                        PNG
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lockup Options */}
            <div className="pt-6 border-t border-white/10">
              <h2 className="font-['Space_Grotesk',sans-serif] text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
                Lockup Options
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="flex flex-col items-center space-y-3 rounded-xl border border-white/10 bg-[#070B16] p-5">
                  <NevroraLogo variant="horizontal" theme="dark" size="sm" />
                  <span className="text-xs text-slate-400">
                    Horizontal Lockup
                  </span>
                </div>
                <div className="flex flex-col items-center space-y-3 rounded-xl border border-white/10 bg-[#070B16] p-5">
                  <NevroraLogo variant="stacked" theme="dark" size="sm" />
                  <span className="text-xs text-slate-400">Stacked Lockup</span>
                </div>
                <div className="flex flex-col items-center space-y-3 rounded-xl border border-white/10 bg-[#070B16] p-5">
                  <NevroraIcon withSquircle squircleVariant="dark" size={56} />
                  <span className="text-xs text-slate-400">Icon Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Board Section 2: Concept, App Icons, Clear Space, Palette, Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Brand Concept */}
          <div className="lg:col-span-4 rounded-2xl border border-[#7C3AED]/40 bg-[#0B1020] p-6 sm:p-7 space-y-5">
            <div>
              <h2 className="font-['Space_Grotesk',sans-serif] text-lg font-bold text-white">
                Brand Concept
              </h2>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                A dynamic and modern &lsquo;N&rsquo; built from progressive
                parallel lines, representing innovation, scale, momentum, and a
                portfolio of technology brands under one global venture.
              </p>
            </div>
            <div className="space-y-4 pt-2">
              {[
                {
                  icon: Layers,
                  title: "Portfolio",
                  desc: "A family of digital brands",
                },
                {
                  icon: TrendingUp,
                  title: "Growth",
                  desc: "Scale with purpose",
                },
                {
                  icon: InfinityIcon,
                  title: "Innovation",
                  desc: "Build what's next",
                },
                {
                  icon: Globe,
                  title: "Global",
                  desc: "Serving a worldwide audience",
                },
              ].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#3B82F6]/30 bg-gradient-to-br from-[#3B82F6]/20 to-[#7C3AED]/20 text-[#06D6D6]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-['Space_Grotesk',sans-serif] text-sm font-semibold text-white">
                        {pillar.title}
                      </div>
                      <div className="text-xs text-slate-400">
                        {pillar.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: App Icons, Clear Space, Color Palette, Typography */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* App / Favicon Icons */}
              <div className="rounded-2xl border border-white/10 bg-[#0B1020] p-6 space-y-5">
                <h2 className="font-['Space_Grotesk',sans-serif] text-base font-bold text-white">
                  App / Favicon Icons
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {APP_SQUIRCLES.map((sq) => (
                    <div
                      key={sq.label}
                      className="flex flex-col items-center space-y-2"
                    >
                      <NevroraIcon
                        withSquircle
                        squircleVariant={sq.variant}
                        size={64}
                      />
                      <div className="flex gap-1.5 text-[10px]">
                        <a
                          href={sq.svgHref}
                          download
                          className="text-[#06D6D6] hover:underline"
                        >
                          SVG
                        </a>
                        <span className="text-slate-600">/</span>
                        <a
                          href={sq.pngHref}
                          download
                          className="text-[#3B82F6] hover:underline"
                        >
                          PNG
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Optical Scale Preview:
                  </span>
                  <div className="flex items-end gap-3">
                    {[48, 32, 24, 16].map((sz) => (
                      <div
                        key={sz}
                        className="flex flex-col items-center gap-1"
                      >
                        <NevroraIcon
                          withSquircle
                          squircleVariant="dark"
                          size={sz}
                        />
                        <span className="text-[10px] text-slate-500">
                          {sz}px
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Space & Minimum Size */}
              <div className="rounded-2xl border border-white/10 bg-[#0B1020] p-6 space-y-4">
                <h2 className="font-['Space_Grotesk',sans-serif] text-base font-bold text-white">
                  Clear Space &amp; Minimum Size
                </h2>
                <div className="flex items-center justify-between gap-4">
                  {/* Clear space box */}
                  <div className="relative border border-dashed border-[#06D6D6]/40 bg-[#070B16] p-5 rounded-lg">
                    <span className="absolute top-1 left-1.5 text-[10px] font-mono text-[#06D6D6]">
                      X
                    </span>
                    <span className="absolute top-1 right-1.5 text-[10px] font-mono text-[#06D6D6]">
                      X
                    </span>
                    <span className="absolute bottom-1 left-1.5 text-[10px] font-mono text-[#06D6D6]">
                      X
                    </span>
                    <span className="absolute bottom-1 right-1.5 text-[10px] font-mono text-[#06D6D6]">
                      X
                    </span>
                    <div className="border border-white/15 px-3 py-2">
                      <NevroraLogo variant="stacked" theme="dark" size="sm" />
                    </div>
                  </div>
                  {/* Minimum Sizes */}
                  <div className="space-y-3 text-right">
                    <div>
                      <div className="inline-flex justify-end">
                        <NevroraLogo
                          variant="horizontal"
                          theme="dark"
                          size="sm"
                          showDivider={false}
                        />
                      </div>
                      <div className="mt-1 border-t border-slate-600 pt-1 text-[11px] text-slate-300">
                        &ge; 120 px (Digital)
                      </div>
                    </div>
                    <div>
                      <div className="inline-flex justify-end">
                        <NevroraIcon theme="gradient" size={24} />
                      </div>
                      <div className="mt-1 border-t border-slate-600 pt-1 text-[11px] text-slate-300">
                        &ge; 24 px (Print / Icon)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Palette + Typography */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 rounded-2xl border border-white/10 bg-[#0B1020] p-6">
                <h2 className="font-['Space_Grotesk',sans-serif] text-base font-bold text-white mb-4">
                  Brand Color Palette
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {BRAND_PALETTE.map((swatch) => (
                    <div key={swatch.hex} className="space-y-2 text-center">
                      <div
                        className="h-14 w-full rounded-xl border border-white/15 shadow-inner"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="font-mono text-xs text-white">
                        {swatch.hex}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {swatch.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 rounded-2xl border border-white/10 bg-[#0B1020] p-6 flex flex-col justify-between">
                <h2 className="font-['Space_Grotesk',sans-serif] text-base font-bold text-white mb-3">
                  Typography
                </h2>
                <div className="flex items-center gap-5">
                  <div className="font-['Space_Grotesk',sans-serif] text-5xl font-bold text-white">
                    Aa
                  </div>
                  <div className="space-y-2.5">
                    <div>
                      <div className="font-['Space_Grotesk',sans-serif] text-sm font-semibold text-white">
                        Space Grotesk
                      </div>
                      <div className="text-xs text-slate-400">
                        Headings, Logo, Display
                      </div>
                    </div>
                    <div>
                      <div className="font-sans text-sm font-semibold text-white">
                        Inter
                      </div>
                      <div className="text-xs text-slate-400">
                        Body, UI, Paragraphs
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Generated Web Favicons & Android App Asset Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Website & Browser Favicons */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0B1020] p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <Monitor className="h-5 w-5 text-[#06D6D6]" />
              <h2 className="font-['Space_Grotesk',sans-serif] text-lg font-bold text-white">
                Website Favicons &amp; Metadata
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Wired directly into{" "}
              <code className="text-[#06D6D6]">layout.tsx</code> and served from{" "}
              <code className="text-[#06D6D6]">apps/web/public/</code>.
            </p>
            <div className="divide-y divide-white/10">
              {WEB_FAVICONS.map((f) => (
                <div
                  key={f.href}
                  className="py-2.5 flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-6 min-w-[44px] items-center justify-center rounded bg-white/10 px-1.5 font-mono text-[10px] text-[#06D6D6]">
                      {f.size}
                    </span>
                    <span className="text-slate-200 text-xs sm:text-sm">
                      {f.label}
                    </span>
                  </div>
                  <a
                    href={f.href}
                    download
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#3B82F6] hover:text-[#06D6D6]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Android App & Play Store Assets */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0B1020] p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Smartphone className="h-5 w-5 text-[#D946EF]" />
                <h2 className="font-['Space_Grotesk',sans-serif] text-lg font-bold text-white">
                  Android App, PWA &amp; Play Store Icons
                </h2>
              </div>
              <a
                href="/android/playstore-icon.png"
                download="nevrora-playstore-512.png"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#D946EF]/40 bg-[#D946EF]/10 px-3 py-1.5 text-xs font-semibold text-[#D946EF] hover:bg-[#D946EF]/20"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Play Store 512×512</span>
              </a>
            </div>

            {/* PWA / Maskable quick row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  name: "Chrome 192",
                  src: "/android-chrome-192x192.png",
                  file: "android-chrome-192x192.png",
                },
                {
                  name: "Chrome 512",
                  src: "/android-chrome-512x512.png",
                  file: "android-chrome-512x512.png",
                },
                {
                  name: "Maskable 192",
                  src: "/android-maskable-192x192.png",
                  file: "android-maskable-192x192.png",
                },
                {
                  name: "Maskable 512",
                  src: "/android-maskable-512x512.png",
                  file: "android-maskable-512x512.png",
                },
              ].map((pwa) => (
                <a
                  key={pwa.file}
                  href={pwa.src}
                  download={pwa.file}
                  className="group flex flex-col items-center rounded-xl border border-white/10 bg-[#070B16] p-3 hover:border-[#3B82F6]/60 transition-colors"
                >
                  <img
                    src={pwa.src}
                    alt={pwa.name}
                    className="h-14 w-14 rounded-xl object-contain"
                  />
                  <span className="mt-2 text-xs font-medium text-slate-200 group-hover:text-[#06D6D6]">
                    {pwa.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Native Android Mipmap Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="py-2 pr-3 font-medium">Density Folder</th>
                    <th className="py-2 px-3 font-medium">Scale</th>
                    <th className="py-2 px-3 font-medium">Launcher</th>
                    <th className="py-2 px-3 font-medium">Round</th>
                    <th className="py-2 pl-3 font-medium">
                      Adaptive Foreground
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {ANDROID_DENSITIES.map((d) => (
                    <tr key={d.folder} className="text-slate-200">
                      <td className="py-2.5 pr-3 font-mono text-[#06D6D6]">
                        {d.folder}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">{d.scale}</td>
                      <td className="py-2.5 px-3">
                        <a
                          href={`/android/${d.folder}/ic_launcher.png`}
                          download={`ic_launcher_${d.folder}.png`}
                          className="text-[#3B82F6] hover:underline"
                        >
                          ic_launcher ({d.launcherSize})
                        </a>
                      </td>
                      <td className="py-2.5 px-3">
                        <a
                          href={`/android/${d.folder}/ic_launcher_round.png`}
                          download={`ic_launcher_round_${d.folder}.png`}
                          className="text-[#3B82F6] hover:underline"
                        >
                          ic_launcher_round
                        </a>
                      </td>
                      <td className="py-2.5 pl-3">
                        <a
                          href={`/android/${d.folder}/ic_launcher_foreground.png`}
                          download={`ic_launcher_foreground_${d.folder}.png`}
                          className="text-[#3B82F6] hover:underline"
                        >
                          foreground ({d.fgSize})
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Adaptive XML files */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <FileCode2 className="h-4 w-4 text-[#06D6D6]" />
                <span>Adaptive Icon XMLs (API 26+):</span>
              </span>
              {[
                {
                  name: "drawable/ic_launcher_background.xml",
                  href: "/android/drawable/ic_launcher_background.xml",
                },
                {
                  name: "drawable/ic_launcher_foreground.xml",
                  href: "/android/drawable/ic_launcher_foreground.xml",
                },
                {
                  name: "mipmap-anydpi-v26/ic_launcher.xml",
                  href: "/android/mipmap-anydpi-v26/ic_launcher.xml",
                },
                {
                  name: "mipmap-anydpi-v26/ic_launcher_round.xml",
                  href: "/android/mipmap-anydpi-v26/ic_launcher_round.xml",
                },
              ].map((xml) => (
                <a
                  key={xml.href}
                  href={xml.href}
                  download
                  className="rounded bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-300 hover:bg-white/10 hover:text-[#06D6D6]"
                >
                  {xml.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
