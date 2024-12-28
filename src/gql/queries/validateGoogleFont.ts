import { gql } from "@apollo/client";

gql`
  query validateGoogleFont($fontName: String!) {
    validateGoogleFont(fontName: $fontName)
  }
`;
