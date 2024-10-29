import { gql } from "@apollo/client";

gql`
  query adminGetEngagements($eventId: Int!) {
    engagements(eventId: $eventId) {
      ...AdminEngagement
    }
  }
`;
