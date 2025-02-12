import { gql } from "@apollo/client";

gql`
  fragment NowPlayingAdminConfigFields on NowPlayingAdminConfig {
    visualizationType
    allowComments
    allowedReactions
  }
  fragment NowPlayingViewConfigFields on NowPlayingViewConfig {
    visualizationType
    allowComments
    allowedReactions
  }
  fragment NowPlayingAdminDataFields on NowPlayingAdminData {
    currentSong
  }
  fragment NowPlayingViewDataFields on NowPlayingViewData {
    currentSong
  }
  fragment NowPlayingSubmissionFields on NowPlayingSubmissionData {
    order
    songAlbumArt
    songTitle
    songArtist
    songNotes
    songLyrics
    visualizationType
    spotifyUrl
  }
`;
