import { gql } from "@apollo/client";

gql`
  mutation adminMoveEngagement($engagementId: Int!, $direction: String!) {
    moveEngagement(engagementId: $engagementId, direction: $direction) {
      ...AdminEngagement
    }
  }
`;
