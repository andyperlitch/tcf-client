import { gql } from "@apollo/client";

gql`
  fragment AdminSubmission on Submission {
    id
    engagementId
    data {
      ...PhotoCarouselSubmissionFields
      ...VoteForSubmissionFields
      ...SlidesSubmissionFields
    }
    createdAt
    reactions {
      id
      type
    }
  }
`;
