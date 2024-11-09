import { gql } from "@apollo/client";

gql`
  mutation adminGenerateImage($data: GenerateImageInput!) {
    adminGenerateImage(data: $data) {
      uri
      error
    }
  }
`;
