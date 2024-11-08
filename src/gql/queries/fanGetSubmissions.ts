import { gql } from "@apollo/client";

gql`
  query fanGetSubmissions($engagementId: Int!) {
    submissions(engagementId: $engagementId) {
      ...FanSubmission
    }
  }
`;
