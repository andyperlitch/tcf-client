import { gql } from "@apollo/client";

gql`
  mutation adminCreateEvent($input: CreateEventInput!) {
    createEvent(data: $input) {
      ...AdminEvent
    }
  }
`;
