import { gql } from "@apollo/client";

gql`
  fragment StageSubmission on Submission {
    id
    createdAt
    data {
      ...PhotoCarouselSubmissionFields
      ...VoteForSubmissionFields
    }
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
