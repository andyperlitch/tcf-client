import { gql } from "@apollo/client";

gql`
  query adminGetEvents {
    events {
      ...AdminEvent
    }
  }
`;
