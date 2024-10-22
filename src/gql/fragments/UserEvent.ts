import { gql } from "@apollo/client";

export const UserEvent = gql`
  fragment UserEvent on Event {
    id
    name
    live
    description
    date
    location
  }
`;
