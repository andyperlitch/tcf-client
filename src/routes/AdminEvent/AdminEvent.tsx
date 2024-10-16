import { AdminContainer } from "@/components/AdminContainer";
import { GetEventQuery, GetEventQueryVariables } from "@/gql/graphql";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { LiveSwitch } from "./LiveSwitch";

const GET_EVENT = gql`
  query GetEvent($slug: String!) {
    event(slug: $slug) {
      id
      name
      location
      date
      description
      live
      slug
      createdAt
      updatedAt
      engagements {
        id
        description
        viewType
        createdAt
        updatedAt
        startTime
        endTime
      }
    }
  }
`;

const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: Int!, $data: UpdateEventInput!) {
    updateEvent(eventId: $id, data: $data) {
      id
      name
      location
      date
      description
      live
      slug
      createdAt
      updatedAt
      engagements {
        id
        description
        viewType
        createdAt
        updatedAt
        startTime
        endTime
      }
    }
  }
`;

export function AdminEvent() {
  const { slug } = useParams();
  const { data, loading, error } = useQuery<
    GetEventQuery,
    GetEventQueryVariables
  >(GET_EVENT, {
    variables: {
      slug: slug || "",
    },
  });

  const [updateEvent, { loading: updateLoading }] = useMutation(UPDATE_EVENT);

  const setLive = (live: boolean) => {
    if (data?.event) {
      updateEvent({
        variables: {
          id: data.event.id,
          data: {
            live,
          },
        },
      });
    }
  };

  let content: ReactNode = "";

  if (loading) {
    content = <p className="text-muted">Loading...</p>;
  } else if (error) {
    content = <p className="text-red-500">Error: {error.message}</p>;
  } else if (data?.event) {
    content = (
      <>
        <h1 className="flex items-baseline space-x-5 text-3xl">
          <span>{data.event.name}</span>{" "}
          <LiveSwitch
            live={data.event.live}
            setLive={setLive}
            loading={updateLoading}
          />
        </h1>

        {/* live switch */}

        {/* date picker */}
      </>
    );
  }

  return <AdminContainer section="events">{content}</AdminContainer>;
}
