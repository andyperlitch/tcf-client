import ErrorPage from "@/error-page";
import { gql, useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import { Funksgiving } from "./Funksgiving";
import { FC } from "react";

const USE_EVENT = gql`
  query useEvent($slug: String!) {
    event(slug: $slug) {
      id
      name
      live
      description
      date
      location
    }
  }
`;

const CUSTOM_EVENT_PAGES: Record<string, FC<{ event: Event }>> = {
  funksgiving: Funksgiving,
};

export function Event() {
  const { slug } = useParams();

  const { loading, error, data } = useQuery(USE_EVENT, {
    variables: { slug },
  });

  if (!slug) {
    return <Navigate to="/events" />;
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data.event.live !== true) {
    return (
      <div
        className={`
          relative z-[2] mx-auto max-w-3xl justify-center p-12 text-center
          font-hand
        `}
      >
        <h1 className="mb-8 text-8xl">Event not found!</h1>
        <p className="text-4xl">Check back later.</p>
      </div>
    );
  }

  if (CUSTOM_EVENT_PAGES[slug]) {
    const CustomEventPage = CUSTOM_EVENT_PAGES[slug];
    return <CustomEventPage />;
  }
}
