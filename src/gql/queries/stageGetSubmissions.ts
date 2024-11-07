import { gql } from "@apollo/client";

gql`
  query stageGetSubmissions($engagementId: Int!) {
    submissions(engagementId: $engagementId) {
      ...StageSubmission
    }
  }
`;
