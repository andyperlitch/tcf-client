import { Navigate, useLocation } from "react-router-dom";
import { FunksgivingFanScreen } from "./Funksgiving";
import { FC } from "react";
// import { FanGetEventQuery, useFanGetEventQuery } from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { useAuth } from "@/hooks/useAuth";

const CUSTOM_EVENT_PAGES: Record<string, FC> = {
  funksgiving: FunksgivingFanScreen,
};

export function EventFanScreen() {
  const { slug } = useParamsSafe("slug");
  const { pathname } = useLocation();
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to={`/quick-signup?returnUrl=${encodeURIComponent(pathname)}`}
      />
    );
  }

  if (!slug) {
    return <Navigate to="/events" />;
  }

  if (CUSTOM_EVENT_PAGES[slug]) {
    const CustomEventPage = CUSTOM_EVENT_PAGES[slug];
    return <CustomEventPage />;
  }

  return <p>No custom event page found for {slug}</p>;
}
