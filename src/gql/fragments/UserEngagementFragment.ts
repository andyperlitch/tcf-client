import { gql } from "@apollo/client";

export const UserEngagementFragment = gql`
  fragment UserEngagementFragment on Engagement {
    id
    title
    description
    startTime
    endTime
    viewConfig
    viewData
    type
  }
`;
