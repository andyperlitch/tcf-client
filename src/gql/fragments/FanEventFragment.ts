import { gql } from "@apollo/client";

gql`
  fragment FanEvent on Event {
    id
    name
    live
    description
    date
    location
    slug
    fanConfig {
      ...EventFanConfig
    }
    activeEngagement {
      ...FanEngagement
    }
  }
`;
