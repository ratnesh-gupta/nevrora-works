import React from "react";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "../../../lib/services-data";
import { ServiceDetailView } from "../../../components/services/ServiceDetailView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cloud & DevOps | Services",
  description:
    "Resilient cloud infrastructure and automated pipelines that make change feel routine.",
};

export default function CloudDevOpsPage() {
  const service = getServiceBySlug("cloud-devops");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
