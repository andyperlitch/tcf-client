import { gql } from "@apollo/client";

gql`
  query adminGetEngagement($engagementId: Int!) {
    engagement(id: $engagementId) {
      ...AdminEngagement
    }
  }
`;
