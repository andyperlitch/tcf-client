import { gql } from "@apollo/client";

gql`
  fragment StageElement on StageElement {
    id
    type
    name
    imageUrl
    defaultStyles
    engagementStyles
    defaultClassNames
    engagementClassNames
    text
  }
`;
