import * as amplitude from "@amplitude/analytics-browser";

const AMPLITUDE_API_KEY = "2032f99eade4ad6d54c694c81ff25c9b";

amplitude.init(AMPLITUDE_API_KEY);

/**
 * In the future, we can provide wrappers for sending analytics events
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return children;
}
