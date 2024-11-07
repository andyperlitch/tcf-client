import { gql } from "@apollo/client";

gql`
  mutation createReaction($submissionId: Int!, $type: String!) {
    createReaction(submissionId: $submissionId, type: $type) {
      ...FanReaction
    }
  }
`;
