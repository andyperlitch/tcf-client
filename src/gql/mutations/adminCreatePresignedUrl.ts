import { gql } from "@apollo/client";

gql`
  mutation adminCreatePresignedUrl($mimeType: String!) {
    adminCreatePresignedUrl(mimeType: $mimeType) {
      url
      key
    }
  }
`;
