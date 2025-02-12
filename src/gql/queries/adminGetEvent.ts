import { gql } from "@apollo/client";

gql`
  query adminGetEvent($slug: String!) {
    event(slug: $slug) {
      ...AdminEvent
    }
  }
  query adminGetEventById($id: Int!) {
    eventById(id: $id) {
      ...AdminEvent
    }
  }
`;
