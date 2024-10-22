import { gql } from "@apollo/client";

export const adminGetEvents = gql`
  query adminGetEvents {
    events {
      ...AdminEvent
    }
  }
`;
