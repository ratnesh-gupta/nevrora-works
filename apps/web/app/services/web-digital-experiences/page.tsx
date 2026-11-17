import React from "react";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "../../../lib/services-data";
import { ServiceDetailView } from "../../../components/services/ServiceDetailView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web & Digital Experiences | Services",
  description:
    "Modern web platforms pairing high editorial aesthetics with sub-second performance.",
};

export default function WebDigitalExperiencesPage() {
  const service = getServiceBySlug("web-digital-experiences");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
