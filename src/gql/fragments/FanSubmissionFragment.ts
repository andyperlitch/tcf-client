import { gql } from "@apollo/client";

gql`
  fragment FanSubmission on Submission {
    id
    createdAt
    data {
      ...PhotoCarouselSubmissionFields
      ...VoteForSubmissionFields
      ...SlidesSubmissionFields
    }
    reactions {
      ...FanReaction
    }
  }
`;
