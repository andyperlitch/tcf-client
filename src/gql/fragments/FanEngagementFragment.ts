import { gql } from "@apollo/client";

gql`
  fragment FanEngagement on Engagement {
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
      id
      createdAt
      data
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
  }
`;
