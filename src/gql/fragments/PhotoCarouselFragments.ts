import { gql } from "@apollo/client";

gql`
  fragment PhotoCarouselConfigFields on PhotoCarouselConfig {
    maxSubmissionsPerUser
  }
  fragment PhotoCarouselDataFields on PhotoCarouselData {
    visibleSubmission
  }
`;
