import { gql } from "@apollo/client";

export const StageEvent = gql`
  fragment StageEvent on Event {
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
