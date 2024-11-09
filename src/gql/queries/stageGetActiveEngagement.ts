import { gql } from "@apollo/client";

gql`
  query stageGetActiveEngagement($eventSlug: String!) {
    activeEventEngagement(eventSlug: $eventSlug) {
      ...StageEngagement
    }
  }
`;
