import { gql } from "@apollo/client";

export const adminChangeEventActiveEngagement = gql`
  mutation adminChangeEventActiveEngagement(
    $eventId: Int!
    $engagementId: Int
  ) {
    changeEventActiveEngagement(
      engagementId: $engagementId
      eventId: $eventId
    ) {
      id
      activeEngagementId
      createdAt
    }
  }
`;
