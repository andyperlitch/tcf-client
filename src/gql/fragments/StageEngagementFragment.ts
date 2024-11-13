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
    }
    viewData {
      ...PhotoCarouselViewDataFields
      ...VoteForViewDataFields
    }
    type
    order
  }
`;
