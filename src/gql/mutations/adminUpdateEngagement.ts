import { gql } from "@apollo/client";

gql`
  mutation adminUpdateEngagement($id: Int!, $data: UpdateEngagementInput!) {
    updateEngagement(engagementId: $id, data: $data) {
      ...AdminEngagement
    }
  }
`;
