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
      ...PhotoCarouselConfigFields
      ...VoteForConfigFields
    }
    viewData {
      ...PhotoCarouselDataFields
      ...VoteForDataFields
    }
    type
    order
    submissions {
      ...StageSubmission
    }
  }
`;
