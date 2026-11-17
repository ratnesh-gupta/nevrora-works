"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  LOCKED_NAVIGATION_ITEMS,
  LOCKED_NAVIGATION_CTA,
} from "@nevrora/config";
import { X } from "lucide-react";
import { NevroraLogo } from "../brand/NevroraLogo";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export function MobileNav({ isOpen, onClose, currentPath }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden bg-white/95 backdrop-blur-xl flex flex-col transition-all text-slate-900"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      <div className="flex h-20 items-center justify-between px-6 border-b border-slate-200/80">
        <Link
          href="/"
          onClick={onClose}
          className="inline-flex items-center"
          aria-label="Nevrora Ventures Home"
        >
          <NevroraLogo variant="horizontal" theme="light" size="sm" />
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2.5 text-slate-800 hover:bg-slate-100 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label="Close navigation"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav
        className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between"
        aria-label="Mobile Navigation Links"
      >
        <div className="space-y-4">
          {LOCKED_NAVIGATION_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? currentPath === "/"
                : currentPath === item.href ||
                  currentPath.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`block py-3 text-lg font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 font-bold border-l-2 border-blue-600 pl-3"
                    : "text-[#0B1020] hover:text-blue-600"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="pt-8 border-t border-slate-200/80 space-y-4">
          <Link
            href={LOCKED_NAVIGATION_CTA.href}
            onClick={onClose}
            className="w-full flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:opacity-95 transition-all"
          >
            {LOCKED_NAVIGATION_CTA.label}
          </Link>
          <p className="text-xs text-center text-slate-500">
            Institutional Venture Studio & Engineering Advisory
          </p>
        </div>
      </nav>
    </div>
  );
}
