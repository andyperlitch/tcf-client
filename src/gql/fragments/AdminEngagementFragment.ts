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
    }
    config {
      ...PhotoCarouselAdminConfigFields
      ...VoteForAdminConfigFields
      ...SlidesAdminConfigFields
    }
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
    order
  }
`;
