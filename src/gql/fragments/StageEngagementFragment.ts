import { gql } from "@apollo/client";

gql`
  fragment StageEngagement on Engagement {
    id
    createdAt
    updatedAt
    title
    qrCodeCta
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
