import { gql } from "@apollo/client";

gql`
  fragment GigSong on GigSong {
    id
    song {
      id
      title
      artist
      leadSheetId
    }
    order
  }
  fragment DetailedGigSong on GigSong {
    id
    song {
      ...Song
      leadSheet {
        ...LeadSheet
      }
    }
    setId
    order
  }

  fragment GigSet on GigSet {
    id
    name
    songs {
      ...GigSong
    }
  }

  fragment BasicGig on Gig {
    id
    name
    date
    createdAt
    updatedAt
    eventId
    nowPlayingEngagementId
    currentGigSongIdOrBreak
  }

  fragment Gig on Gig {
    id
    name
    date
    createdAt
    updatedAt
    eventId
    nowPlayingEngagementId
    currentGigSongIdOrBreak
    gigLeaderId
    currentGigSong {
      ...GigSong
    }
    sets {
      ...GigSet
    }
  }

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

gql`
  fragment LeadSheet on LeadSheet {
    id
    sections {
      ...LeadSheetSection
    }
  }
`;

gql`
  fragment LeadSheetSection on LeadSheetSection {
    id
    name
    order
    timeCode
    barLength
    details {
      ...LeadSheetDetail
    }
    lyricHint
    lyrics
  }
`;

gql`
  fragment LeadSheetDetail on LeadSheetDetail {
    id
    type
    content
  }
`;

gql`
  fragment Upload on Upload {
    id
    key
    fileName
    fileType
    fileSize
    uploadId
    uploader {
      id
      name
      username
      email
    }
    parts {
      partNumber
      eTag
    }
    status
    createdAt
    updatedAt
  }
`;
