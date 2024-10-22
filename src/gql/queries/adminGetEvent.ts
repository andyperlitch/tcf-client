import { gql } from "@apollo/client";

export const adminGetEvent = gql`
  query adminGetEvent($slug: String!) {
    event(slug: $slug) {
      ...AdminEvent
    }
  }
`;
