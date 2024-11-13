import { gql } from "@apollo/client";

gql`
  mutation adminChangeEventActiveEngagement(
    $eventId: Int!
    $engagementId: Int
  ) {
    changeEventActiveEngagement(
      engagementId: $engagementId
      eventId: $eventId
    ) {
      ...AdminEvent
    }
  }
`;
