import { gql } from "@apollo/client";

gql`
  fragment ScreenElement on ScreenElement {
    id
    type
    name
    imageUrl
    defaultStyles
    engagementStyles
    defaultClassNames
    engagementClassNames
    text
    fontFamily
    linkHref
    areaId
  }
`;
