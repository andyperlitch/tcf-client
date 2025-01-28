import { gql } from "@apollo/client";

gql`
  query bandSongs {
    songs {
      ...Song
    }
  }
`;

gql`
  query bandSong($id: Int!) {
    song(id: $id) {
      ...Song
    }
  }
`;

gql`
  query bandSongWithLeadSheet($id: Int!) {
    song(id: $id) {
      ...Song
      leadSheet {
        ...LeadSheet
      }
    }
  }
`;

gql`
  query uploads {
    uploads {
      ...Upload
    }
  }
`;

gql`
  query upload($id: Int!) {
    upload(id: $id) {
      ...Upload
    }
  }
`;
