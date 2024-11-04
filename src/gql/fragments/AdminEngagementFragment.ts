import { gql } from "@apollo/client";

gql`
  fragment AdminEngagement on Engagement {
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
    order
  }
`;
