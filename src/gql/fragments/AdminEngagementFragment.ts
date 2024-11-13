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
    }
    config {
      ...PhotoCarouselAdminConfigFields
      ...VoteForAdminConfigFields
    }
    viewConfig {
      ...PhotoCarouselViewConfigFields
      ...VoteForViewConfigFields
    }
    viewData {
      ...PhotoCarouselViewDataFields
      ...VoteForViewDataFields
    }
    order
  }
`;
