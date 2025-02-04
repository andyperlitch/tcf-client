import { gql } from "@apollo/client";

gql`
  subscription onCurrentGigSongIdOrBreakChanged($gigId: Int!) {
    currentGigSongIdOrBreakChanged(gigId: $gigId) {
      ...Gig
    }
  }
`;
