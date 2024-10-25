import { gql } from "@apollo/client";

export const AdminEngagement = gql`
  fragment AdminEngagement on Engagement {
    id
    createdAt
    updatedAt
    title
    description
    startTime
    endTime
    viewConfig
    viewData
    order
  }
`;
