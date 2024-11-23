// lib/analytics.js
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function AnalyticsWrapper() {
  return <Analytics />;
}

// Custom event tracking
export function trackEvent(eventName, eventData) {
  if (window.va) {
    window.va.track(eventName, eventData);
  }
}

// Page view tracking
export function usePageTracking() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      trackEvent("page_view", {
        page_path: url,
        page_title: document.title,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
}

// User interaction tracking
export function trackInteraction(interactionType, details) {
  trackEvent("user_interaction", {
    type: interactionType,
    ...details,
    timestamp: new Date().toISOString(),
  });
}
