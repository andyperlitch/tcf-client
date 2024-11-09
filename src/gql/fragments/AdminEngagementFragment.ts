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
    endTime
    type
    config
    data
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
