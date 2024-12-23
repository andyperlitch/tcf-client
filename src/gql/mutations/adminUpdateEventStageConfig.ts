import { gql } from "@apollo/client";

gql`
  mutation adminUpdateEventStageConfig(
    $id: Int!
    $data: UpdateEventStageConfigInput!
  ) {
    updateEventStageConfig(eventId: $id, data: $data) {
      ...EventStageConfig
    }
  }
`;
