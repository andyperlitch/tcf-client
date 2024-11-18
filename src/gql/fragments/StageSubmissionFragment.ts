import { gql } from "@apollo/client";

gql`
  fragment StageSubmission on Submission {
    id
    createdAt
    data {
      ...PhotoCarouselSubmissionFields
      ...VoteForSubmissionFields
      ...SlidesSubmissionFields
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
