/**
 * NW-FR-10: Segmented Product Analytics Dispatcher for Nevrora Works
 * Distinguishes product page views, outbound download/signup/CTA clicks, and support routing
 * by product ID, slug, lifecycle status, and platform — completely isolated from Nevrora Digital.
 */

import type {
  PlatformType,
  ProductAnalyticsEvent,
  ProductLifecycleStatus,
} from "@nevrora/types";

declare global {
  interface Window {
    __NEVRORA_WORKS_ANALYTICS__?: ProductAnalyticsEvent[];
  }
}

export function trackProductEvent(
  event: Omit<ProductAnalyticsEvent, "timestamp">,
): ProductAnalyticsEvent {
  const fullEvent: ProductAnalyticsEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    if (!Array.isArray(window.__NEVRORA_WORKS_ANALYTICS__)) {
      window.__NEVRORA_WORKS_ANALYTICS__ = [];
    }
    window.__NEVRORA_WORKS_ANALYTICS__.push(fullEvent);

    window.dispatchEvent(
      new CustomEvent("nevrora-works:analytics", { detail: fullEvent }),
    );
  }

  return fullEvent;
}

export function trackProductPageView(params: {
  productId: string;
  productSlug: string;
  lifecycleStatus: ProductLifecycleStatus;
}): ProductAnalyticsEvent {
  return trackProductEvent({
    eventType: "product_page_view",
    ...params,
  });
}

export function trackProductCtaClick(params: {
  productId: string;
  productSlug: string;
  lifecycleStatus: ProductLifecycleStatus;
  platform?: PlatformType;
  ctaLabel: string;
  destinationUrl: string;
}): ProductAnalyticsEvent {
  return trackProductEvent({
    eventType: "product_cta_click",
    ...params,
  });
}
