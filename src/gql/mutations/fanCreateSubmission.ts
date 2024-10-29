import { gql } from "@apollo/client";

gql`
  mutation fanCreateSubmission($engagementId: Int!, $data: Json!) {
    createSubmission(engagementId: $engagementId, data: $data) {
      ...FanSubmission
    }
  }
`;
