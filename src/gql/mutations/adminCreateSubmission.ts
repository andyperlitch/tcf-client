import { gql } from "@apollo/client";

gql`
  mutation adminCreateSubmission($engagementId: Int!, $data: Json!) {
    adminCreateSubmission(engagementId: $engagementId, data: $data) {
      ...AdminSubmission
    }
  }
`;
