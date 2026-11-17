import React from "react";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "../../../lib/services-data";
import { ServiceDetailView } from "../../../components/services/ServiceDetailView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Software Development | Services",
  description:
    "Purpose-built platforms, applications, and APIs engineered for durability and scale.",
};

export default function CustomSoftwareDevelopmentPage() {
  const service = getServiceBySlug("custom-software-development");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
