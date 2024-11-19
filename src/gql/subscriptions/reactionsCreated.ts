import { gql } from "@apollo/client";

gql`
  subscription OnReactionsCreated($submissionId: Int!) {
    reactionsCreated(submissionId: $submissionId) {
      reactions {
        ...StageReaction
      }
    }
  }
`;
