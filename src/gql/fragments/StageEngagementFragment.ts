import { gql } from "@apollo/client";

gql`
  fragment StageEngagement on Engagement {
    id
    createdAt
    updatedAt
    title
    description
    startTime
    endTime
    viewConfig
    viewData
    type
    order
    submissions {
      ...StageSubmission
    }
  }
`;
