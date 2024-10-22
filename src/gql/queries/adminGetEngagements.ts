import { gql } from "@apollo/client";

export const adminGetEngagements = gql`
  query adminGetEngagements($eventId: Int!) {
    engagements(eventId: $eventId) {
      ...AdminEngagement
    }
  }
`;
