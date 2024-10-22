import { gql } from "@apollo/client";

export const adminGetEvents = gql`
  query adminGetEvents {
    events {
      id
      name
      date
      location
      description
      slug
      activeEngagement {
        id
      }
      activeEngagementId
      engagements {
        id
        title
        description
        startTime
        endTime
        viewData
        viewConfig
        status
        order
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
