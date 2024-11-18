import { gql } from "@apollo/client";

gql`
  fragment SlidesViewConfigFields on SlidesViewConfig {
    autoPlay
  }
  fragment SlidesViewDataFields on SlidesViewData {
    currentSlide
  }
  fragment SlidesSubmissionFields on SlidesSubmissionData {
    optionalImageUrl
    title
    content
    order
  }
  fragment SlidesAdminConfigFields on SlidesAdminConfig {
    autoPlay
  }
  fragment SlidesAdminDataFields on SlidesAdminData {
    currentSlide
  }
`;
