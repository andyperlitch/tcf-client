import { gql } from "@apollo/client";

export const activeEngagementChanged = gql`
  subscription OnActiveEngagementChanged($eventSlug: String!) {
    activeEngagementChanged(eventSlug: $eventSlug) {
      ...StageEngagement
    }
  }
`;
