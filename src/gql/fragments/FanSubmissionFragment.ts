import { gql } from "@apollo/client";

gql`
  fragment FanSubmission on Submission {
    id
    createdAt
    engagementId
    data {
      ...PhotoCarouselSubmissionFields
      ...VoteForSubmissionFields
      ...SlidesSubmissionFields
      ...NowPlayingSubmissionFields
    }
    reactions {
      ...FanReaction
    }
  }
`;
