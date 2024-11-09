import { gql } from "@apollo/client";

gql`
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
      ...AdminEngagement
    }
    activeEngagementId
    engagements {
      ...AdminEngagement
    }
  }
`;
