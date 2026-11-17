import React from "react";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "../../../lib/services-data";
import { ServiceDetailView } from "../../../components/services/ServiceDetailView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & Intelligent Automation | Services",
  description:
    "Autonomous agents, intelligent workflows, and ML pipelines that scale decision-making.",
};

export default function AiIntelligentAutomationPage() {
  const service = getServiceBySlug("ai-intelligent-automation");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
