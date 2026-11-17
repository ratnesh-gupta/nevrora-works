import React from "react";
import Link from "next/link";
import {
  STATUTORY_DETAILS,
  LOCKED_NAVIGATION_ITEMS,
  PRODUCT_CATEGORIES,
  OFFICIAL_SUPPORT_EMAIL,
} from "@nevrora/config";
import { NevroraLogo } from "../brand/NevroraLogo";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/80 bg-slate-50 text-slate-700">
      {/* Top Footer Section */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link
              href="/"
              className="group inline-block"
              aria-label="Nevrora Works Home"
            >
              <NevroraLogo
                variant="horizontal"
                theme="light"
                size="md"
                subtitle="WORKS"
              />
              <span className="sr-only">Nevrora Works</span>
            </Link>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-blue-700">
              Ideas into products.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Nevrora Works is a product company creating, owning, and operating
              useful digital products across mobile, web, SaaS, and AI-enabled
              categories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#0B1020] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {LOCKED_NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#0B1020] mb-4">
              Product Categories
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Portfolio & Support */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#0B1020] mb-4">
              Product Portfolio
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link
                  href="/products/sadhana-daily"
                  className="hover:text-blue-600 transition-colors"
                >
                  Sadhana Daily (Coming Soon)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/neermiti-collections"
                  className="hover:text-blue-600 transition-colors"
                >
                  Neermiti Collections (Coming Soon)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/driveiq"
                  className="hover:text-blue-600 transition-colors"
                >
                  DriveIQ (Coming Soon)
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="font-medium text-blue-600 hover:underline transition-colors"
                >
                  Product Support Directory &rarr;
                </Link>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs text-slate-500">
              <p>
                Product Support:{" "}
                <a
                  href={`mailto:${OFFICIAL_SUPPORT_EMAIL}`}
                  className="text-blue-600 hover:underline break-all"
                >
                  {OFFICIAL_SUPPORT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Companies Act 2013 Rule 26 Statutory Corporate Footer Strip */}
      <div className="border-t border-slate-200/80 bg-white px-6 py-8">
        <div className="mx-auto max-w-7xl text-xs text-slate-500 leading-relaxed space-y-2 break-words [overflow-wrap:anywhere]">
          <div className="flex flex-wrap items-center justify-between gap-y-2 border-b border-slate-200/60 pb-4">
            <p className="font-semibold text-[#0B1020] break-words">
              {STATUTORY_DETAILS.legalName} &bull; CIN: {STATUTORY_DETAILS.cin}
            </p>
            <p className="break-words">
              Registered Office: {STATUTORY_DETAILS.registeredOffice}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-y-2 pt-2">
            <p className="break-words">
              Contact Phone: {STATUTORY_DETAILS.phone} | Official Support Email:{" "}
              <a
                href={`mailto:${STATUTORY_DETAILS.supportEmail}`}
                className="text-blue-600 hover:underline break-all"
              >
                {STATUTORY_DETAILS.supportEmail}
              </a>
            </p>
            <p className="break-words">
              Grievance & Data Protection Officer:{" "}
              {STATUTORY_DETAILS.grievanceContact.name} (
              <a
                href={`mailto:${STATUTORY_DETAILS.grievanceContact.email}`}
                className="text-blue-600 hover:underline break-all"
              >
                {STATUTORY_DETAILS.grievanceContact.email}
              </a>
              )
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-y-2 pt-4 border-t border-slate-200/60 text-[11px]">
            <p>
              &copy; {new Date().getFullYear()} {STATUTORY_DETAILS.legalName}{" "}
              (Nevrora Works). All rights reserved.
            </p>
            <nav
              className="flex flex-wrap items-center gap-x-4 gap-y-2"
              aria-label="Legal Disclosures"
            >
              <Link
                href="/privacy-policy"
                className="hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <span>&bull;</span>
              <Link
                href="/terms"
                className="hover:text-blue-600 transition-colors"
              >
                Terms of Use
              </Link>
              <span>&bull;</span>
              <Link
                href="/disclaimer"
                className="hover:text-blue-600 transition-colors"
              >
                Disclaimer
              </Link>
              <span>&bull;</span>
              <Link
                href="/cookies"
                className="hover:text-blue-600 transition-colors"
              >
                Cookie Notice & Preferences
              </Link>
              <span>&bull;</span>
              <Link
                href="/support"
                className="hover:text-blue-600 transition-colors"
              >
                Support Directory
              </Link>
              <span>&bull;</span>
              <Link
                href="/brand"
                className="hover:text-blue-600 transition-colors"
              >
                Brand Identity & Assets
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
