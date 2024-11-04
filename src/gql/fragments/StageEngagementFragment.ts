import { gql } from "@apollo/client";

gql`
  fragment StageEngagement on Engagement {
    id
    createdAt
    updatedAt
    title
    description
    startTime
    endTime
    viewConfig {
      ... on PhotoCarouselConfig {
        maxSubmissionsPerUser
      }
      ... on VoteForConfig {
        votesPerUser
      }
    }
    viewData {
      ... on PhotoCarouselData {
        visibleSubmission
      }
      ... on VoteForData {
        voteCounts {
          submissionId
          count
        }
      }
    }
    type
    order
    submissions {
      ...StageSubmission
    }
  }
`;
