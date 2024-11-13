import { gql } from "@apollo/client";

gql`
  fragment AdminSubmission on Submission {
    id
    data {
      ...PhotoCarouselSubmissionFields
      ...VoteForSubmissionFields
    }
    createdAt
    reactions {
      id
      type
    }
  }
`;
