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
    stageConfig {
      ...EventStageConfig
    }
    fanConfig {
      ...EventFanConfig
    }
    activeEngagement {
      ...AdminEngagement
    }
    activeEngagementId
    engagements {
      ...AdminEngagement
    }
  }
`;
