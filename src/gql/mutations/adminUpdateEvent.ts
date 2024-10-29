import { gql } from "@apollo/client";

gql`
  mutation adminUpdateEvent($id: Int!, $data: UpdateEventInput!) {
    updateEvent(eventId: $id, data: $data) {
      ...AdminEvent
    }
  }
`;
