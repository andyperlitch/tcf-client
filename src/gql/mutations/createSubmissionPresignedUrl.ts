import { gql } from "@apollo/client";

gql`
  mutation CreateSubmissionPresignedUrl(
    $engagementId: Int!
    $mimeType: String!
  ) {
    createSubmissionPresignedUrl(
      engagementId: $engagementId
      mimeType: $mimeType
    ) {
      url
      key
    }
  }
`;
