import * as realAmplitude from "@amplitude/analytics-browser";
import * as mockAmplitude from "../lib/mockAmplitude";
import { createContext, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

const amplitude =
  window.location.hostname === "localhost" ||
  window.location.hostname.startsWith("192.168")
    ? mockAmplitude
    : realAmplitude;

const AMPLITUDE_API_KEY = "2032f99eade4ad6d54c694c81ff25c9b";

amplitude.init(AMPLITUDE_API_KEY, {
  autocapture: true,
});

export const AnalyticsContext = createContext<{
  trackEvent: (eventName: string, eventData?: Record<string, any>) => void;
}>({
  trackEvent: () => {
    console.warn("AnalyticsContext not provided!");
  },
});

/**
 * In the future, we can provide wrappers for sending analytics events
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    amplitude.track("Page Viewed", { path });
  }, [location]);

  const value = useMemo(
    () => ({
      trackEvent: (eventName: string, eventData?: Record<string, any>) => {
        amplitude.track(eventName, eventData);
      },
    }),
    []
  );

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}
