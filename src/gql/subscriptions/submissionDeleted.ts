import { gql } from "@apollo/client";

export const submissionDeleted = gql`
  subscription OnSubmissionDeleted($engagementId: Int!) {
    submissionDeleted(engagementId: $engagementId) {
      submissionId
    }
  }
`;
