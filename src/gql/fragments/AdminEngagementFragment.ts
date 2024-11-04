import { gql } from "@apollo/client";

gql`
  fragment AdminEngagement on Engagement {
    id
    createdAt
    updatedAt
    title
    description
    startTime
    endTime
    viewConfig {
      ...EngagementViewConfig
    }
    viewData {
      ...EngagementViewData
    }
    order
  }
`;
