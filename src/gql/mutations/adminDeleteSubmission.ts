import { gql } from "@apollo/client";

gql`
  mutation adminDeleteSubmission($id: Int!) {
    deleteSubmission(submissionId: $id) {
      ...AdminSubmission
    }
  }
`;
