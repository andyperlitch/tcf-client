import { gql } from "@apollo/client";

gql`
  fragment StageReaction on Reaction {
    id
    type
    createdAt
  }
`;
