import { gql } from "@apollo/client";

export const adminGetEngagement = gql`
  query adminGetEngagement($engagementId: Int!) {
    engagement(id: $engagementId) {
      ...AdminEngagement
    }
  }
`;
