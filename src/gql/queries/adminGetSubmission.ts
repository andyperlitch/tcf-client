import { gql } from "@apollo/client";

gql`
  query adminGetSubmission($submissionId: Int!) {
    submission(id: $submissionId) {
      ...AdminSubmission
    }
  }
`;
