import { gql } from "@apollo/client";

gql`
  fragment FanReaction on Reaction {
    id
    type
    createdAt
  }
`;
