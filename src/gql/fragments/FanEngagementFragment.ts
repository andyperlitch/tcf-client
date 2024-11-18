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
      ...PhotoCarouselViewConfigFields
      ...VoteForViewConfigFields
      ...SlidesViewConfigFields
    }
    viewData {
      ...PhotoCarouselViewDataFields
      ...VoteForViewDataFields
      ...SlidesViewDataFields
    }
    type
    order
  }
`;
