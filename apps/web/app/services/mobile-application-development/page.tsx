import React from "react";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "../../../lib/services-data";
import { ServiceDetailView } from "../../../components/services/ServiceDetailView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Application Development | Services",
  description:
    "Native-feel iOS and Android applications built for real-world reliability.",
};

export default function MobileApplicationDevelopmentPage() {
  const service = getServiceBySlug("mobile-application-development");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
