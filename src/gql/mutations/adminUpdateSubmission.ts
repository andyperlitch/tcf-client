import { gql } from "@apollo/client";

gql`
  mutation adminUpdateSubmission($id: Int!, $data: Json!) {
    updateSubmission(submissionId: $id, data: $data) {
      ...AdminSubmission
    }
  }
`;
