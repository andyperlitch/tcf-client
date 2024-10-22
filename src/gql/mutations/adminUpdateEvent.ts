import { gql } from "@apollo/client";

export const adminUpdateEvent = gql`
  mutation adminUpdateEvent($id: Int!, $data: UpdateEventInput!) {
    updateEvent(eventId: $id, data: $data) {
      ...AdminEvent
    }
  }
`;
