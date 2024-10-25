import { gql } from "@apollo/client";

export const activeEngagementChanged = gql`
  subscription OnActiveEngagementChanged($eventSlug: String!) {
    activeEngagementChanged(eventSlug: $eventSlug) {
      ...StageEngagement
      # id
      # type
      # config {
      #   __typename
      #   ... on PhotoCarouselConfig {
      #     maxPhotos
      #     maxPhotosPerUser
      #   }
      #   ... on VoteForConfig {
      #     options
      #     maxVotes
      #   }
      # }
      # data {
      #   __typename
      #   ... on PhotoCarouselData {
      #     # Future fields for PhotoCarouselData
      #   }
      #   ... on VoteForData {
      #     # Future fields for VoteForData
      #   }
      # }
    }
  }
`;
