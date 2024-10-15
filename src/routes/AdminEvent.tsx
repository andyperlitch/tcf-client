import { AdminContainer } from "@/components/AdminContainer";
import { GetEventQuery, GetEventQueryVariables } from "@/gql/graphql";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_EVENT = gql`
  query GetEvent($slug: String!) {
    event(slug: $slug) {
      id
      name
      location
      date
      description
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
  const { data } = useQuery<GetEventQuery, GetEventQueryVariables>(GET_EVENT, {
    variables: {
      slug: slug || "",
    },
  });

  return (
    <AdminContainer section="events">
      <h1 className="text-3xl">{data?.event?.name}</h1>
    </AdminContainer>
  );
}
