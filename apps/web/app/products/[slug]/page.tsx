import React from "react";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getPublishedProducts,
} from "../../../lib/products-data";
import { ProductDetailView } from "../../../components/products/ProductDetailView";
import { STATUTORY_DETAILS } from "@nevrora/config";
import type { Metadata } from "next";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getPublishedProducts().map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.seo.pageTitle,
    description: product.seo.metaDescription,
    alternates: {
      canonical: product.seo.canonicalPath,
    },
    openGraph: {
      title: product.seo.pageTitle,
      description: product.seo.metaDescription,
      url: product.seo.canonicalPath,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // NW-FR-09: Accurate SoftwareApplication structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.description,
    applicationCategory: product.seo.applicationCategory,
    operatingSystem: product.seo.operatingSystem,
    publisher: {
      "@type": "Organization",
      name: "Nevrora Works",
      legalName: STATUTORY_DETAILS.legalName,
      email: STATUTORY_DETAILS.supportEmail,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView product={product} />
    </>
  );
}
