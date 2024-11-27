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
      ...NowPlayingViewConfigFields
    }
    viewData {
      ...PhotoCarouselViewDataFields
      ...VoteForViewDataFields
      ...SlidesViewDataFields
      ...NowPlayingViewDataFields
    }
    type
    order
  }
`;
