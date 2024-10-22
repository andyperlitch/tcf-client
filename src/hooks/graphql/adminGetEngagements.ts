import { gql } from "@apollo/client";

export const adminGetEngagements = gql`
  query adminGetEngagements($eventId: Int!) {
    engagements(eventId: $eventId) {
      id
      createdAt
      updatedAt
      title
      description
      startTime
      endTime
      viewConfig
      viewData
      status
      order
    }
  }
`;
