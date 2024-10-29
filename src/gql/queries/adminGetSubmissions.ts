import { gql } from "@apollo/client";

gql`
  query adminGetSubmissions($engagementId: Int!) {
    submissions(engagementId: $engagementId) {
      ...AdminSubmission
    }
  }
`;
