import { gql } from "@apollo/client";

gql`
  fragment FanSubmission on Submission {
    id
    createdAt
    data {
      ...PhotoCarouselSubmissionFields
      ...VoteForSubmissionFields
    }
    reactions {
      ...FanReaction
    }
  }
`;
