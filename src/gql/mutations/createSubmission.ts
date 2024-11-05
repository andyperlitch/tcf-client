import { gql } from "@apollo/client";

gql`
  mutation createSubmission($engagementId: Int!, $data: Json!) {
    createSubmission(engagementId: $engagementId, data: $data) {
      ...FanSubmission
    }
  }
`;
