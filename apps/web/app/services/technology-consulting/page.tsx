import React from "react";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "../../../lib/services-data";
import { ServiceDetailView } from "../../../components/services/ServiceDetailView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology Consulting | Services",
  description:
    "Clear technical direction for consequential decisions, acquisitions, and transformations.",
};

export default function TechnologyConsultingPage() {
  const service = getServiceBySlug("technology-consulting");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
