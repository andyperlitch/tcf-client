import { gql } from "@apollo/client";

export const stageGetEvents = gql`
  query stageGetEvents {
    events {
      ...StageEvent
    }
  }
`;
