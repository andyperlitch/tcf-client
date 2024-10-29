import { gql } from "@apollo/client";

gql`
  fragment UserEngagement on Engagement {
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
