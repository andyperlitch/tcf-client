import { gql } from "@apollo/client";

export const stageGetEvent = gql`
  query stageGetEvent($slug: String!) {
    event(slug: $slug) {
      ...StageEvent
    }
  }
`;
