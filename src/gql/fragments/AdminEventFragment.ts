import { gql } from "@apollo/client";

gql`
  fragment AdminEvent on Event {
    id
    name
    date
    location
    description
    slug
    live
    createdAt
    updatedAt
    activeEngagement {
      id
    }
    activeEngagementId
    engagements {
      id
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
      createdAt
      updatedAt
    }
  }
`;
