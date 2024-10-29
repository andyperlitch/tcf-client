import { gql } from "@apollo/client";

gql`
  fragment AdminSubmission on Submission {
    id
    data
    createdAt
    reactions {
      id
      type
    }
  }
`;
