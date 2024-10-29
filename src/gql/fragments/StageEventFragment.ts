import { gql } from "@apollo/client";

gql`
  fragment StageEvent on Event {
    id
    name
    live
    slug
    description
    date
    location
    activeEngagement {
      ...StageEngagement
    }
  }
`;
