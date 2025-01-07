import { gql } from "@apollo/client";

gql`
  fragment EventFanConfig on EventFanConfig {
    backgroundImage
    fontFamily
    elements {
      ...ScreenElement
    }
  }
`;
