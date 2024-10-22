import { gql } from "@apollo/client";

export const adminDeleteEngagement = gql`
  mutation adminDeleteEngagement($id: Int!) {
    deleteEngagement(engagementId: $id) {
      ...AdminEngagement
    }
  }
`;
