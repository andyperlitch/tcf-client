import { gql } from "@apollo/client";

export const engagementViewDataChanged = gql`
  subscription OnEngagementViewDataChanged($engagementId: Int!) {
    engagementViewDataChanged(engagementId: $engagementId) {
      viewData
    }
  }
`;
