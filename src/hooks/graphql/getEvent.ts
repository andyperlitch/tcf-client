import { gql } from "@apollo/client";

export const getEvent = gql`
  query getEvent($slug: String!) {
    event(slug: $slug) {
      id
      name
      live
      description
      date
      location
    }
  }
`;
