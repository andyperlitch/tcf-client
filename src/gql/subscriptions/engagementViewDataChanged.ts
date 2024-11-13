import { gql } from "@apollo/client";

gql`
  subscription OnEngagementViewDataChanged($engagementId: Int!) {
    engagementViewDataChanged(engagementId: $engagementId) {
      viewData {
        ...PhotoCarouselViewDataFields
        ...VoteForViewDataFields
      }
    }
  }
`;
