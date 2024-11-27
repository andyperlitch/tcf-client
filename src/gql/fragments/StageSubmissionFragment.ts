import { gql } from "@apollo/client";

gql`
  fragment StageSubmission on Submission {
    id
    createdAt
    data {
      ...PhotoCarouselSubmissionFields
      ...VoteForSubmissionFields
      ...SlidesSubmissionFields
      ...NowPlayingSubmissionFields
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
