import { gql } from "@apollo/client";

gql`
  mutation bandCreateGig($data: CreateGigInput!) {
    # Gig!
    createGig(data: $data) {
      id
    }
  }
`;
gql`
  mutation bandUpdateGig($gigId: Int!, $data: UpdateGigInput!) {
    # Gig!
    updateGig(gigId: $gigId, data: $data) {
      id
    }
  }
`;
gql`
  mutation bandDeleteGig($gigId: Int!) {
    # Gig!
    deleteGig(gigId: $gigId) {
      id
    }
  }
`;
gql`
  mutation bandCreateGigSet($gigId: Int!, $data: CreateGigSetInput!) {
    # GigSet!
    createGigSet(gigId: $gigId, data: $data) {
      id
    }
  }
`;
gql`
  mutation bandUpdateGigSet($gigSetId: Int!, $data: UpdateGigSetInput!) {
    # GigSet!
    updateGigSet(gigSetId: $gigSetId, data: $data) {
      id
    }
  }
`;
gql`
  mutation bandDeleteGigSet($gigSetId: Int!) {
    # GigSet!
    deleteGigSet(gigSetId: $gigSetId) {
      id
    }
  }
`;
gql`
  mutation bandCreateGigSong($gigSetId: Int!, $data: CreateGigSongInput!) {
    # GigSong!
    createGigSong(gigSetId: $gigSetId, data: $data) {
      id
    }
  }
`;
gql`
  mutation bandDeleteGigSong($gigSongId: Int!) {
    # GigSong!
    deleteGigSong(gigSongId: $gigSongId) {
      id
    }
  }
`;
gql`
  mutation bandUpdateCurrentGigSong($gigId: Int!, $gigSongId: Int) {
    # Gig!
    updateCurrentGigSong(gigId: $gigId, gigSongId: $gigSongId) {
      id
    }
  }
`;
gql`
  mutation bandSyncSongsFromGoogleSheets(
    $input: SyncSongsFromGoogleSheetsInput!
  ) {
    # [Song!]!
    syncSongsFromGoogleSheets(input: $input) {
      ...Song
    }
  }
`;
gql`
  mutation bandCreateSong($data: CreateSongInput!) {
    # Song!
    createSong(data: $data) {
      id
    }
  }
`;
gql`
  mutation bandUpdateSong($songId: Int!, $data: UpdateSongInput!) {
    # Song!
    updateSong(songId: $songId, data: $data) {
      id
    }
  }
`;
gql`
  mutation bandDeleteSong($songId: Int!) {
    # Song!
    deleteSong(songId: $songId) {
      id
    }
  }
`;
gql`
  mutation bandCreateLeadSheet($songId: Int!) {
    # LeadSheet!
    createLeadSheet(songId: $songId) {
      id
    }
  }
`;
gql`
  mutation bandUpdateLeadSheet(
    $leadSheetId: Int!
    $data: UpdateLeadSheetInput!
  ) {
    # LeadSheet!
    updateLeadSheet(leadSheetId: $leadSheetId, data: $data) {
      id
    }
  }
`;
gql`
  mutation bandDeleteLeadSheet($leadSheetId: Int!) {
    # LeadSheet!
    deleteLeadSheet(leadSheetId: $leadSheetId) {
      id
    }
  }
`;
gql`
  mutation bandCreateLeadSheetSection(
    $leadSheetId: Int!
    $data: CreateLeadSheetSectionInput!
  ) {
    # LeadSheetSection!
    createLeadSheetSection(leadSheetId: $leadSheetId, data: $data) {
      id
    }
  }
`;
gql`
  mutation bandUpdateLeadSheetSection(
    $leadSheetSectionId: Int!
    $data: UpdateLeadSheetSectionInput!
  ) {
    # LeadSheetSection!
    updateLeadSheetSection(
      leadSheetSectionId: $leadSheetSectionId
      data: $data
    ) {
      id
    }
  }
`;
gql`
  mutation bandDeleteLeadSheetSection($leadSheetSectionId: Int!) {
    # LeadSheetSection!
    deleteLeadSheetSection(leadSheetSectionId: $leadSheetSectionId) {
      id
    }
  }
`;
