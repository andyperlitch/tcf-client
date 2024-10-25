import { gql } from "@apollo/client";

export const StageEngagement = gql`
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
    status
    order
  }
`;
