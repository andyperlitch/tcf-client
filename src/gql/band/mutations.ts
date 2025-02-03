import { gql } from "@apollo/client";

gql`
  mutation bandCreateGig($data: CreateGigInput!) {
    # Gig!
    createGig(data: $data) {
      ...Gig
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
      ...Song
    }
  }
`;
gql`
  mutation bandUpdateSong($songId: Int!, $data: UpdateSongInput!) {
    # Song!
    updateSong(songId: $songId, data: $data) {
      ...Song
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
      ...LeadSheet
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
      ...LeadSheet
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
      ...LeadSheetSection
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
      ...LeadSheetSection
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

gql`
  mutation StartMultipartUpload(
    $fileName: String!
    $fileType: String!
    $fileSize: Int!
  ) {
    startMultipartUpload(
      fileName: $fileName
      fileType: $fileType
      fileSize: $fileSize
    ) {
      uploadId
      key
    }
  }
`;

gql`
  mutation GetPresignedUrls($uploadId: ID!, $key: String!, $parts: Int!) {
    getPresignedUrls(uploadId: $uploadId, key: $key, parts: $parts)
  }
`;

gql`
  mutation CompleteMultipartUpload(
    $uploadId: ID!
    $key: String!
    $parts: [UploadPartInput!]!
  ) {
    completeMultipartUpload(uploadId: $uploadId, key: $key, parts: $parts) {
      ...Upload
    }
  }
`;

gql`
  mutation DeleteUpload($id: Int!) {
    deleteUpload(id: $id) {
      id
    }
  }
`;
