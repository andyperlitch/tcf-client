import { gql } from "@apollo/client";

gql`
  fragment Song on Song {
    id
    title
    artist
    tempo
    lyrics
    feel
    fileUrl
    spotifyUrl
    youtubeUrl
    coverArtUrl
    duration
    key
    practicePriority
    chartUrl
    leadSheetUrl
    leadSheetEditUrl
    leadSheetId
  }
`;
