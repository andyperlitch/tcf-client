import { gql } from "@apollo/client";

export const adminUpdateEventActiveEngagement = gql`
  mutation adminUpdateEventActiveEngagement(
    $eventId: Int!
    $engagementId: Int
  ) {
    updateEventActiveEngagement(
      engagementId: $engagementId
      eventId: $eventId
    ) {
      id
      activeEngagementId
      createdAt
    }
  }
`;
