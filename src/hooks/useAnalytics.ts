import { AnalyticsContext } from "@/providers/AnalyticsProvider";
import { useContext } from "react";

export function useAnalytics() {
  return useContext(AnalyticsContext);
}
