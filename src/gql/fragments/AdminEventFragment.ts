import { gql } from "@apollo/client";

gql`
  fragment AdminEvent on Event {
    id
    name
    date
    live
    location
    locked
    description
    slug
    createdAt
    updatedAt
    activeEngagement {
      ...AdminEngagement
    }
    activeEngagementId
    engagements {
      ...AdminEngagement
    }
  }
`;
