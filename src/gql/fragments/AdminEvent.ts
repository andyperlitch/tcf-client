import { gql } from "@apollo/client";

export const AdminEvent = gql`
  fragment AdminEvent on Event {
    id
    name
    date
    location
    description
    slug
    live
    createdAt
    updatedAt
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
      order
      createdAt
      updatedAt
    }
  }
`;
