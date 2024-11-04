import { gql } from "@apollo/client";

gql`
  query canCreateSubmission($engagementId: Int!) {
    canCreateSubmission(engagementId: $engagementId)
  }
`;
