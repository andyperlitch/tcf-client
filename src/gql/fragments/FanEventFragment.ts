import { gql } from "@apollo/client";

export const FanEventFragment = gql`
  fragment FanEventFragment on Event {
    id
    name
    live
    description
    date
    location
    activeEngagement {
      ...StageEngagement
    }
  }
`;
