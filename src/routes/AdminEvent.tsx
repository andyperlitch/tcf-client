import { gql, useQuery } from "@apollo/client";

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
  const { data } = useQuery(GET_EVENT);

  return (
    <div>
      <h1></h1>
    </div>
  );
}
