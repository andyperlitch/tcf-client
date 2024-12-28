import { gql } from "@apollo/client";

gql`
  fragment EventStageConfig on EventStageConfig {
    qrForegroundColor
    qrBackgroundColor
    qrTextColor
    qrWrapperBackgroundColor
    backgroundImage
    headingFontFamily
    bodyFontFamily
    elements {
      ...StageElement
    }
  }
`;
