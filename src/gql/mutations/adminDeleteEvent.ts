import { gql } from "@apollo/client";

gql`
  mutation adminDeleteEvent($id: Int!) {
    deleteEvent(eventId: $id) {
      ...AdminEvent
    }
  }
`;
