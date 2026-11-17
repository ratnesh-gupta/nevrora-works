import React from "react";
import "./globals.css";
import { Header } from "../components/navigation/Header";
import { Footer } from "../components/navigation/Footer";
import { CookieBanner } from "../components/cookies/CookieBanner";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://nevrora.com",
  ),
  title: {
    default:
      "Nevrora Ventures | Institutional Venture Studio & Engineering Advisory",
    template: "%s | Nevrora Ventures",
  },
  description:
    "Institutional venture studio and elite engineering consultancy architecting intelligent systems, transformative products, and resilient platforms.",
  keywords: [
    "Venture Studio",
    "Intelligent Automation",
    "Custom Software Engineering",
    "AI Agents",
    "Cloud DevOps",
    "Nevrora Technologies",
  ],
  authors: [{ name: "Nevrora Technologies Private Limited" }],
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://nevrora.com",
    siteName: "Nevrora Ventures",
    title: "Nevrora Ventures | Venture Studio & Intelligent Engineering",
    description:
      "Architecting high-conviction technology ventures and resilient intelligence systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nevrora Ventures",
      },
    ],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#173C32",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-clip">
      <head>
        <meta name="theme-color" content="#173C32" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen min-w-0 max-w-full overflow-x-clip bg-canvas text-primary antialiased flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">
        <Header />
        <main className="flex-1 w-full min-w-0 max-w-full overflow-hidden">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
