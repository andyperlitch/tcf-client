import { gql } from "@apollo/client";

gql`
  mutation adminDeleteEngagement($id: Int!) {
    deleteEngagement(engagementId: $id) {
      ...AdminEngagement
    }
  }
`;
