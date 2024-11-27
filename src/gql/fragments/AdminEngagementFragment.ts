import { gql } from "@apollo/client";

gql`
  fragment AdminEngagement on Engagement {
    id
    createdAt
    updatedAt
    title
    description
    qrCodeCta
    startTime
    order
    endTime
    type
    data {
      ...PhotoCarouselAdminDataFields
      ...VoteForAdminDataFields
      ...SlidesAdminDataFields
      ...NowPlayingAdminDataFields
    }
    config {
      ...PhotoCarouselAdminConfigFields
      ...VoteForAdminConfigFields
      ...SlidesAdminConfigFields
      ...NowPlayingAdminConfigFields
    }
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
    order
  }
`;
