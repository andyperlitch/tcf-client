import { gql } from "@apollo/client";

export const adminCreateEvent = gql`
  mutation adminCreateEvent($input: CreateEventInput!) {
    createEvent(data: $input) {
      ...AdminEvent
    }
  }
`;
