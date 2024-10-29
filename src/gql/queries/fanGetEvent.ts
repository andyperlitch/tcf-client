import { gql } from "@apollo/client";

export const fanGetEvent = gql`
  query fanGetEvent($slug: String!) {
    event(slug: $slug) {
      ...FanEvent
    }
  }
`;
