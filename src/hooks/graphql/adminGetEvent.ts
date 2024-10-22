import { gql } from "@apollo/client";

export const adminGetEvent = gql`
  query adminGetEvent($slug: String!) {
    event(slug: $slug) {
      id
      name
      location
      date
      description
      live
      slug
      createdAt
      updatedAt
      engagements {
        id
        description
        viewData
        viewConfig
        startTime
        endTime
      }
    }
  }
`;
