import { gql } from "@apollo/client";

gql`
  query bandSongs {
    songs {
      ...Song
    }
  }
`;
