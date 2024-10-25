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
    type
    order
    submissions {
      id
      createdAt
      data
      reactions {
        id
        createdAt
        type
        userId
        user {
          id
          name
        }
      }
    }
  }
`;
