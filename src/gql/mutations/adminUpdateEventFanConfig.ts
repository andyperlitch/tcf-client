import { gql } from "@apollo/client";

gql`
  mutation adminUpdateEventFanConfig(
    $id: Int!
    $data: UpdateEventFanConfigInput!
  ) {
    updateEventFanConfig(eventId: $id, data: $data) {
      ...EventFanConfig
    }
  }
`;
