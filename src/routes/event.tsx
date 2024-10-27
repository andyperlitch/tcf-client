import { Navigate, useLocation } from "react-router-dom";
import { Funksgiving } from "./Funksgiving";
import { FC } from "react";
// import { FanGetEventQuery, useFanGetEventQuery } from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { useAuth } from "@/hooks/useAuth";

const CUSTOM_EVENT_PAGES: Record<string, FC> = {
  funksgiving: Funksgiving,
};

export function EventMobileScreen() {
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

  // const { loading, error, data } = useFanGetEventQuery({
  // const { loading, error, data } = useFanGetEventQuery({
  //   variables: { slug },
  // });

  if (!slug) {
    return <Navigate to="/events" />;
  }
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;
  // if (data?.event?.live !== true) {
  //   return (
  //     <div
  //       className={`
  //         relative z-[2] mx-auto max-w-3xl justify-center p-12 text-center
  //         font-hand
  //       `}
  //     >
  //       <h1 className="mb-8 text-8xl">Event not found!</h1>
  //       <p className="text-4xl">Check back later.</p>
  //     </div>
  //   );
  // }

  if (CUSTOM_EVENT_PAGES[slug]) {
    const CustomEventPage = CUSTOM_EVENT_PAGES[slug];
    return <CustomEventPage />;
  }

  return <p>No custom event page found for {slug}</p>;
}
