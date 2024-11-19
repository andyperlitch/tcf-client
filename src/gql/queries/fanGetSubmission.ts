import { gql } from "@apollo/client";

gql`
  query fanGetSubmission($submissionId: Int!) {
    submission(id: $submissionId) {
      ...FanSubmission
    }
  }
`;
