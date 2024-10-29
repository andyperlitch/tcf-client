import { gql } from "@apollo/client";

gql`
  fragment FanSubmission on Submission {
    id
    data
    createdAt
    reactions {
      id
      type
    }
  }
`;
