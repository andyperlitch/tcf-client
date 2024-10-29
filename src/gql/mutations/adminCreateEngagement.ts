import { gql } from "@apollo/client";

gql`
  mutation adminCreateEngagement(
    $eventId: Int!
    $input: CreateEngagementInput!
  ) {
    createEngagement(eventId: $eventId, data: $input) {
      ...AdminEngagement
    }
  }
`;
