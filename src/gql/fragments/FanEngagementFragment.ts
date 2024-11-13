import { gql } from "@apollo/client";

gql`
  fragment FanEngagement on Engagement {
    id
    createdAt
    updatedAt
    title
    description
    startTime
    endTime
    viewConfig {
      ...PhotoCarouselViewConfigFields
      ...VoteForViewConfigFields
    }
    viewData {
      ...PhotoCarouselViewDataFields
      ...VoteForViewDataFields
    }
    type
    order
    submissions {
      ...FanSubmission
    }
  }
`;
