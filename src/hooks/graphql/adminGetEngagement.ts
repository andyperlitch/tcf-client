import { gql } from "@apollo/client";

export const adminGetEngagement = gql`
  query adminGetEngagement($engagementId: Int!) {
    engagement(id: $engagementId) {
      id
      createdAt
      updatedAt
      title
      description
      startTime
      endTime
      viewConfig
      viewData
      status
      order
    }
  }
`;
