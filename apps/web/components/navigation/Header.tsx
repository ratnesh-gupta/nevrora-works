"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOCKED_NAVIGATION_ITEMS,
  LOCKED_NAVIGATION_CTA,
} from "@nevrora/config";
import { MobileNav } from "./MobileNav";
import { NevroraLogo } from "../brand/NevroraLogo";
import { Menu, X } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            aria-label="Nevrora Ventures Home"
          >
            <NevroraLogo variant="horizontal" theme="light" size="md" />
            <span className="sr-only">Nevrora Ventures</span>
          </Link>
        </div>

        {/* Desktop Primary Navigation: Strictly 6 locked items, NO /ventures */}
        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Primary navigation"
        >
          {LOCKED_NAVIGATION_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive ? "text-blue-600 font-semibold" : "text-[#0B1020]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Primary CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href={LOCKED_NAVIGATION_CTA.href}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-95 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            {LOCKED_NAVIGATION_CTA.label}
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2.5 text-slate-800 hover:bg-slate-100 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open navigation menu"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer Navigation */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        currentPath={pathname}
      />
    </header>
  );
}
