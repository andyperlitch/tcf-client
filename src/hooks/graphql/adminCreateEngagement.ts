import { gql } from "@apollo/client";

export const adminCreateEngagement = gql`
  mutation adminCreateEngagement(
    $eventId: Int!
    $input: CreateEngagementInput!
  ) {
    createEngagement(eventId: $eventId, data: $input) {
      id
    }
  }
`;
