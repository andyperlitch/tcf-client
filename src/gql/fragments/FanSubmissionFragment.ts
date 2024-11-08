import { gql } from "@apollo/client";

gql`
  fragment FanSubmission on Submission {
    id
    createdAt
    data
    reactions {
      id
      createdAt
      type
      userId
      user {
        id
        name
      }
    }
  }
`;
