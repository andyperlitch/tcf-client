import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Json: { input: any; output: any; }
};

export type CreateEngagementInput = {
  config?: InputMaybe<Scalars['Json']['input']>;
  data?: InputMaybe<Scalars['Json']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  qrCodeCta?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
  type: EngagementType;
};

export type CreateEventInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  live?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateGigInput = {
  date: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
};

export type CreateGigSetInput = {
  name: Scalars['String']['input'];
};

export type CreateGigSongInput = {
  songId: Scalars['Int']['input'];
};

export type CreateLeadSheetSectionInput = {
  barLength?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Array<LeadSheetDetailInput>>;
  lyricHint?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  timeCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateReactionInput = {
  type: Scalars['String']['input'];
};

export type CreateSongInput = {
  artist?: InputMaybe<Scalars['String']['input']>;
  chartUrl?: InputMaybe<Scalars['String']['input']>;
  coverArtUrl?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  feel?: InputMaybe<Scalars['String']['input']>;
  fileUrl?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  leadSheetEditUrl?: InputMaybe<Scalars['String']['input']>;
  leadSheetId?: InputMaybe<Scalars['Int']['input']>;
  leadSheetUrl?: InputMaybe<Scalars['String']['input']>;
  lyrics?: InputMaybe<Scalars['String']['input']>;
  practicePriority?: InputMaybe<Scalars['String']['input']>;
  spotifyUrl?: InputMaybe<Scalars['String']['input']>;
  tempo?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateSubmissionInput = {
  data: Scalars['Json']['input'];
};

export type CurrentGigSongChangedPayload = {
  __typename?: 'CurrentGigSongChangedPayload';
  gigSongId: Scalars['Int']['output'];
};

export type Engagement = {
  __typename?: 'Engagement';
  config?: Maybe<EngagementAdminConfig>;
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<EngagementAdminData>;
  description?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  qrCodeCta?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  submissions: Array<Submission>;
  title: Scalars['String']['output'];
  type: EngagementType;
  updatedAt: Scalars['DateTime']['output'];
  viewConfig: EngagementViewConfig;
  viewData: EngagementViewData;
};

export type EngagementAdminConfig = NowPlayingAdminConfig | PhotoCarouselAdminConfig | SlidesAdminConfig | VoteForAdminConfig;

export type EngagementAdminData = NowPlayingAdminData | PhotoCarouselAdminData | SlidesAdminData | VoteForAdminData;

export type EngagementSubmissionData = NowPlayingSubmissionData | PhotoCarouselSubmissionData | SlidesSubmissionData | VoteForSubmissionData;

export enum EngagementType {
  NowPlaying = 'NOW_PLAYING',
  PhotoCarousel = 'PHOTO_CAROUSEL',
  Slides = 'SLIDES',
  VoteFor = 'VOTE_FOR'
}

export type EngagementViewConfig = NowPlayingViewConfig | PhotoCarouselViewConfig | SlidesViewConfig | VoteForViewConfig;

export type EngagementViewData = NowPlayingViewData | PhotoCarouselViewData | SlidesViewData | VoteForViewData;

export type EngagementViewDataChangedPayload = {
  __typename?: 'EngagementViewDataChangedPayload';
  viewData: EngagementViewData;
};

export type Event = {
  __typename?: 'Event';
  activeEngagement?: Maybe<Engagement>;
  activeEngagementId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  date?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  engagements: Array<Engagement>;
  fanConfig?: Maybe<EventFanConfig>;
  id: Scalars['Int']['output'];
  live: Scalars['Boolean']['output'];
  location?: Maybe<Scalars['String']['output']>;
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  stageConfig?: Maybe<EventStageConfig>;
  updatedAt: Scalars['DateTime']['output'];
};

export type EventFanConfig = {
  __typename?: 'EventFanConfig';
  backgroundImage?: Maybe<Scalars['String']['output']>;
  elements?: Maybe<Array<ScreenElement>>;
  fontFamily?: Maybe<Array<Scalars['String']['output']>>;
};

export type EventStageConfig = {
  __typename?: 'EventStageConfig';
  backgroundImage?: Maybe<Scalars['String']['output']>;
  elements?: Maybe<Array<ScreenElement>>;
  fontFamily?: Maybe<Array<Scalars['String']['output']>>;
  qrBackgroundColor?: Maybe<Scalars['String']['output']>;
  qrForegroundColor?: Maybe<Scalars['String']['output']>;
  qrTextColor?: Maybe<Scalars['String']['output']>;
  qrWrapperBackgroundColor?: Maybe<Scalars['String']['output']>;
};

export type GenerateImageInput = {
  prompt: Scalars['String']['input'];
  size: Scalars['String']['input'];
};

export type GenerateImageResponse = {
  __typename?: 'GenerateImageResponse';
  error?: Maybe<Scalars['String']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export type Gig = {
  __typename?: 'Gig';
  createdAt: Scalars['DateTime']['output'];
  currentGigSong?: Maybe<GigSong>;
  currentGigSongId?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  nowPlayingEngagementId?: Maybe<Scalars['Int']['output']>;
  sets: Array<GigSet>;
  updatedAt: Scalars['DateTime']['output'];
};

export type GigSet = {
  __typename?: 'GigSet';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  songs: Array<GigSong>;
};

export type GigSong = {
  __typename?: 'GigSong';
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  setId: Scalars['Int']['output'];
  song?: Maybe<Song>;
  songId: Scalars['Int']['output'];
};

export type LeadSheet = {
  __typename?: 'LeadSheet';
  id: Scalars['Int']['output'];
  sections: Array<LeadSheetSection>;
};

export type LeadSheetDetail = {
  __typename?: 'LeadSheetDetail';
  content: Scalars['String']['output'];
  id: Scalars['String']['output'];
  type: LeadSheetDetailType;
};

export type LeadSheetDetailInput = {
  content: Scalars['String']['input'];
  id: Scalars['String']['input'];
  type: LeadSheetDetailType;
};

export enum LeadSheetDetailType {
  Chords = 'CHORDS',
  Image = 'IMAGE',
  Text = 'TEXT'
}

export type LeadSheetSection = {
  __typename?: 'LeadSheetSection';
  barLength?: Maybe<Scalars['String']['output']>;
  details: Array<LeadSheetDetail>;
  id: Scalars['Int']['output'];
  lyricHint?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  timeCode?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  adminCreatePresignedUrl: PresignedUrlResponse;
  adminDeleteFromS3: Scalars['Boolean']['output'];
  adminGenerateImage: GenerateImageResponse;
  changeEventActiveEngagement: Event;
  completeMultipartUpload: Upload;
  createEngagement: Engagement;
  createEvent: Event;
  createGig: Gig;
  createGigSet: GigSet;
  createGigSong: GigSong;
  createLeadSheet: LeadSheet;
  createLeadSheetSection: LeadSheetSection;
  createReaction: Reaction;
  createSong: Song;
  createSubmission: Submission;
  createSubmissionPresignedUrl: PresignedUrlResponse;
  deleteEngagement: Engagement;
  deleteEvent: Event;
  deleteGig: Gig;
  deleteGigSet: GigSet;
  deleteGigSong: GigSong;
  deleteLeadSheet: LeadSheet;
  deleteLeadSheetSection: LeadSheetSection;
  deleteReaction: Reaction;
  deleteSong: Song;
  deleteSubmission: Submission;
  deleteUpload: Upload;
  getPresignedUrls: Array<Scalars['String']['output']>;
  login?: Maybe<User>;
  moveEngagement: Array<Engagement>;
  signup: User;
  startMultipartUpload: Upload;
  syncSongsFromGoogleSheets: Array<Song>;
  updateCurrentGigSong: Gig;
  updateEngagement: Engagement;
  updateEvent: Event;
  updateEventFanConfig: EventFanConfig;
  updateEventStageConfig: EventStageConfig;
  updateGig: Gig;
  updateGigSet: GigSet;
  updateLeadSheet: LeadSheet;
  updateLeadSheetSection: LeadSheetSection;
  updateReaction: Reaction;
  updateSong: Song;
  updateSubmission: Submission;
};


export type MutationAdminCreatePresignedUrlArgs = {
  mimeType: Scalars['String']['input'];
};


export type MutationAdminDeleteFromS3Args = {
  key: Scalars['String']['input'];
};


export type MutationAdminGenerateImageArgs = {
  data: GenerateImageInput;
};


export type MutationChangeEventActiveEngagementArgs = {
  engagementId?: InputMaybe<Scalars['Int']['input']>;
  eventId: Scalars['Int']['input'];
};


export type MutationCompleteMultipartUploadArgs = {
  key: Scalars['String']['input'];
  parts: Array<UploadPartInput>;
  uploadId: Scalars['ID']['input'];
};


export type MutationCreateEngagementArgs = {
  data: CreateEngagementInput;
  eventId: Scalars['Int']['input'];
};


export type MutationCreateEventArgs = {
  data?: InputMaybe<CreateEventInput>;
};


export type MutationCreateGigArgs = {
  data: CreateGigInput;
};


export type MutationCreateGigSetArgs = {
  data: CreateGigSetInput;
  gigId: Scalars['Int']['input'];
};


export type MutationCreateGigSongArgs = {
  data: CreateGigSongInput;
  gigSetId: Scalars['Int']['input'];
};


export type MutationCreateLeadSheetArgs = {
  songId: Scalars['Int']['input'];
};


export type MutationCreateLeadSheetSectionArgs = {
  data: CreateLeadSheetSectionInput;
  leadSheetId: Scalars['Int']['input'];
};


export type MutationCreateReactionArgs = {
  submissionId: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};


export type MutationCreateSongArgs = {
  data: CreateSongInput;
};


export type MutationCreateSubmissionArgs = {
  data: Scalars['Json']['input'];
  engagementId: Scalars['Int']['input'];
};


export type MutationCreateSubmissionPresignedUrlArgs = {
  engagementId: Scalars['Int']['input'];
  mimeType: Scalars['String']['input'];
};


export type MutationDeleteEngagementArgs = {
  engagementId: Scalars['Int']['input'];
};


export type MutationDeleteEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type MutationDeleteGigArgs = {
  gigId: Scalars['Int']['input'];
};


export type MutationDeleteGigSetArgs = {
  gigSetId: Scalars['Int']['input'];
};


export type MutationDeleteGigSongArgs = {
  gigSongId: Scalars['Int']['input'];
};


export type MutationDeleteLeadSheetArgs = {
  leadSheetId: Scalars['Int']['input'];
};


export type MutationDeleteLeadSheetSectionArgs = {
  leadSheetSectionId: Scalars['Int']['input'];
};


export type MutationDeleteReactionArgs = {
  reactionId: Scalars['Int']['input'];
};


export type MutationDeleteSongArgs = {
  songId: Scalars['Int']['input'];
};


export type MutationDeleteSubmissionArgs = {
  submissionId: Scalars['Int']['input'];
};


export type MutationDeleteUploadArgs = {
  id: Scalars['Int']['input'];
};


export type MutationGetPresignedUrlsArgs = {
  key: Scalars['String']['input'];
  parts: Scalars['Int']['input'];
  uploadId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  emailOrUsername: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationMoveEngagementArgs = {
  direction: Scalars['String']['input'];
  engagementId: Scalars['Int']['input'];
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationStartMultipartUploadArgs = {
  fileName: Scalars['String']['input'];
  fileSize: Scalars['Int']['input'];
  fileType: Scalars['String']['input'];
};


export type MutationSyncSongsFromGoogleSheetsArgs = {
  input: SyncSongsFromGoogleSheetsInput;
};


export type MutationUpdateCurrentGigSongArgs = {
  gigId: Scalars['Int']['input'];
  gigSongId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateEngagementArgs = {
  data: UpdateEngagementInput;
  engagementId: Scalars['Int']['input'];
};


export type MutationUpdateEventArgs = {
  data?: InputMaybe<UpdateEventInput>;
  eventId: Scalars['Int']['input'];
};


export type MutationUpdateEventFanConfigArgs = {
  data?: InputMaybe<UpdateEventFanConfigInput>;
  eventId: Scalars['Int']['input'];
};


export type MutationUpdateEventStageConfigArgs = {
  data?: InputMaybe<UpdateEventStageConfigInput>;
  eventId: Scalars['Int']['input'];
};


export type MutationUpdateGigArgs = {
  data: UpdateGigInput;
  gigId: Scalars['Int']['input'];
};


export type MutationUpdateGigSetArgs = {
  data: UpdateGigSetInput;
  gigSetId: Scalars['Int']['input'];
};


export type MutationUpdateLeadSheetArgs = {
  data: UpdateLeadSheetInput;
  leadSheetId: Scalars['Int']['input'];
};


export type MutationUpdateLeadSheetSectionArgs = {
  data: UpdateLeadSheetSectionInput;
  leadSheetSectionId: Scalars['Int']['input'];
};


export type MutationUpdateReactionArgs = {
  reactionId: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};


export type MutationUpdateSongArgs = {
  data: UpdateSongInput;
  songId: Scalars['Int']['input'];
};


export type MutationUpdateSubmissionArgs = {
  data: Scalars['Json']['input'];
  submissionId: Scalars['Int']['input'];
};

export type NowPlayingAdminConfig = {
  __typename?: 'NowPlayingAdminConfig';
  /** Whether to allow comments on the now playing engagement. */
  allowComments: Scalars['Boolean']['output'];
  /** The types of reactions that are allowed on the now playing engagement. */
  allowedReactions: Array<Scalars['String']['output']>;
  /**
   * The default type of visualization to use for this now playing engagement.
   *
   * Supported values: "default"
   */
  visualizationType: Scalars['String']['output'];
};

export type NowPlayingAdminData = {
  __typename?: 'NowPlayingAdminData';
  /** The id of the current song (submission) in the list of songs */
  currentSong?: Maybe<Scalars['Int']['output']>;
};

export type NowPlayingSubmissionData = {
  __typename?: 'NowPlayingSubmissionData';
  /** The order of the slide in the slideshow. */
  order: Scalars['Int']['output'];
  /** The url of the photo to display on the slide. */
  songAlbumArt?: Maybe<Scalars['String']['output']>;
  /** The artist of the song. */
  songArtist?: Maybe<Scalars['String']['output']>;
  /** The lyrics of the song that are displayed on the slide. Not recommended to be more than a few lines. */
  songLyrics?: Maybe<Scalars['String']['output']>;
  /** The notes of the song. */
  songNotes?: Maybe<Scalars['String']['output']>;
  /** The title of the song. */
  songTitle?: Maybe<Scalars['String']['output']>;
  /** Optional override for the visualization type. */
  visualizationType?: Maybe<Scalars['String']['output']>;
};

export type NowPlayingViewConfig = {
  __typename?: 'NowPlayingViewConfig';
  /** Whether to allow comments on the now playing engagement. */
  allowComments: Scalars['Boolean']['output'];
  /** The types of reactions that are allowed on the now playing engagement. */
  allowedReactions: Array<Scalars['String']['output']>;
  /** The type of visualization to use for the now playing engagement. */
  visualizationType: Scalars['String']['output'];
};

export type NowPlayingViewData = {
  __typename?: 'NowPlayingViewData';
  /** The id of the current song (submission) in the list of songs */
  currentSong?: Maybe<Scalars['Int']['output']>;
};

/** Full configuration options for the photo carousel engagement */
export type PhotoCarouselAdminConfig = {
  __typename?: 'PhotoCarouselAdminConfig';
  /** Whether to ask the user for permission to use their photo in a social media post. */
  askSharePermission?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The maximum number of submissions a user can make for this engagement.
   * 0 means no limit.
   */
  maxSubmissionsPerUser: Scalars['Int']['output'];
  /** The interval in seconds to poll for new submissions. */
  pollInterval?: Maybe<Scalars['Int']['output']>;
  /** Whether to require approval of submissions by admins before they are visible. */
  requireApproval: Scalars['Boolean']['output'];
  /** The text of the share permission prompt. */
  sharePrompt?: Maybe<Scalars['String']['output']>;
};

/** Data structure for the photo carousel admin view */
export type PhotoCarouselAdminData = {
  __typename?: 'PhotoCarouselAdminData';
  /** The queue of submission ids that have been rejected by admins. */
  rejectedQueue: Array<Scalars['Int']['output']>;
  /** The queue of submission ids that have been seen by the user. */
  seenQueue: Array<Scalars['Int']['output']>;
  /** The pointer to the next submission to be seen. */
  seenQueuePointer: Scalars['Int']['output'];
  /** The queue of submission ids that have not yet been approved by admins. */
  unapprovedQueue: Array<Scalars['Int']['output']>;
  /** The queue of submission ids that have not yet been seen by the user. */
  unseenQueue: Array<Scalars['Int']['output']>;
  /** The id of the submission that is currently visible to the user. */
  visibleSubmission?: Maybe<Scalars['Int']['output']>;
};

/** Data structure for a photo carousel submission */
export type PhotoCarouselSubmissionData = {
  __typename?: 'PhotoCarouselSubmissionData';
  /** Whether the submission has been approved by admins. */
  approved?: Maybe<Scalars['Boolean']['output']>;
  /** The caption of the photo submission. */
  caption: Scalars['String']['output'];
  /** The url of the photo submission. */
  photoUrl: Scalars['String']['output'];
  /** Whether the user has granted permission to use their photo in a social media post. */
  sharingPermissionGranted?: Maybe<Scalars['Boolean']['output']>;
};

/** Configuration options for the photo carousel view */
export type PhotoCarouselViewConfig = {
  __typename?: 'PhotoCarouselViewConfig';
  /** Whether to ask the user for permission to use their photo in a social media post. */
  askSharePermission?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The maximum number of submissions a user can make for this engagement.
   * 0 means no limit.
   */
  maxSubmissionsPerUser: Scalars['Int']['output'];
  /** The text of the share permission prompt. */
  sharePrompt?: Maybe<Scalars['String']['output']>;
};

/** Data structure for the photo carousel view */
export type PhotoCarouselViewData = {
  __typename?: 'PhotoCarouselViewData';
  /** The id of the submission that is currently visible to the user. */
  visibleSubmission?: Maybe<Scalars['Int']['output']>;
};

export type PresignedUrlResponse = {
  __typename?: 'PresignedUrlResponse';
  key: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  activeEventEngagement?: Maybe<Engagement>;
  canCreateSubmission: Scalars['Boolean']['output'];
  engagement?: Maybe<Engagement>;
  engagements: Array<Engagement>;
  event?: Maybe<Event>;
  events: Array<Event>;
  gig?: Maybe<Gig>;
  gigs: Array<Gig>;
  randomName: Scalars['String']['output'];
  song?: Maybe<Song>;
  songs: Array<Song>;
  submission?: Maybe<Submission>;
  submissions: Array<Submission>;
  upload?: Maybe<Upload>;
  uploads: Array<Upload>;
  validateGoogleFont: Scalars['Boolean']['output'];
  whoami?: Maybe<User>;
};


export type QueryActiveEventEngagementArgs = {
  eventSlug: Scalars['String']['input'];
};


export type QueryCanCreateSubmissionArgs = {
  engagementId: Scalars['Int']['input'];
};


export type QueryEngagementArgs = {
  id: Scalars['Int']['input'];
};


export type QueryEngagementsArgs = {
  eventId: Scalars['Int']['input'];
};


export type QueryEventArgs = {
  slug: Scalars['String']['input'];
};


export type QueryGigArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySongArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySubmissionArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySubmissionsArgs = {
  engagementId: Scalars['Int']['input'];
};


export type QueryUploadArgs = {
  id: Scalars['Int']['input'];
};


export type QueryValidateGoogleFontArgs = {
  fontName: Scalars['String']['input'];
};

export type Reaction = {
  __typename?: 'Reaction';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  submissionId: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type ReactionsCreatedPayload = {
  __typename?: 'ReactionsCreatedPayload';
  reactions: Array<Reaction>;
};

export enum Role {
  Admin = 'ADMIN',
  Anon = 'ANON',
  Bandmate = 'BANDMATE'
}

export type ScreenElement = {
  __typename?: 'ScreenElement';
  defaultClassNames?: Maybe<Scalars['String']['output']>;
  defaultStyles?: Maybe<Scalars['Json']['output']>;
  engagementClassNames?: Maybe<Scalars['String']['output']>;
  engagementStyles?: Maybe<Scalars['Json']['output']>;
  fontFamily?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  linkHref?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type ScreenElementInput = {
  defaultClassNames?: InputMaybe<Scalars['String']['input']>;
  defaultStyles?: InputMaybe<Scalars['Json']['input']>;
  engagementClassNames?: InputMaybe<Scalars['String']['input']>;
  engagementStyles?: InputMaybe<Scalars['Json']['input']>;
  fontFamily?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  linkHref?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type SignupInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** Full configuration options for the slides engagement */
export type SlidesAdminConfig = {
  __typename?: 'SlidesAdminConfig';
  autoPlay: Scalars['Boolean']['output'];
};

/** Data structure for the slides admin view */
export type SlidesAdminData = {
  __typename?: 'SlidesAdminData';
  /** The id of the slide that is currently visible to the user. */
  currentSlide: Scalars['Int']['output'];
};

/** Data structure for a slides submission */
export type SlidesSubmissionData = {
  __typename?: 'SlidesSubmissionData';
  /** The content of the slide. */
  content: Scalars['String']['output'];
  /** The url of the photo to display on the slide. */
  optionalImageUrl?: Maybe<Scalars['String']['output']>;
  /** The order of the slide in the slideshow. */
  order: Scalars['Int']['output'];
  /** The title of the slide. */
  title: Scalars['String']['output'];
};

/** Configuration options for the slides engagement */
export type SlidesViewConfig = {
  __typename?: 'SlidesViewConfig';
  autoPlay: Scalars['Boolean']['output'];
};

/** Data structure for the slides view */
export type SlidesViewData = {
  __typename?: 'SlidesViewData';
  /** The id of the slide that is currently visible to the user. */
  currentSlide: Scalars['Int']['output'];
};

export type Song = {
  __typename?: 'Song';
  artist?: Maybe<Scalars['String']['output']>;
  chartUrl?: Maybe<Scalars['String']['output']>;
  coverArtUrl?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  feel?: Maybe<Scalars['String']['output']>;
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  key?: Maybe<Scalars['String']['output']>;
  leadSheet?: Maybe<LeadSheet>;
  leadSheetEditUrl?: Maybe<Scalars['String']['output']>;
  leadSheetId?: Maybe<Scalars['Int']['output']>;
  leadSheetUrl?: Maybe<Scalars['String']['output']>;
  lyrics?: Maybe<Scalars['String']['output']>;
  practicePriority?: Maybe<Scalars['String']['output']>;
  spotifyUrl?: Maybe<Scalars['String']['output']>;
  tempo?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  youtubeUrl?: Maybe<Scalars['String']['output']>;
};

export type Submission = {
  __typename?: 'Submission';
  createdAt: Scalars['DateTime']['output'];
  data: EngagementSubmissionData;
  engagementId: Scalars['Int']['output'];
  hash?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  reactions: Array<Reaction>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type SubmissionCreatedPayload = {
  __typename?: 'SubmissionCreatedPayload';
  submission: Submission;
};

export type SubmissionDeletedPayload = {
  __typename?: 'SubmissionDeletedPayload';
  submissionId: Scalars['Int']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  activeEngagementChanged?: Maybe<Engagement>;
  currentGigSongChanged: CurrentGigSongChangedPayload;
  engagementViewDataChanged?: Maybe<EngagementViewDataChangedPayload>;
  reactionsCreated?: Maybe<ReactionsCreatedPayload>;
  submissionCreated?: Maybe<SubmissionCreatedPayload>;
  submissionDeleted?: Maybe<SubmissionDeletedPayload>;
};


export type SubscriptionActiveEngagementChangedArgs = {
  eventSlug: Scalars['String']['input'];
};


export type SubscriptionCurrentGigSongChangedArgs = {
  gigId: Scalars['String']['input'];
};


export type SubscriptionEngagementViewDataChangedArgs = {
  engagementId: Scalars['Int']['input'];
};


export type SubscriptionReactionsCreatedArgs = {
  submissionId: Scalars['Int']['input'];
};


export type SubscriptionSubmissionCreatedArgs = {
  engagementId: Scalars['Int']['input'];
};


export type SubscriptionSubmissionDeletedArgs = {
  engagementId: Scalars['Int']['input'];
};

export type SyncSongsFromGoogleSheetsInput = {
  spreadsheetId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEngagementInput = {
  config?: InputMaybe<Scalars['Json']['input']>;
  data?: InputMaybe<Scalars['Json']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  qrCodeCta?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEventFanConfigInput = {
  backgroundImage?: InputMaybe<Scalars['String']['input']>;
  elements?: InputMaybe<Array<ScreenElementInput>>;
  fontFamily?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateEventInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  live?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  locked?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEventStageConfigInput = {
  backgroundImage?: InputMaybe<Scalars['String']['input']>;
  elements?: InputMaybe<Array<ScreenElementInput>>;
  fontFamily?: InputMaybe<Array<Scalars['String']['input']>>;
  qrBackgroundColor?: InputMaybe<Scalars['String']['input']>;
  qrForegroundColor?: InputMaybe<Scalars['String']['input']>;
  qrTextColor?: InputMaybe<Scalars['String']['input']>;
  qrWrapperBackgroundColor?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGigInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGigSetInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  setOrder?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateLeadSheetInput = {
  order?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateLeadSheetSectionInput = {
  barLength?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Array<LeadSheetDetailInput>>;
  lyricHint?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  timeCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReactionInput = {
  type: Scalars['String']['input'];
};

export type UpdateSongInput = {
  artist?: InputMaybe<Scalars['String']['input']>;
  chartUrl?: InputMaybe<Scalars['String']['input']>;
  coverArtUrl?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  feel?: InputMaybe<Scalars['String']['input']>;
  fileUrl?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  leadSheetEditUrl?: InputMaybe<Scalars['String']['input']>;
  leadSheetId?: InputMaybe<Scalars['Int']['input']>;
  leadSheetUrl?: InputMaybe<Scalars['String']['input']>;
  lyrics?: InputMaybe<Scalars['String']['input']>;
  practicePriority?: InputMaybe<Scalars['String']['input']>;
  spotifyUrl?: InputMaybe<Scalars['String']['input']>;
  tempo?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSubmissionInput = {
  data: Scalars['Json']['input'];
};

export type Upload = {
  __typename?: 'Upload';
  createdAt: Scalars['DateTime']['output'];
  fileName: Scalars['String']['output'];
  fileSize: Scalars['Int']['output'];
  fileType: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  key: Scalars['String']['output'];
  parts?: Maybe<Array<UploadPart>>;
  status: UploadStatus;
  updatedAt: Scalars['DateTime']['output'];
  uploadId?: Maybe<Scalars['String']['output']>;
  uploader?: Maybe<User>;
  uploaderId?: Maybe<Scalars['Int']['output']>;
};

export type UploadPart = {
  __typename?: 'UploadPart';
  eTag: Scalars['String']['output'];
  partNumber: Scalars['Int']['output'];
};

export type UploadPartInput = {
  eTag: Scalars['String']['input'];
  partNumber: Scalars['Int']['input'];
};

export enum UploadStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS'
}

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role: Role;
  username?: Maybe<Scalars['String']['output']>;
};

export type VoteCount = {
  __typename?: 'VoteCount';
  count: Scalars['Int']['output'];
  submissionId: Scalars['Int']['output'];
};

export type VoteForAdminConfig = {
  __typename?: 'VoteForAdminConfig';
  /** Whether to allow users to submit candidates. */
  allowUserSubmissions: Scalars['Boolean']['output'];
  /**
   * The maximum number of submissions a user can make for this engagement.
   * 0 means no limit.
   */
  maxSubmissionsPerUser: Scalars['Int']['output'];
  /** The number of votes a user can cast for this engagement. */
  votesPerUser: Scalars['Int']['output'];
};

export type VoteForAdminData = {
  __typename?: 'VoteForAdminData';
  endTime?: Maybe<Scalars['DateTime']['output']>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  /** A map of submission id to the number of votes it has received. */
  votes: Array<VoteCount>;
};

export type VoteForSubmissionData = {
  __typename?: 'VoteForSubmissionData';
  /** The color of the candidate. */
  color: Scalars['String']['output'];
  /** The description of the candidate. */
  description: Scalars['String']['output'];
  /** The url of the candidate's photo. */
  optionalImageUrl?: Maybe<Scalars['String']['output']>;
  /** The title of the candidate. */
  title: Scalars['String']['output'];
};

export type VoteForViewConfig = {
  __typename?: 'VoteForViewConfig';
  votesPerUser: Scalars['Int']['output'];
};

export type VoteForViewData = {
  __typename?: 'VoteForViewData';
  endTime?: Maybe<Scalars['DateTime']['output']>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  votes: Array<VoteCount>;
};

export type NowPlayingAdminConfigFieldsFragment = { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> };

export type NowPlayingViewConfigFieldsFragment = { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> };

export type NowPlayingAdminDataFieldsFragment = { __typename?: 'NowPlayingAdminData', currentSong?: number | null };

export type NowPlayingViewDataFieldsFragment = { __typename?: 'NowPlayingViewData', currentSong?: number | null };

export type NowPlayingSubmissionFieldsFragment = { __typename?: 'NowPlayingSubmissionData', order: number, songAlbumArt?: string | null, songTitle?: string | null, songArtist?: string | null, songNotes?: string | null, songLyrics?: string | null, visualizationType?: string | null };

export type PhotoCarouselViewConfigFieldsFragment = { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null };

export type PhotoCarouselViewDataFieldsFragment = { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null };

export type PhotoCarouselSubmissionFieldsFragment = { __typename?: 'PhotoCarouselSubmissionData', photoUrl: string, caption: string, approved?: boolean | null, sharingPermissionGranted?: boolean | null };

export type PhotoCarouselAdminConfigFieldsFragment = { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null };

export type PhotoCarouselAdminDataFieldsFragment = { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> };

export type SlidesViewConfigFieldsFragment = { __typename?: 'SlidesViewConfig', autoPlay: boolean };

export type SlidesViewDataFieldsFragment = { __typename?: 'SlidesViewData', currentSlide: number };

export type SlidesSubmissionFieldsFragment = { __typename?: 'SlidesSubmissionData', optionalImageUrl?: string | null, title: string, content: string, order: number };

export type SlidesAdminConfigFieldsFragment = { __typename?: 'SlidesAdminConfig', autoPlay: boolean };

export type SlidesAdminDataFieldsFragment = { __typename?: 'SlidesAdminData', currentSlide: number };

export type VoteForViewConfigFieldsFragment = { __typename?: 'VoteForViewConfig', votesPerUser: number };

export type VoteForViewDataFieldsFragment = { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> };

export type VoteForSubmissionFieldsFragment = { __typename?: 'VoteForSubmissionData', title: string, color: string, description: string, optionalImageUrl?: string | null };

export type VoteForAdminConfigFieldsFragment = { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number };

export type VoteForAdminDataFieldsFragment = { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> };

export type GigSongFragment = { __typename?: 'GigSong', id: number, order: number, song?: { __typename?: 'Song', id: number, title?: string | null, artist?: string | null } | null };

export type GigSetFragment = { __typename?: 'GigSet', id: number, name: string, songs: Array<{ __typename?: 'GigSong', id: number, order: number, song?: { __typename?: 'Song', id: number, title?: string | null, artist?: string | null } | null }> };

export type GigFragment = { __typename?: 'Gig', id: number, name: string, date?: any | null, createdAt: any, updatedAt: any, eventId?: string | null, nowPlayingEngagementId?: number | null, currentGigSongId?: string | null, currentGigSong?: { __typename?: 'GigSong', id: number, order: number, song?: { __typename?: 'Song', id: number, title?: string | null, artist?: string | null } | null } | null, sets: Array<{ __typename?: 'GigSet', id: number, name: string, songs: Array<{ __typename?: 'GigSong', id: number, order: number, song?: { __typename?: 'Song', id: number, title?: string | null, artist?: string | null } | null }> }> };

export type SongFragment = { __typename?: 'Song', id: number, title?: string | null, artist?: string | null, tempo?: number | null, lyrics?: string | null, feel?: string | null, fileUrl?: string | null, spotifyUrl?: string | null, youtubeUrl?: string | null, coverArtUrl?: string | null, duration?: number | null, key?: string | null, practicePriority?: string | null, chartUrl?: string | null, leadSheetUrl?: string | null, leadSheetEditUrl?: string | null, leadSheetId?: number | null };

export type LeadSheetFragment = { __typename?: 'LeadSheet', id: number, sections: Array<{ __typename?: 'LeadSheetSection', id: number, name: string, order: number, timeCode?: string | null, barLength?: string | null, lyricHint?: string | null, details: Array<{ __typename?: 'LeadSheetDetail', id: string, type: LeadSheetDetailType, content: string }> }> };

export type LeadSheetSectionFragment = { __typename?: 'LeadSheetSection', id: number, name: string, order: number, timeCode?: string | null, barLength?: string | null, lyricHint?: string | null, details: Array<{ __typename?: 'LeadSheetDetail', id: string, type: LeadSheetDetailType, content: string }> };

export type LeadSheetDetailFragment = { __typename?: 'LeadSheetDetail', id: string, type: LeadSheetDetailType, content: string };

export type UploadFragment = { __typename?: 'Upload', id: number, key: string, fileName: string, fileType: string, fileSize: number, uploadId?: string | null, status: UploadStatus, createdAt: any, updatedAt: any, uploader?: { __typename?: 'User', id: number, name?: string | null, username?: string | null, email?: string | null } | null, parts?: Array<{ __typename?: 'UploadPart', partNumber: number, eTag: string }> | null };

export type BandCreateGigMutationVariables = Exact<{
  data: CreateGigInput;
}>;


export type BandCreateGigMutation = { __typename?: 'Mutation', createGig: { __typename?: 'Gig', id: number, name: string, date?: any | null, createdAt: any, updatedAt: any, eventId?: string | null, nowPlayingEngagementId?: number | null, currentGigSongId?: string | null, currentGigSong?: { __typename?: 'GigSong', id: number, order: number, song?: { __typename?: 'Song', id: number, title?: string | null, artist?: string | null } | null } | null, sets: Array<{ __typename?: 'GigSet', id: number, name: string, songs: Array<{ __typename?: 'GigSong', id: number, order: number, song?: { __typename?: 'Song', id: number, title?: string | null, artist?: string | null } | null }> }> } };

export type BandUpdateGigMutationVariables = Exact<{
  gigId: Scalars['Int']['input'];
  data: UpdateGigInput;
}>;


export type BandUpdateGigMutation = { __typename?: 'Mutation', updateGig: { __typename?: 'Gig', id: number } };

export type BandDeleteGigMutationVariables = Exact<{
  gigId: Scalars['Int']['input'];
}>;


export type BandDeleteGigMutation = { __typename?: 'Mutation', deleteGig: { __typename?: 'Gig', id: number } };

export type BandCreateGigSetMutationVariables = Exact<{
  gigId: Scalars['Int']['input'];
  data: CreateGigSetInput;
}>;


export type BandCreateGigSetMutation = { __typename?: 'Mutation', createGigSet: { __typename?: 'GigSet', id: number } };

export type BandUpdateGigSetMutationVariables = Exact<{
  gigSetId: Scalars['Int']['input'];
  data: UpdateGigSetInput;
}>;


export type BandUpdateGigSetMutation = { __typename?: 'Mutation', updateGigSet: { __typename?: 'GigSet', id: number } };

export type BandDeleteGigSetMutationVariables = Exact<{
  gigSetId: Scalars['Int']['input'];
}>;


export type BandDeleteGigSetMutation = { __typename?: 'Mutation', deleteGigSet: { __typename?: 'GigSet', id: number } };

export type BandCreateGigSongMutationVariables = Exact<{
  gigSetId: Scalars['Int']['input'];
  data: CreateGigSongInput;
}>;


export type BandCreateGigSongMutation = { __typename?: 'Mutation', createGigSong: { __typename?: 'GigSong', id: number } };

export type BandDeleteGigSongMutationVariables = Exact<{
  gigSongId: Scalars['Int']['input'];
}>;


export type BandDeleteGigSongMutation = { __typename?: 'Mutation', deleteGigSong: { __typename?: 'GigSong', id: number } };

export type BandUpdateCurrentGigSongMutationVariables = Exact<{
  gigId: Scalars['Int']['input'];
  gigSongId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type BandUpdateCurrentGigSongMutation = { __typename?: 'Mutation', updateCurrentGigSong: { __typename?: 'Gig', id: number } };

export type BandSyncSongsFromGoogleSheetsMutationVariables = Exact<{
  input: SyncSongsFromGoogleSheetsInput;
}>;


export type BandSyncSongsFromGoogleSheetsMutation = { __typename?: 'Mutation', syncSongsFromGoogleSheets: Array<{ __typename?: 'Song', id: number, title?: string | null, artist?: string | null, tempo?: number | null, lyrics?: string | null, feel?: string | null, fileUrl?: string | null, spotifyUrl?: string | null, youtubeUrl?: string | null, coverArtUrl?: string | null, duration?: number | null, key?: string | null, practicePriority?: string | null, chartUrl?: string | null, leadSheetUrl?: string | null, leadSheetEditUrl?: string | null, leadSheetId?: number | null }> };

export type BandCreateSongMutationVariables = Exact<{
  data: CreateSongInput;
}>;


export type BandCreateSongMutation = { __typename?: 'Mutation', createSong: { __typename?: 'Song', id: number } };

export type BandUpdateSongMutationVariables = Exact<{
  songId: Scalars['Int']['input'];
  data: UpdateSongInput;
}>;


export type BandUpdateSongMutation = { __typename?: 'Mutation', updateSong: { __typename?: 'Song', id: number } };

export type BandDeleteSongMutationVariables = Exact<{
  songId: Scalars['Int']['input'];
}>;


export type BandDeleteSongMutation = { __typename?: 'Mutation', deleteSong: { __typename?: 'Song', id: number } };

export type BandCreateLeadSheetMutationVariables = Exact<{
  songId: Scalars['Int']['input'];
}>;


export type BandCreateLeadSheetMutation = { __typename?: 'Mutation', createLeadSheet: { __typename?: 'LeadSheet', id: number } };

export type BandUpdateLeadSheetMutationVariables = Exact<{
  leadSheetId: Scalars['Int']['input'];
  data: UpdateLeadSheetInput;
}>;


export type BandUpdateLeadSheetMutation = { __typename?: 'Mutation', updateLeadSheet: { __typename?: 'LeadSheet', id: number } };

export type BandDeleteLeadSheetMutationVariables = Exact<{
  leadSheetId: Scalars['Int']['input'];
}>;


export type BandDeleteLeadSheetMutation = { __typename?: 'Mutation', deleteLeadSheet: { __typename?: 'LeadSheet', id: number } };

export type BandCreateLeadSheetSectionMutationVariables = Exact<{
  leadSheetId: Scalars['Int']['input'];
  data: CreateLeadSheetSectionInput;
}>;


export type BandCreateLeadSheetSectionMutation = { __typename?: 'Mutation', createLeadSheetSection: { __typename?: 'LeadSheetSection', id: number, name: string, order: number, timeCode?: string | null, barLength?: string | null, lyricHint?: string | null, details: Array<{ __typename?: 'LeadSheetDetail', id: string, type: LeadSheetDetailType, content: string }> } };

export type BandUpdateLeadSheetSectionMutationVariables = Exact<{
  leadSheetSectionId: Scalars['Int']['input'];
  data: UpdateLeadSheetSectionInput;
}>;


export type BandUpdateLeadSheetSectionMutation = { __typename?: 'Mutation', updateLeadSheetSection: { __typename?: 'LeadSheetSection', id: number, name: string, order: number, timeCode?: string | null, barLength?: string | null, lyricHint?: string | null, details: Array<{ __typename?: 'LeadSheetDetail', id: string, type: LeadSheetDetailType, content: string }> } };

export type BandDeleteLeadSheetSectionMutationVariables = Exact<{
  leadSheetSectionId: Scalars['Int']['input'];
}>;


export type BandDeleteLeadSheetSectionMutation = { __typename?: 'Mutation', deleteLeadSheetSection: { __typename?: 'LeadSheetSection', id: number } };

export type StartMultipartUploadMutationVariables = Exact<{
  fileName: Scalars['String']['input'];
  fileType: Scalars['String']['input'];
  fileSize: Scalars['Int']['input'];
}>;


export type StartMultipartUploadMutation = { __typename?: 'Mutation', startMultipartUpload: { __typename?: 'Upload', uploadId?: string | null, key: string } };

export type GetPresignedUrlsMutationVariables = Exact<{
  uploadId: Scalars['ID']['input'];
  key: Scalars['String']['input'];
  parts: Scalars['Int']['input'];
}>;


export type GetPresignedUrlsMutation = { __typename?: 'Mutation', getPresignedUrls: Array<string> };

export type CompleteMultipartUploadMutationVariables = Exact<{
  uploadId: Scalars['ID']['input'];
  key: Scalars['String']['input'];
  parts: Array<UploadPartInput> | UploadPartInput;
}>;


export type CompleteMultipartUploadMutation = { __typename?: 'Mutation', completeMultipartUpload: { __typename?: 'Upload', id: number, key: string, fileName: string, fileType: string, fileSize: number, uploadId?: string | null, status: UploadStatus, createdAt: any, updatedAt: any, uploader?: { __typename?: 'User', id: number, name?: string | null, username?: string | null, email?: string | null } | null, parts?: Array<{ __typename?: 'UploadPart', partNumber: number, eTag: string }> | null } };

export type DeleteUploadMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteUploadMutation = { __typename?: 'Mutation', deleteUpload: { __typename?: 'Upload', id: number } };

export type BandGigsQueryVariables = Exact<{ [key: string]: never; }>;


export type BandGigsQuery = { __typename?: 'Query', gigs: Array<{ __typename?: 'Gig', id: number, name: string, date?: any | null, createdAt: any, updatedAt: any, eventId?: string | null, nowPlayingEngagementId?: number | null, currentGigSongId?: string | null, currentGigSong?: { __typename?: 'GigSong', id: number, order: number, song?: { __typename?: 'Song', id: number, title?: string | null, artist?: string | null } | null } | null, sets: Array<{ __typename?: 'GigSet', id: number, name: string, songs: Array<{ __typename?: 'GigSong', id: number, order: number, song?: { __typename?: 'Song', id: number, title?: string | null, artist?: string | null } | null }> }> }> };

export type BandSongsQueryVariables = Exact<{ [key: string]: never; }>;


export type BandSongsQuery = { __typename?: 'Query', songs: Array<{ __typename?: 'Song', id: number, title?: string | null, artist?: string | null, tempo?: number | null, lyrics?: string | null, feel?: string | null, fileUrl?: string | null, spotifyUrl?: string | null, youtubeUrl?: string | null, coverArtUrl?: string | null, duration?: number | null, key?: string | null, practicePriority?: string | null, chartUrl?: string | null, leadSheetUrl?: string | null, leadSheetEditUrl?: string | null, leadSheetId?: number | null }> };

export type BandSongQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type BandSongQuery = { __typename?: 'Query', song?: { __typename?: 'Song', id: number, title?: string | null, artist?: string | null, tempo?: number | null, lyrics?: string | null, feel?: string | null, fileUrl?: string | null, spotifyUrl?: string | null, youtubeUrl?: string | null, coverArtUrl?: string | null, duration?: number | null, key?: string | null, practicePriority?: string | null, chartUrl?: string | null, leadSheetUrl?: string | null, leadSheetEditUrl?: string | null, leadSheetId?: number | null } | null };

export type BandSongWithLeadSheetQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type BandSongWithLeadSheetQuery = { __typename?: 'Query', song?: { __typename?: 'Song', id: number, title?: string | null, artist?: string | null, tempo?: number | null, lyrics?: string | null, feel?: string | null, fileUrl?: string | null, spotifyUrl?: string | null, youtubeUrl?: string | null, coverArtUrl?: string | null, duration?: number | null, key?: string | null, practicePriority?: string | null, chartUrl?: string | null, leadSheetUrl?: string | null, leadSheetEditUrl?: string | null, leadSheetId?: number | null, leadSheet?: { __typename?: 'LeadSheet', id: number, sections: Array<{ __typename?: 'LeadSheetSection', id: number, name: string, order: number, timeCode?: string | null, barLength?: string | null, lyricHint?: string | null, details: Array<{ __typename?: 'LeadSheetDetail', id: string, type: LeadSheetDetailType, content: string }> }> } | null } | null };

export type UploadsQueryVariables = Exact<{ [key: string]: never; }>;


export type UploadsQuery = { __typename?: 'Query', uploads: Array<{ __typename?: 'Upload', id: number, key: string, fileName: string, fileType: string, fileSize: number, uploadId?: string | null, status: UploadStatus, createdAt: any, updatedAt: any, uploader?: { __typename?: 'User', id: number, name?: string | null, username?: string | null, email?: string | null } | null, parts?: Array<{ __typename?: 'UploadPart', partNumber: number, eTag: string }> | null }> };

export type UploadQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type UploadQuery = { __typename?: 'Query', upload?: { __typename?: 'Upload', id: number, key: string, fileName: string, fileType: string, fileSize: number, uploadId?: string | null, status: UploadStatus, createdAt: any, updatedAt: any, uploader?: { __typename?: 'User', id: number, name?: string | null, username?: string | null, email?: string | null } | null, parts?: Array<{ __typename?: 'UploadPart', partNumber: number, eTag: string }> | null } | null };

export type AdminEngagementFragment = { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } };

export type AdminEventFragment = { __typename?: 'Event', id: number, name: string, date?: any | null, live: boolean, location?: string | null, locked: boolean, description?: string | null, slug: string, createdAt: any, updatedAt: any, activeEngagementId?: number | null, stageConfig?: { __typename?: 'EventStageConfig', qrForegroundColor?: string | null, qrBackgroundColor?: string | null, qrTextColor?: string | null, qrWrapperBackgroundColor?: string | null, backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, fanConfig?: { __typename?: 'EventFanConfig', backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null, engagements: Array<{ __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } }> };

export type AdminSubmissionFragment = { __typename?: 'Submission', id: number, engagementId: number, createdAt: any, data: { __typename?: 'NowPlayingSubmissionData', order: number, songAlbumArt?: string | null, songTitle?: string | null, songArtist?: string | null, songNotes?: string | null, songLyrics?: string | null, visualizationType?: string | null } | { __typename?: 'PhotoCarouselSubmissionData', photoUrl: string, caption: string, approved?: boolean | null, sharingPermissionGranted?: boolean | null } | { __typename?: 'SlidesSubmissionData', optionalImageUrl?: string | null, title: string, content: string, order: number } | { __typename?: 'VoteForSubmissionData', title: string, color: string, description: string, optionalImageUrl?: string | null }, reactions: Array<{ __typename?: 'Reaction', id: number, type: string }> };

export type EventFanConfigFragment = { __typename?: 'EventFanConfig', backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null };

export type EventStageConfigFragment = { __typename?: 'EventStageConfig', qrForegroundColor?: string | null, qrBackgroundColor?: string | null, qrTextColor?: string | null, qrWrapperBackgroundColor?: string | null, backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null };

export type FanEngagementFragment = { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } };

export type FanEventFragment = { __typename?: 'Event', id: number, name: string, live: boolean, description?: string | null, date?: any | null, location?: string | null, slug: string, fanConfig?: { __typename?: 'EventFanConfig', backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null };

export type FanReactionFragment = { __typename?: 'Reaction', id: number, type: string, createdAt: any };

export type FanSubmissionFragment = { __typename?: 'Submission', id: number, createdAt: any, engagementId: number, data: { __typename?: 'NowPlayingSubmissionData', order: number, songAlbumArt?: string | null, songTitle?: string | null, songArtist?: string | null, songNotes?: string | null, songLyrics?: string | null, visualizationType?: string | null } | { __typename?: 'PhotoCarouselSubmissionData', photoUrl: string, caption: string, approved?: boolean | null, sharingPermissionGranted?: boolean | null } | { __typename?: 'SlidesSubmissionData', optionalImageUrl?: string | null, title: string, content: string, order: number } | { __typename?: 'VoteForSubmissionData', title: string, color: string, description: string, optionalImageUrl?: string | null }, reactions: Array<{ __typename?: 'Reaction', id: number, type: string, createdAt: any }> };

export type ScreenElementFragment = { __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null };

export type StageEngagementFragment = { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, qrCodeCta?: string | null, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } };

export type StageEventFragment = { __typename?: 'Event', id: number, name: string, live: boolean, slug: string, description?: string | null, date?: any | null, location?: string | null, stageConfig?: { __typename?: 'EventStageConfig', qrForegroundColor?: string | null, qrBackgroundColor?: string | null, qrTextColor?: string | null, qrWrapperBackgroundColor?: string | null, backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, fanConfig?: { __typename?: 'EventFanConfig', backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, qrCodeCta?: string | null, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null };

export type StageReactionFragment = { __typename?: 'Reaction', id: number, type: string, createdAt: any };

export type StageSubmissionFragment = { __typename?: 'Submission', id: number, createdAt: any, data: { __typename?: 'NowPlayingSubmissionData', order: number, songAlbumArt?: string | null, songTitle?: string | null, songArtist?: string | null, songNotes?: string | null, songLyrics?: string | null, visualizationType?: string | null } | { __typename?: 'PhotoCarouselSubmissionData', photoUrl: string, caption: string, approved?: boolean | null, sharingPermissionGranted?: boolean | null } | { __typename?: 'SlidesSubmissionData', optionalImageUrl?: string | null, title: string, content: string, order: number } | { __typename?: 'VoteForSubmissionData', title: string, color: string, description: string, optionalImageUrl?: string | null }, reactions: Array<{ __typename?: 'Reaction', id: number, createdAt: any, type: string, userId?: number | null, user?: { __typename?: 'User', id: number, name?: string | null } | null }> };

export type AdminChangeEventActiveEngagementMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
  engagementId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AdminChangeEventActiveEngagementMutation = { __typename?: 'Mutation', changeEventActiveEngagement: { __typename?: 'Event', id: number, name: string, date?: any | null, live: boolean, location?: string | null, locked: boolean, description?: string | null, slug: string, createdAt: any, updatedAt: any, activeEngagementId?: number | null, stageConfig?: { __typename?: 'EventStageConfig', qrForegroundColor?: string | null, qrBackgroundColor?: string | null, qrTextColor?: string | null, qrWrapperBackgroundColor?: string | null, backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, fanConfig?: { __typename?: 'EventFanConfig', backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null, engagements: Array<{ __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } }> } };

export type AdminCreateEngagementMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
  input: CreateEngagementInput;
}>;


export type AdminCreateEngagementMutation = { __typename?: 'Mutation', createEngagement: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } };

export type AdminCreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type AdminCreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id: number, name: string, date?: any | null, live: boolean, location?: string | null, locked: boolean, description?: string | null, slug: string, createdAt: any, updatedAt: any, activeEngagementId?: number | null, stageConfig?: { __typename?: 'EventStageConfig', qrForegroundColor?: string | null, qrBackgroundColor?: string | null, qrTextColor?: string | null, qrWrapperBackgroundColor?: string | null, backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, fanConfig?: { __typename?: 'EventFanConfig', backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null, engagements: Array<{ __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } }> } };

export type AdminCreatePresignedUrlMutationVariables = Exact<{
  mimeType: Scalars['String']['input'];
}>;


export type AdminCreatePresignedUrlMutation = { __typename?: 'Mutation', adminCreatePresignedUrl: { __typename?: 'PresignedUrlResponse', url: string, key: string } };

export type AdminDeleteEngagementMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminDeleteEngagementMutation = { __typename?: 'Mutation', deleteEngagement: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } };

export type AdminDeleteEventMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminDeleteEventMutation = { __typename?: 'Mutation', deleteEvent: { __typename?: 'Event', id: number, name: string, date?: any | null, live: boolean, location?: string | null, locked: boolean, description?: string | null, slug: string, createdAt: any, updatedAt: any, activeEngagementId?: number | null, stageConfig?: { __typename?: 'EventStageConfig', qrForegroundColor?: string | null, qrBackgroundColor?: string | null, qrTextColor?: string | null, qrWrapperBackgroundColor?: string | null, backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, fanConfig?: { __typename?: 'EventFanConfig', backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null, engagements: Array<{ __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } }> } };

export type AdminDeleteFromS3MutationVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type AdminDeleteFromS3Mutation = { __typename?: 'Mutation', adminDeleteFromS3: boolean };

export type AdminDeleteSubmissionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminDeleteSubmissionMutation = { __typename?: 'Mutation', deleteSubmission: { __typename?: 'Submission', id: number, engagementId: number, createdAt: any, data: { __typename?: 'NowPlayingSubmissionData', order: number, songAlbumArt?: string | null, songTitle?: string | null, songArtist?: string | null, songNotes?: string | null, songLyrics?: string | null, visualizationType?: string | null } | { __typename?: 'PhotoCarouselSubmissionData', photoUrl: string, caption: string, approved?: boolean | null, sharingPermissionGranted?: boolean | null } | { __typename?: 'SlidesSubmissionData', optionalImageUrl?: string | null, title: string, content: string, order: number } | { __typename?: 'VoteForSubmissionData', title: string, color: string, description: string, optionalImageUrl?: string | null }, reactions: Array<{ __typename?: 'Reaction', id: number, type: string }> } };

export type AdminGenerateImageMutationVariables = Exact<{
  data: GenerateImageInput;
}>;


export type AdminGenerateImageMutation = { __typename?: 'Mutation', adminGenerateImage: { __typename?: 'GenerateImageResponse', uri?: string | null, error?: string | null } };

export type AdminMoveEngagementMutationVariables = Exact<{
  engagementId: Scalars['Int']['input'];
  direction: Scalars['String']['input'];
}>;


export type AdminMoveEngagementMutation = { __typename?: 'Mutation', moveEngagement: Array<{ __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } }> };

export type AdminUpdateEngagementMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateEngagementInput;
}>;


export type AdminUpdateEngagementMutation = { __typename?: 'Mutation', updateEngagement: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } };

export type AdminUpdateEventMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateEventInput;
}>;


export type AdminUpdateEventMutation = { __typename?: 'Mutation', updateEvent: { __typename?: 'Event', id: number, name: string, date?: any | null, live: boolean, location?: string | null, locked: boolean, description?: string | null, slug: string, createdAt: any, updatedAt: any, activeEngagementId?: number | null, stageConfig?: { __typename?: 'EventStageConfig', qrForegroundColor?: string | null, qrBackgroundColor?: string | null, qrTextColor?: string | null, qrWrapperBackgroundColor?: string | null, backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, fanConfig?: { __typename?: 'EventFanConfig', backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null, engagements: Array<{ __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } }> } };

export type AdminUpdateEventFanConfigMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateEventFanConfigInput;
}>;


export type AdminUpdateEventFanConfigMutation = { __typename?: 'Mutation', updateEventFanConfig: { __typename?: 'EventFanConfig', backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } };

export type AdminUpdateEventStageConfigMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateEventStageConfigInput;
}>;


export type AdminUpdateEventStageConfigMutation = { __typename?: 'Mutation', updateEventStageConfig: { __typename?: 'EventStageConfig', qrForegroundColor?: string | null, qrBackgroundColor?: string | null, qrTextColor?: string | null, qrWrapperBackgroundColor?: string | null, backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } };

export type AdminUpdateSubmissionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: Scalars['Json']['input'];
}>;


export type AdminUpdateSubmissionMutation = { __typename?: 'Mutation', updateSubmission: { __typename?: 'Submission', id: number, engagementId: number, createdAt: any, data: { __typename?: 'NowPlayingSubmissionData', order: number, songAlbumArt?: string | null, songTitle?: string | null, songArtist?: string | null, songNotes?: string | null, songLyrics?: string | null, visualizationType?: string | null } | { __typename?: 'PhotoCarouselSubmissionData', photoUrl: string, caption: string, approved?: boolean | null, sharingPermissionGranted?: boolean | null } | { __typename?: 'SlidesSubmissionData', optionalImageUrl?: string | null, title: string, content: string, order: number } | { __typename?: 'VoteForSubmissionData', title: string, color: string, description: string, optionalImageUrl?: string | null }, reactions: Array<{ __typename?: 'Reaction', id: number, type: string }> } };

export type CreateReactionMutationVariables = Exact<{
  submissionId: Scalars['Int']['input'];
  type: Scalars['String']['input'];
}>;


export type CreateReactionMutation = { __typename?: 'Mutation', createReaction: { __typename?: 'Reaction', id: number, type: string, createdAt: any } };

export type CreateSubmissionMutationVariables = Exact<{
  engagementId: Scalars['Int']['input'];
  data: Scalars['Json']['input'];
}>;


export type CreateSubmissionMutation = { __typename?: 'Mutation', createSubmission: { __typename?: 'Submission', id: number, createdAt: any, engagementId: number, data: { __typename?: 'NowPlayingSubmissionData', order: number, songAlbumArt?: string | null, songTitle?: string | null, songArtist?: string | null, songNotes?: string | null, songLyrics?: string | null, visualizationType?: string | null } | { __typename?: 'PhotoCarouselSubmissionData', photoUrl: string, caption: string, approved?: boolean | null, sharingPermissionGranted?: boolean | null } | { __typename?: 'SlidesSubmissionData', optionalImageUrl?: string | null, title: string, content: string, order: number } | { __typename?: 'VoteForSubmissionData', title: string, color: string, description: string, optionalImageUrl?: string | null }, reactions: Array<{ __typename?: 'Reaction', id: number, type: string, createdAt: any }> } };

export type CreateSubmissionPresignedUrlMutationVariables = Exact<{
  engagementId: Scalars['Int']['input'];
  mimeType: Scalars['String']['input'];
}>;


export type CreateSubmissionPresignedUrlMutation = { __typename?: 'Mutation', createSubmissionPresignedUrl: { __typename?: 'PresignedUrlResponse', url: string, key: string } };

export type FanSignupMutationVariables = Exact<{
  data: SignupInput;
}>;


export type FanSignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', id: number, name?: string | null, role: Role } };

export type LoginMutationVariables = Exact<{
  emailOrUsername: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: number, email?: string | null, name?: string | null, username?: string | null, role: Role } | null };

export type AdminGetEngagementQueryVariables = Exact<{
  engagementId: Scalars['Int']['input'];
}>;


export type AdminGetEngagementQuery = { __typename?: 'Query', engagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null };

export type AdminGetEngagementsQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type AdminGetEngagementsQuery = { __typename?: 'Query', engagements: Array<{ __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } }> };

export type AdminGetEventQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type AdminGetEventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: number, name: string, date?: any | null, live: boolean, location?: string | null, locked: boolean, description?: string | null, slug: string, createdAt: any, updatedAt: any, activeEngagementId?: number | null, stageConfig?: { __typename?: 'EventStageConfig', qrForegroundColor?: string | null, qrBackgroundColor?: string | null, qrTextColor?: string | null, qrWrapperBackgroundColor?: string | null, backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, fanConfig?: { __typename?: 'EventFanConfig', backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null, engagements: Array<{ __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } }> } | null };

export type AdminGetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminGetEventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: number, name: string, date?: any | null, live: boolean, location?: string | null, locked: boolean, description?: string | null, slug: string, createdAt: any, updatedAt: any, activeEngagementId?: number | null, stageConfig?: { __typename?: 'EventStageConfig', qrForegroundColor?: string | null, qrBackgroundColor?: string | null, qrTextColor?: string | null, qrWrapperBackgroundColor?: string | null, backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, fanConfig?: { __typename?: 'EventFanConfig', backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null, engagements: Array<{ __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, qrCodeCta?: string | null, startTime?: any | null, order: number, endTime?: any | null, type: EngagementType, data?: { __typename?: 'NowPlayingAdminData', currentSong?: number | null } | { __typename?: 'PhotoCarouselAdminData', visibleSubmission?: number | null, rejectedQueue: Array<number>, unapprovedQueue: Array<number>, unseenQueue: Array<number>, seenQueuePointer: number, seenQueue: Array<number> } | { __typename?: 'SlidesAdminData', currentSlide: number } | { __typename?: 'VoteForAdminData', startTime?: any | null, endTime?: any | null, votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, config?: { __typename?: 'NowPlayingAdminConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselAdminConfig', maxSubmissionsPerUser: number, requireApproval: boolean, askSharePermission?: boolean | null, sharePrompt?: string | null, pollInterval?: number | null } | { __typename?: 'SlidesAdminConfig', autoPlay: boolean } | { __typename?: 'VoteForAdminConfig', votesPerUser: number, allowUserSubmissions: boolean, maxSubmissionsPerUser: number } | null, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } }> }> };

export type AdminGetSubmissionQueryVariables = Exact<{
  submissionId: Scalars['Int']['input'];
}>;


export type AdminGetSubmissionQuery = { __typename?: 'Query', submission?: { __typename?: 'Submission', id: number, engagementId: number, createdAt: any, data: { __typename?: 'NowPlayingSubmissionData', order: number, songAlbumArt?: string | null, songTitle?: string | null, songArtist?: string | null, songNotes?: string | null, songLyrics?: string | null, visualizationType?: string | null } | { __typename?: 'PhotoCarouselSubmissionData', photoUrl: string, caption: string, approved?: boolean | null, sharingPermissionGranted?: boolean | null } | { __typename?: 'SlidesSubmissionData', optionalImageUrl?: string | null, title: string, content: string, order: number } | { __typename?: 'VoteForSubmissionData', title: string, color: string, description: string, optionalImageUrl?: string | null }, reactions: Array<{ __typename?: 'Reaction', id: number, type: string }> } | null };

export type AdminGetSubmissionsQueryVariables = Exact<{
  engagementId: Scalars['Int']['input'];
}>;


export type AdminGetSubmissionsQuery = { __typename?: 'Query', submissions: Array<{ __typename?: 'Submission', id: number, engagementId: number, createdAt: any, data: { __typename?: 'NowPlayingSubmissionData', order: number, songAlbumArt?: string | null, songTitle?: string | null, songArtist?: string | null, songNotes?: string | null, songLyrics?: string | null, visualizationType?: string | null } | { __typename?: 'PhotoCarouselSubmissionData', photoUrl: string, caption: string, approved?: boolean | null, sharingPermissionGranted?: boolean | null } | { __typename?: 'SlidesSubmissionData', optionalImageUrl?: string | null, title: string, content: string, order: number } | { __typename?: 'VoteForSubmissionData', title: string, color: string, description: string, optionalImageUrl?: string | null }, reactions: Array<{ __typename?: 'Reaction', id: number, type: string }> }> };

export type CanCreateSubmissionQueryVariables = Exact<{
  engagementId: Scalars['Int']['input'];
}>;


export type CanCreateSubmissionQuery = { __typename?: 'Query', canCreateSubmission: boolean };

export type FanGetEventQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type FanGetEventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: number, name: string, live: boolean, description?: string | null, date?: any | null, location?: string | null, slug: string, fanConfig?: { __typename?: 'EventFanConfig', backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null } | null };

export type FanGetSubmissionQueryVariables = Exact<{
  submissionId: Scalars['Int']['input'];
}>;


export type FanGetSubmissionQuery = { __typename?: 'Query', submission?: { __typename?: 'Submission', id: number, createdAt: any, engagementId: number, data: { __typename?: 'NowPlayingSubmissionData', order: number, songAlbumArt?: string | null, songTitle?: string | null, songArtist?: string | null, songNotes?: string | null, songLyrics?: string | null, visualizationType?: string | null } | { __typename?: 'PhotoCarouselSubmissionData', photoUrl: string, caption: string, approved?: boolean | null, sharingPermissionGranted?: boolean | null } | { __typename?: 'SlidesSubmissionData', optionalImageUrl?: string | null, title: string, content: string, order: number } | { __typename?: 'VoteForSubmissionData', title: string, color: string, description: string, optionalImageUrl?: string | null }, reactions: Array<{ __typename?: 'Reaction', id: number, type: string, createdAt: any }> } | null };

export type FanGetSubmissionsQueryVariables = Exact<{
  engagementId: Scalars['Int']['input'];
}>;


export type FanGetSubmissionsQuery = { __typename?: 'Query', submissions: Array<{ __typename?: 'Submission', id: number, createdAt: any, engagementId: number, data: { __typename?: 'NowPlayingSubmissionData', order: number, songAlbumArt?: string | null, songTitle?: string | null, songArtist?: string | null, songNotes?: string | null, songLyrics?: string | null, visualizationType?: string | null } | { __typename?: 'PhotoCarouselSubmissionData', photoUrl: string, caption: string, approved?: boolean | null, sharingPermissionGranted?: boolean | null } | { __typename?: 'SlidesSubmissionData', optionalImageUrl?: string | null, title: string, content: string, order: number } | { __typename?: 'VoteForSubmissionData', title: string, color: string, description: string, optionalImageUrl?: string | null }, reactions: Array<{ __typename?: 'Reaction', id: number, type: string, createdAt: any }> }> };

export type RandomNameQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomNameQuery = { __typename?: 'Query', randomName: string };

export type StageGetActiveEngagementQueryVariables = Exact<{
  eventSlug: Scalars['String']['input'];
}>;


export type StageGetActiveEngagementQuery = { __typename?: 'Query', activeEventEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, qrCodeCta?: string | null, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null };

export type StageGetEventQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type StageGetEventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: number, name: string, live: boolean, slug: string, description?: string | null, date?: any | null, location?: string | null, stageConfig?: { __typename?: 'EventStageConfig', qrForegroundColor?: string | null, qrBackgroundColor?: string | null, qrTextColor?: string | null, qrWrapperBackgroundColor?: string | null, backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, fanConfig?: { __typename?: 'EventFanConfig', backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, qrCodeCta?: string | null, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null } | null };

export type StageGetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type StageGetEventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: number, name: string, live: boolean, slug: string, description?: string | null, date?: any | null, location?: string | null, stageConfig?: { __typename?: 'EventStageConfig', qrForegroundColor?: string | null, qrBackgroundColor?: string | null, qrTextColor?: string | null, qrWrapperBackgroundColor?: string | null, backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, fanConfig?: { __typename?: 'EventFanConfig', backgroundImage?: string | null, fontFamily?: Array<string> | null, elements?: Array<{ __typename?: 'ScreenElement', id: string, type: string, name?: string | null, imageUrl?: string | null, defaultStyles?: any | null, engagementStyles?: any | null, defaultClassNames?: string | null, engagementClassNames?: string | null, text?: string | null, fontFamily?: Array<string> | null, linkHref?: string | null }> | null } | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, qrCodeCta?: string | null, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null }> };

export type StageGetSubmissionQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type StageGetSubmissionQuery = { __typename?: 'Query', submission?: { __typename?: 'Submission', id: number, createdAt: any, data: { __typename?: 'NowPlayingSubmissionData', order: number, songAlbumArt?: string | null, songTitle?: string | null, songArtist?: string | null, songNotes?: string | null, songLyrics?: string | null, visualizationType?: string | null } | { __typename?: 'PhotoCarouselSubmissionData', photoUrl: string, caption: string, approved?: boolean | null, sharingPermissionGranted?: boolean | null } | { __typename?: 'SlidesSubmissionData', optionalImageUrl?: string | null, title: string, content: string, order: number } | { __typename?: 'VoteForSubmissionData', title: string, color: string, description: string, optionalImageUrl?: string | null }, reactions: Array<{ __typename?: 'Reaction', id: number, createdAt: any, type: string, userId?: number | null, user?: { __typename?: 'User', id: number, name?: string | null } | null }> } | null };

export type StageGetSubmissionsQueryVariables = Exact<{
  engagementId: Scalars['Int']['input'];
}>;


export type StageGetSubmissionsQuery = { __typename?: 'Query', submissions: Array<{ __typename?: 'Submission', id: number, createdAt: any, data: { __typename?: 'NowPlayingSubmissionData', order: number, songAlbumArt?: string | null, songTitle?: string | null, songArtist?: string | null, songNotes?: string | null, songLyrics?: string | null, visualizationType?: string | null } | { __typename?: 'PhotoCarouselSubmissionData', photoUrl: string, caption: string, approved?: boolean | null, sharingPermissionGranted?: boolean | null } | { __typename?: 'SlidesSubmissionData', optionalImageUrl?: string | null, title: string, content: string, order: number } | { __typename?: 'VoteForSubmissionData', title: string, color: string, description: string, optionalImageUrl?: string | null }, reactions: Array<{ __typename?: 'Reaction', id: number, createdAt: any, type: string, userId?: number | null, user?: { __typename?: 'User', id: number, name?: string | null } | null }> }> };

export type ValidateGoogleFontQueryVariables = Exact<{
  fontName: Scalars['String']['input'];
}>;


export type ValidateGoogleFontQuery = { __typename?: 'Query', validateGoogleFont: boolean };

export type WhoamiQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoamiQuery = { __typename?: 'Query', whoami?: { __typename?: 'User', id: number, email?: string | null, username?: string | null, name?: string | null, lastLogin?: any | null, role: Role } | null };

export type OnActiveEngagementChangedSubscriptionVariables = Exact<{
  eventSlug: Scalars['String']['input'];
}>;


export type OnActiveEngagementChangedSubscription = { __typename?: 'Subscription', activeEngagementChanged?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, qrCodeCta?: string | null, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig: { __typename?: 'NowPlayingViewConfig', visualizationType: string, allowComments: boolean, allowedReactions: Array<string> } | { __typename?: 'PhotoCarouselViewConfig', maxSubmissionsPerUser: number, askSharePermission?: boolean | null, sharePrompt?: string | null } | { __typename?: 'SlidesViewConfig', autoPlay: boolean } | { __typename?: 'VoteForViewConfig', votesPerUser: number }, viewData: { __typename?: 'NowPlayingViewData', currentSong?: number | null } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData', currentSlide: number } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null };

export type OnEngagementViewDataChangedSubscriptionVariables = Exact<{
  engagementId: Scalars['Int']['input'];
}>;


export type OnEngagementViewDataChangedSubscription = { __typename?: 'Subscription', engagementViewDataChanged?: { __typename?: 'EngagementViewDataChangedPayload', viewData: { __typename?: 'NowPlayingViewData' } | { __typename?: 'PhotoCarouselViewData', visibleSubmission?: number | null } | { __typename?: 'SlidesViewData' } | { __typename?: 'VoteForViewData', votes: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null };

export type OnReactionsCreatedSubscriptionVariables = Exact<{
  submissionId: Scalars['Int']['input'];
}>;


export type OnReactionsCreatedSubscription = { __typename?: 'Subscription', reactionsCreated?: { __typename?: 'ReactionsCreatedPayload', reactions: Array<{ __typename?: 'Reaction', id: number, type: string, createdAt: any }> } | null };

export type OnSubmissionDeletedSubscriptionVariables = Exact<{
  engagementId: Scalars['Int']['input'];
}>;


export type OnSubmissionDeletedSubscription = { __typename?: 'Subscription', submissionDeleted?: { __typename?: 'SubmissionDeletedPayload', submissionId: number } | null };

export const GigSongFragmentDoc = gql`
    fragment GigSong on GigSong {
  id
  song {
    id
    title
    artist
  }
  order
}
    `;
export const GigSetFragmentDoc = gql`
    fragment GigSet on GigSet {
  id
  name
  songs {
    ...GigSong
  }
}
    ${GigSongFragmentDoc}`;
export const GigFragmentDoc = gql`
    fragment Gig on Gig {
  id
  name
  date
  createdAt
  updatedAt
  eventId
  nowPlayingEngagementId
  currentGigSongId
  currentGigSong {
    ...GigSong
  }
  sets {
    ...GigSet
  }
}
    ${GigSongFragmentDoc}
${GigSetFragmentDoc}`;
export const SongFragmentDoc = gql`
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
export const LeadSheetDetailFragmentDoc = gql`
    fragment LeadSheetDetail on LeadSheetDetail {
  id
  type
  content
}
    `;
export const LeadSheetSectionFragmentDoc = gql`
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
}
    ${LeadSheetDetailFragmentDoc}`;
export const LeadSheetFragmentDoc = gql`
    fragment LeadSheet on LeadSheet {
  id
  sections {
    ...LeadSheetSection
  }
}
    ${LeadSheetSectionFragmentDoc}`;
export const UploadFragmentDoc = gql`
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
export const ScreenElementFragmentDoc = gql`
    fragment ScreenElement on ScreenElement {
  id
  type
  name
  imageUrl
  defaultStyles
  engagementStyles
  defaultClassNames
  engagementClassNames
  text
  fontFamily
  linkHref
}
    `;
export const EventStageConfigFragmentDoc = gql`
    fragment EventStageConfig on EventStageConfig {
  qrForegroundColor
  qrBackgroundColor
  qrTextColor
  qrWrapperBackgroundColor
  backgroundImage
  fontFamily
  elements {
    ...ScreenElement
  }
}
    ${ScreenElementFragmentDoc}`;
export const EventFanConfigFragmentDoc = gql`
    fragment EventFanConfig on EventFanConfig {
  backgroundImage
  fontFamily
  elements {
    ...ScreenElement
  }
}
    ${ScreenElementFragmentDoc}`;
export const PhotoCarouselAdminDataFieldsFragmentDoc = gql`
    fragment PhotoCarouselAdminDataFields on PhotoCarouselAdminData {
  visibleSubmission
  rejectedQueue
  unapprovedQueue
  unseenQueue
  seenQueuePointer
  seenQueue
}
    `;
export const VoteForAdminDataFieldsFragmentDoc = gql`
    fragment VoteForAdminDataFields on VoteForAdminData {
  votes {
    submissionId
    count
  }
  startTime
  endTime
}
    `;
export const SlidesAdminDataFieldsFragmentDoc = gql`
    fragment SlidesAdminDataFields on SlidesAdminData {
  currentSlide
}
    `;
export const NowPlayingAdminDataFieldsFragmentDoc = gql`
    fragment NowPlayingAdminDataFields on NowPlayingAdminData {
  currentSong
}
    `;
export const PhotoCarouselAdminConfigFieldsFragmentDoc = gql`
    fragment PhotoCarouselAdminConfigFields on PhotoCarouselAdminConfig {
  maxSubmissionsPerUser
  requireApproval
  askSharePermission
  sharePrompt
  pollInterval
}
    `;
export const VoteForAdminConfigFieldsFragmentDoc = gql`
    fragment VoteForAdminConfigFields on VoteForAdminConfig {
  votesPerUser
  allowUserSubmissions
  maxSubmissionsPerUser
}
    `;
export const SlidesAdminConfigFieldsFragmentDoc = gql`
    fragment SlidesAdminConfigFields on SlidesAdminConfig {
  autoPlay
}
    `;
export const NowPlayingAdminConfigFieldsFragmentDoc = gql`
    fragment NowPlayingAdminConfigFields on NowPlayingAdminConfig {
  visualizationType
  allowComments
  allowedReactions
}
    `;
export const PhotoCarouselViewConfigFieldsFragmentDoc = gql`
    fragment PhotoCarouselViewConfigFields on PhotoCarouselViewConfig {
  maxSubmissionsPerUser
  askSharePermission
  sharePrompt
}
    `;
export const VoteForViewConfigFieldsFragmentDoc = gql`
    fragment VoteForViewConfigFields on VoteForViewConfig {
  votesPerUser
}
    `;
export const SlidesViewConfigFieldsFragmentDoc = gql`
    fragment SlidesViewConfigFields on SlidesViewConfig {
  autoPlay
}
    `;
export const NowPlayingViewConfigFieldsFragmentDoc = gql`
    fragment NowPlayingViewConfigFields on NowPlayingViewConfig {
  visualizationType
  allowComments
  allowedReactions
}
    `;
export const PhotoCarouselViewDataFieldsFragmentDoc = gql`
    fragment PhotoCarouselViewDataFields on PhotoCarouselViewData {
  visibleSubmission
}
    `;
export const VoteForViewDataFieldsFragmentDoc = gql`
    fragment VoteForViewDataFields on VoteForViewData {
  votes {
    submissionId
    count
  }
}
    `;
export const SlidesViewDataFieldsFragmentDoc = gql`
    fragment SlidesViewDataFields on SlidesViewData {
  currentSlide
}
    `;
export const NowPlayingViewDataFieldsFragmentDoc = gql`
    fragment NowPlayingViewDataFields on NowPlayingViewData {
  currentSong
}
    `;
export const AdminEngagementFragmentDoc = gql`
    fragment AdminEngagement on Engagement {
  id
  createdAt
  updatedAt
  title
  description
  qrCodeCta
  startTime
  order
  endTime
  type
  data {
    ...PhotoCarouselAdminDataFields
    ...VoteForAdminDataFields
    ...SlidesAdminDataFields
    ...NowPlayingAdminDataFields
  }
  config {
    ...PhotoCarouselAdminConfigFields
    ...VoteForAdminConfigFields
    ...SlidesAdminConfigFields
    ...NowPlayingAdminConfigFields
  }
  viewConfig {
    ...PhotoCarouselViewConfigFields
    ...VoteForViewConfigFields
    ...SlidesViewConfigFields
    ...NowPlayingViewConfigFields
  }
  viewData {
    ...PhotoCarouselViewDataFields
    ...VoteForViewDataFields
    ...SlidesViewDataFields
    ...NowPlayingViewDataFields
  }
  order
}
    ${PhotoCarouselAdminDataFieldsFragmentDoc}
${VoteForAdminDataFieldsFragmentDoc}
${SlidesAdminDataFieldsFragmentDoc}
${NowPlayingAdminDataFieldsFragmentDoc}
${PhotoCarouselAdminConfigFieldsFragmentDoc}
${VoteForAdminConfigFieldsFragmentDoc}
${SlidesAdminConfigFieldsFragmentDoc}
${NowPlayingAdminConfigFieldsFragmentDoc}
${PhotoCarouselViewConfigFieldsFragmentDoc}
${VoteForViewConfigFieldsFragmentDoc}
${SlidesViewConfigFieldsFragmentDoc}
${NowPlayingViewConfigFieldsFragmentDoc}
${PhotoCarouselViewDataFieldsFragmentDoc}
${VoteForViewDataFieldsFragmentDoc}
${SlidesViewDataFieldsFragmentDoc}
${NowPlayingViewDataFieldsFragmentDoc}`;
export const AdminEventFragmentDoc = gql`
    fragment AdminEvent on Event {
  id
  name
  date
  live
  location
  locked
  description
  slug
  createdAt
  updatedAt
  stageConfig {
    ...EventStageConfig
  }
  fanConfig {
    ...EventFanConfig
  }
  activeEngagement {
    ...AdminEngagement
  }
  activeEngagementId
  engagements {
    ...AdminEngagement
  }
}
    ${EventStageConfigFragmentDoc}
${EventFanConfigFragmentDoc}
${AdminEngagementFragmentDoc}`;
export const PhotoCarouselSubmissionFieldsFragmentDoc = gql`
    fragment PhotoCarouselSubmissionFields on PhotoCarouselSubmissionData {
  photoUrl
  caption
  approved
  sharingPermissionGranted
}
    `;
export const VoteForSubmissionFieldsFragmentDoc = gql`
    fragment VoteForSubmissionFields on VoteForSubmissionData {
  title
  color
  description
  optionalImageUrl
}
    `;
export const SlidesSubmissionFieldsFragmentDoc = gql`
    fragment SlidesSubmissionFields on SlidesSubmissionData {
  optionalImageUrl
  title
  content
  order
}
    `;
export const NowPlayingSubmissionFieldsFragmentDoc = gql`
    fragment NowPlayingSubmissionFields on NowPlayingSubmissionData {
  order
  songAlbumArt
  songTitle
  songArtist
  songNotes
  songLyrics
  visualizationType
}
    `;
export const AdminSubmissionFragmentDoc = gql`
    fragment AdminSubmission on Submission {
  id
  engagementId
  data {
    ...PhotoCarouselSubmissionFields
    ...VoteForSubmissionFields
    ...SlidesSubmissionFields
    ...NowPlayingSubmissionFields
  }
  createdAt
  reactions {
    id
    type
  }
}
    ${PhotoCarouselSubmissionFieldsFragmentDoc}
${VoteForSubmissionFieldsFragmentDoc}
${SlidesSubmissionFieldsFragmentDoc}
${NowPlayingSubmissionFieldsFragmentDoc}`;
export const FanEngagementFragmentDoc = gql`
    fragment FanEngagement on Engagement {
  id
  createdAt
  updatedAt
  title
  description
  startTime
  endTime
  viewConfig {
    ...PhotoCarouselViewConfigFields
    ...VoteForViewConfigFields
    ...SlidesViewConfigFields
    ...NowPlayingViewConfigFields
  }
  viewData {
    ...PhotoCarouselViewDataFields
    ...VoteForViewDataFields
    ...SlidesViewDataFields
    ...NowPlayingViewDataFields
  }
  type
  order
}
    ${PhotoCarouselViewConfigFieldsFragmentDoc}
${VoteForViewConfigFieldsFragmentDoc}
${SlidesViewConfigFieldsFragmentDoc}
${NowPlayingViewConfigFieldsFragmentDoc}
${PhotoCarouselViewDataFieldsFragmentDoc}
${VoteForViewDataFieldsFragmentDoc}
${SlidesViewDataFieldsFragmentDoc}
${NowPlayingViewDataFieldsFragmentDoc}`;
export const FanEventFragmentDoc = gql`
    fragment FanEvent on Event {
  id
  name
  live
  description
  date
  location
  slug
  fanConfig {
    ...EventFanConfig
  }
  activeEngagement {
    ...FanEngagement
  }
}
    ${EventFanConfigFragmentDoc}
${FanEngagementFragmentDoc}`;
export const FanReactionFragmentDoc = gql`
    fragment FanReaction on Reaction {
  id
  type
  createdAt
}
    `;
export const FanSubmissionFragmentDoc = gql`
    fragment FanSubmission on Submission {
  id
  createdAt
  engagementId
  data {
    ...PhotoCarouselSubmissionFields
    ...VoteForSubmissionFields
    ...SlidesSubmissionFields
    ...NowPlayingSubmissionFields
  }
  reactions {
    ...FanReaction
  }
}
    ${PhotoCarouselSubmissionFieldsFragmentDoc}
${VoteForSubmissionFieldsFragmentDoc}
${SlidesSubmissionFieldsFragmentDoc}
${NowPlayingSubmissionFieldsFragmentDoc}
${FanReactionFragmentDoc}`;
export const StageEngagementFragmentDoc = gql`
    fragment StageEngagement on Engagement {
  id
  createdAt
  updatedAt
  title
  qrCodeCta
  description
  startTime
  endTime
  viewConfig {
    ...PhotoCarouselViewConfigFields
    ...VoteForViewConfigFields
    ...SlidesViewConfigFields
    ...NowPlayingViewConfigFields
  }
  viewData {
    ...PhotoCarouselViewDataFields
    ...VoteForViewDataFields
    ...SlidesViewDataFields
    ...NowPlayingViewDataFields
  }
  type
  order
}
    ${PhotoCarouselViewConfigFieldsFragmentDoc}
${VoteForViewConfigFieldsFragmentDoc}
${SlidesViewConfigFieldsFragmentDoc}
${NowPlayingViewConfigFieldsFragmentDoc}
${PhotoCarouselViewDataFieldsFragmentDoc}
${VoteForViewDataFieldsFragmentDoc}
${SlidesViewDataFieldsFragmentDoc}
${NowPlayingViewDataFieldsFragmentDoc}`;
export const StageEventFragmentDoc = gql`
    fragment StageEvent on Event {
  id
  name
  live
  slug
  description
  date
  location
  stageConfig {
    ...EventStageConfig
  }
  fanConfig {
    ...EventFanConfig
  }
  activeEngagement {
    ...StageEngagement
  }
}
    ${EventStageConfigFragmentDoc}
${EventFanConfigFragmentDoc}
${StageEngagementFragmentDoc}`;
export const StageReactionFragmentDoc = gql`
    fragment StageReaction on Reaction {
  id
  type
  createdAt
}
    `;
export const StageSubmissionFragmentDoc = gql`
    fragment StageSubmission on Submission {
  id
  createdAt
  data {
    ...PhotoCarouselSubmissionFields
    ...VoteForSubmissionFields
    ...SlidesSubmissionFields
    ...NowPlayingSubmissionFields
  }
  reactions {
    id
    createdAt
    type
    userId
    user {
      id
      name
    }
  }
}
    ${PhotoCarouselSubmissionFieldsFragmentDoc}
${VoteForSubmissionFieldsFragmentDoc}
${SlidesSubmissionFieldsFragmentDoc}
${NowPlayingSubmissionFieldsFragmentDoc}`;
export const BandCreateGigDocument = gql`
    mutation bandCreateGig($data: CreateGigInput!) {
  createGig(data: $data) {
    ...Gig
  }
}
    ${GigFragmentDoc}`;
export type BandCreateGigMutationFn = Apollo.MutationFunction<BandCreateGigMutation, BandCreateGigMutationVariables>;

/**
 * __useBandCreateGigMutation__
 *
 * To run a mutation, you first call `useBandCreateGigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandCreateGigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandCreateGigMutation, { data, loading, error }] = useBandCreateGigMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useBandCreateGigMutation(baseOptions?: Apollo.MutationHookOptions<BandCreateGigMutation, BandCreateGigMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandCreateGigMutation, BandCreateGigMutationVariables>(BandCreateGigDocument, options);
      }
export type BandCreateGigMutationHookResult = ReturnType<typeof useBandCreateGigMutation>;
export type BandCreateGigMutationResult = Apollo.MutationResult<BandCreateGigMutation>;
export type BandCreateGigMutationOptions = Apollo.BaseMutationOptions<BandCreateGigMutation, BandCreateGigMutationVariables>;
export const BandUpdateGigDocument = gql`
    mutation bandUpdateGig($gigId: Int!, $data: UpdateGigInput!) {
  updateGig(gigId: $gigId, data: $data) {
    id
  }
}
    `;
export type BandUpdateGigMutationFn = Apollo.MutationFunction<BandUpdateGigMutation, BandUpdateGigMutationVariables>;

/**
 * __useBandUpdateGigMutation__
 *
 * To run a mutation, you first call `useBandUpdateGigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandUpdateGigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandUpdateGigMutation, { data, loading, error }] = useBandUpdateGigMutation({
 *   variables: {
 *      gigId: // value for 'gigId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useBandUpdateGigMutation(baseOptions?: Apollo.MutationHookOptions<BandUpdateGigMutation, BandUpdateGigMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandUpdateGigMutation, BandUpdateGigMutationVariables>(BandUpdateGigDocument, options);
      }
export type BandUpdateGigMutationHookResult = ReturnType<typeof useBandUpdateGigMutation>;
export type BandUpdateGigMutationResult = Apollo.MutationResult<BandUpdateGigMutation>;
export type BandUpdateGigMutationOptions = Apollo.BaseMutationOptions<BandUpdateGigMutation, BandUpdateGigMutationVariables>;
export const BandDeleteGigDocument = gql`
    mutation bandDeleteGig($gigId: Int!) {
  deleteGig(gigId: $gigId) {
    id
  }
}
    `;
export type BandDeleteGigMutationFn = Apollo.MutationFunction<BandDeleteGigMutation, BandDeleteGigMutationVariables>;

/**
 * __useBandDeleteGigMutation__
 *
 * To run a mutation, you first call `useBandDeleteGigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandDeleteGigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandDeleteGigMutation, { data, loading, error }] = useBandDeleteGigMutation({
 *   variables: {
 *      gigId: // value for 'gigId'
 *   },
 * });
 */
export function useBandDeleteGigMutation(baseOptions?: Apollo.MutationHookOptions<BandDeleteGigMutation, BandDeleteGigMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandDeleteGigMutation, BandDeleteGigMutationVariables>(BandDeleteGigDocument, options);
      }
export type BandDeleteGigMutationHookResult = ReturnType<typeof useBandDeleteGigMutation>;
export type BandDeleteGigMutationResult = Apollo.MutationResult<BandDeleteGigMutation>;
export type BandDeleteGigMutationOptions = Apollo.BaseMutationOptions<BandDeleteGigMutation, BandDeleteGigMutationVariables>;
export const BandCreateGigSetDocument = gql`
    mutation bandCreateGigSet($gigId: Int!, $data: CreateGigSetInput!) {
  createGigSet(gigId: $gigId, data: $data) {
    id
  }
}
    `;
export type BandCreateGigSetMutationFn = Apollo.MutationFunction<BandCreateGigSetMutation, BandCreateGigSetMutationVariables>;

/**
 * __useBandCreateGigSetMutation__
 *
 * To run a mutation, you first call `useBandCreateGigSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandCreateGigSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandCreateGigSetMutation, { data, loading, error }] = useBandCreateGigSetMutation({
 *   variables: {
 *      gigId: // value for 'gigId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useBandCreateGigSetMutation(baseOptions?: Apollo.MutationHookOptions<BandCreateGigSetMutation, BandCreateGigSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandCreateGigSetMutation, BandCreateGigSetMutationVariables>(BandCreateGigSetDocument, options);
      }
export type BandCreateGigSetMutationHookResult = ReturnType<typeof useBandCreateGigSetMutation>;
export type BandCreateGigSetMutationResult = Apollo.MutationResult<BandCreateGigSetMutation>;
export type BandCreateGigSetMutationOptions = Apollo.BaseMutationOptions<BandCreateGigSetMutation, BandCreateGigSetMutationVariables>;
export const BandUpdateGigSetDocument = gql`
    mutation bandUpdateGigSet($gigSetId: Int!, $data: UpdateGigSetInput!) {
  updateGigSet(gigSetId: $gigSetId, data: $data) {
    id
  }
}
    `;
export type BandUpdateGigSetMutationFn = Apollo.MutationFunction<BandUpdateGigSetMutation, BandUpdateGigSetMutationVariables>;

/**
 * __useBandUpdateGigSetMutation__
 *
 * To run a mutation, you first call `useBandUpdateGigSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandUpdateGigSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandUpdateGigSetMutation, { data, loading, error }] = useBandUpdateGigSetMutation({
 *   variables: {
 *      gigSetId: // value for 'gigSetId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useBandUpdateGigSetMutation(baseOptions?: Apollo.MutationHookOptions<BandUpdateGigSetMutation, BandUpdateGigSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandUpdateGigSetMutation, BandUpdateGigSetMutationVariables>(BandUpdateGigSetDocument, options);
      }
export type BandUpdateGigSetMutationHookResult = ReturnType<typeof useBandUpdateGigSetMutation>;
export type BandUpdateGigSetMutationResult = Apollo.MutationResult<BandUpdateGigSetMutation>;
export type BandUpdateGigSetMutationOptions = Apollo.BaseMutationOptions<BandUpdateGigSetMutation, BandUpdateGigSetMutationVariables>;
export const BandDeleteGigSetDocument = gql`
    mutation bandDeleteGigSet($gigSetId: Int!) {
  deleteGigSet(gigSetId: $gigSetId) {
    id
  }
}
    `;
export type BandDeleteGigSetMutationFn = Apollo.MutationFunction<BandDeleteGigSetMutation, BandDeleteGigSetMutationVariables>;

/**
 * __useBandDeleteGigSetMutation__
 *
 * To run a mutation, you first call `useBandDeleteGigSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandDeleteGigSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandDeleteGigSetMutation, { data, loading, error }] = useBandDeleteGigSetMutation({
 *   variables: {
 *      gigSetId: // value for 'gigSetId'
 *   },
 * });
 */
export function useBandDeleteGigSetMutation(baseOptions?: Apollo.MutationHookOptions<BandDeleteGigSetMutation, BandDeleteGigSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandDeleteGigSetMutation, BandDeleteGigSetMutationVariables>(BandDeleteGigSetDocument, options);
      }
export type BandDeleteGigSetMutationHookResult = ReturnType<typeof useBandDeleteGigSetMutation>;
export type BandDeleteGigSetMutationResult = Apollo.MutationResult<BandDeleteGigSetMutation>;
export type BandDeleteGigSetMutationOptions = Apollo.BaseMutationOptions<BandDeleteGigSetMutation, BandDeleteGigSetMutationVariables>;
export const BandCreateGigSongDocument = gql`
    mutation bandCreateGigSong($gigSetId: Int!, $data: CreateGigSongInput!) {
  createGigSong(gigSetId: $gigSetId, data: $data) {
    id
  }
}
    `;
export type BandCreateGigSongMutationFn = Apollo.MutationFunction<BandCreateGigSongMutation, BandCreateGigSongMutationVariables>;

/**
 * __useBandCreateGigSongMutation__
 *
 * To run a mutation, you first call `useBandCreateGigSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandCreateGigSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandCreateGigSongMutation, { data, loading, error }] = useBandCreateGigSongMutation({
 *   variables: {
 *      gigSetId: // value for 'gigSetId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useBandCreateGigSongMutation(baseOptions?: Apollo.MutationHookOptions<BandCreateGigSongMutation, BandCreateGigSongMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandCreateGigSongMutation, BandCreateGigSongMutationVariables>(BandCreateGigSongDocument, options);
      }
export type BandCreateGigSongMutationHookResult = ReturnType<typeof useBandCreateGigSongMutation>;
export type BandCreateGigSongMutationResult = Apollo.MutationResult<BandCreateGigSongMutation>;
export type BandCreateGigSongMutationOptions = Apollo.BaseMutationOptions<BandCreateGigSongMutation, BandCreateGigSongMutationVariables>;
export const BandDeleteGigSongDocument = gql`
    mutation bandDeleteGigSong($gigSongId: Int!) {
  deleteGigSong(gigSongId: $gigSongId) {
    id
  }
}
    `;
export type BandDeleteGigSongMutationFn = Apollo.MutationFunction<BandDeleteGigSongMutation, BandDeleteGigSongMutationVariables>;

/**
 * __useBandDeleteGigSongMutation__
 *
 * To run a mutation, you first call `useBandDeleteGigSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandDeleteGigSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandDeleteGigSongMutation, { data, loading, error }] = useBandDeleteGigSongMutation({
 *   variables: {
 *      gigSongId: // value for 'gigSongId'
 *   },
 * });
 */
export function useBandDeleteGigSongMutation(baseOptions?: Apollo.MutationHookOptions<BandDeleteGigSongMutation, BandDeleteGigSongMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandDeleteGigSongMutation, BandDeleteGigSongMutationVariables>(BandDeleteGigSongDocument, options);
      }
export type BandDeleteGigSongMutationHookResult = ReturnType<typeof useBandDeleteGigSongMutation>;
export type BandDeleteGigSongMutationResult = Apollo.MutationResult<BandDeleteGigSongMutation>;
export type BandDeleteGigSongMutationOptions = Apollo.BaseMutationOptions<BandDeleteGigSongMutation, BandDeleteGigSongMutationVariables>;
export const BandUpdateCurrentGigSongDocument = gql`
    mutation bandUpdateCurrentGigSong($gigId: Int!, $gigSongId: Int) {
  updateCurrentGigSong(gigId: $gigId, gigSongId: $gigSongId) {
    id
  }
}
    `;
export type BandUpdateCurrentGigSongMutationFn = Apollo.MutationFunction<BandUpdateCurrentGigSongMutation, BandUpdateCurrentGigSongMutationVariables>;

/**
 * __useBandUpdateCurrentGigSongMutation__
 *
 * To run a mutation, you first call `useBandUpdateCurrentGigSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandUpdateCurrentGigSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandUpdateCurrentGigSongMutation, { data, loading, error }] = useBandUpdateCurrentGigSongMutation({
 *   variables: {
 *      gigId: // value for 'gigId'
 *      gigSongId: // value for 'gigSongId'
 *   },
 * });
 */
export function useBandUpdateCurrentGigSongMutation(baseOptions?: Apollo.MutationHookOptions<BandUpdateCurrentGigSongMutation, BandUpdateCurrentGigSongMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandUpdateCurrentGigSongMutation, BandUpdateCurrentGigSongMutationVariables>(BandUpdateCurrentGigSongDocument, options);
      }
export type BandUpdateCurrentGigSongMutationHookResult = ReturnType<typeof useBandUpdateCurrentGigSongMutation>;
export type BandUpdateCurrentGigSongMutationResult = Apollo.MutationResult<BandUpdateCurrentGigSongMutation>;
export type BandUpdateCurrentGigSongMutationOptions = Apollo.BaseMutationOptions<BandUpdateCurrentGigSongMutation, BandUpdateCurrentGigSongMutationVariables>;
export const BandSyncSongsFromGoogleSheetsDocument = gql`
    mutation bandSyncSongsFromGoogleSheets($input: SyncSongsFromGoogleSheetsInput!) {
  syncSongsFromGoogleSheets(input: $input) {
    ...Song
  }
}
    ${SongFragmentDoc}`;
export type BandSyncSongsFromGoogleSheetsMutationFn = Apollo.MutationFunction<BandSyncSongsFromGoogleSheetsMutation, BandSyncSongsFromGoogleSheetsMutationVariables>;

/**
 * __useBandSyncSongsFromGoogleSheetsMutation__
 *
 * To run a mutation, you first call `useBandSyncSongsFromGoogleSheetsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandSyncSongsFromGoogleSheetsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandSyncSongsFromGoogleSheetsMutation, { data, loading, error }] = useBandSyncSongsFromGoogleSheetsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBandSyncSongsFromGoogleSheetsMutation(baseOptions?: Apollo.MutationHookOptions<BandSyncSongsFromGoogleSheetsMutation, BandSyncSongsFromGoogleSheetsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandSyncSongsFromGoogleSheetsMutation, BandSyncSongsFromGoogleSheetsMutationVariables>(BandSyncSongsFromGoogleSheetsDocument, options);
      }
export type BandSyncSongsFromGoogleSheetsMutationHookResult = ReturnType<typeof useBandSyncSongsFromGoogleSheetsMutation>;
export type BandSyncSongsFromGoogleSheetsMutationResult = Apollo.MutationResult<BandSyncSongsFromGoogleSheetsMutation>;
export type BandSyncSongsFromGoogleSheetsMutationOptions = Apollo.BaseMutationOptions<BandSyncSongsFromGoogleSheetsMutation, BandSyncSongsFromGoogleSheetsMutationVariables>;
export const BandCreateSongDocument = gql`
    mutation bandCreateSong($data: CreateSongInput!) {
  createSong(data: $data) {
    id
  }
}
    `;
export type BandCreateSongMutationFn = Apollo.MutationFunction<BandCreateSongMutation, BandCreateSongMutationVariables>;

/**
 * __useBandCreateSongMutation__
 *
 * To run a mutation, you first call `useBandCreateSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandCreateSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandCreateSongMutation, { data, loading, error }] = useBandCreateSongMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useBandCreateSongMutation(baseOptions?: Apollo.MutationHookOptions<BandCreateSongMutation, BandCreateSongMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandCreateSongMutation, BandCreateSongMutationVariables>(BandCreateSongDocument, options);
      }
export type BandCreateSongMutationHookResult = ReturnType<typeof useBandCreateSongMutation>;
export type BandCreateSongMutationResult = Apollo.MutationResult<BandCreateSongMutation>;
export type BandCreateSongMutationOptions = Apollo.BaseMutationOptions<BandCreateSongMutation, BandCreateSongMutationVariables>;
export const BandUpdateSongDocument = gql`
    mutation bandUpdateSong($songId: Int!, $data: UpdateSongInput!) {
  updateSong(songId: $songId, data: $data) {
    id
  }
}
    `;
export type BandUpdateSongMutationFn = Apollo.MutationFunction<BandUpdateSongMutation, BandUpdateSongMutationVariables>;

/**
 * __useBandUpdateSongMutation__
 *
 * To run a mutation, you first call `useBandUpdateSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandUpdateSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandUpdateSongMutation, { data, loading, error }] = useBandUpdateSongMutation({
 *   variables: {
 *      songId: // value for 'songId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useBandUpdateSongMutation(baseOptions?: Apollo.MutationHookOptions<BandUpdateSongMutation, BandUpdateSongMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandUpdateSongMutation, BandUpdateSongMutationVariables>(BandUpdateSongDocument, options);
      }
export type BandUpdateSongMutationHookResult = ReturnType<typeof useBandUpdateSongMutation>;
export type BandUpdateSongMutationResult = Apollo.MutationResult<BandUpdateSongMutation>;
export type BandUpdateSongMutationOptions = Apollo.BaseMutationOptions<BandUpdateSongMutation, BandUpdateSongMutationVariables>;
export const BandDeleteSongDocument = gql`
    mutation bandDeleteSong($songId: Int!) {
  deleteSong(songId: $songId) {
    id
  }
}
    `;
export type BandDeleteSongMutationFn = Apollo.MutationFunction<BandDeleteSongMutation, BandDeleteSongMutationVariables>;

/**
 * __useBandDeleteSongMutation__
 *
 * To run a mutation, you first call `useBandDeleteSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandDeleteSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandDeleteSongMutation, { data, loading, error }] = useBandDeleteSongMutation({
 *   variables: {
 *      songId: // value for 'songId'
 *   },
 * });
 */
export function useBandDeleteSongMutation(baseOptions?: Apollo.MutationHookOptions<BandDeleteSongMutation, BandDeleteSongMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandDeleteSongMutation, BandDeleteSongMutationVariables>(BandDeleteSongDocument, options);
      }
export type BandDeleteSongMutationHookResult = ReturnType<typeof useBandDeleteSongMutation>;
export type BandDeleteSongMutationResult = Apollo.MutationResult<BandDeleteSongMutation>;
export type BandDeleteSongMutationOptions = Apollo.BaseMutationOptions<BandDeleteSongMutation, BandDeleteSongMutationVariables>;
export const BandCreateLeadSheetDocument = gql`
    mutation bandCreateLeadSheet($songId: Int!) {
  createLeadSheet(songId: $songId) {
    id
  }
}
    `;
export type BandCreateLeadSheetMutationFn = Apollo.MutationFunction<BandCreateLeadSheetMutation, BandCreateLeadSheetMutationVariables>;

/**
 * __useBandCreateLeadSheetMutation__
 *
 * To run a mutation, you first call `useBandCreateLeadSheetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandCreateLeadSheetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandCreateLeadSheetMutation, { data, loading, error }] = useBandCreateLeadSheetMutation({
 *   variables: {
 *      songId: // value for 'songId'
 *   },
 * });
 */
export function useBandCreateLeadSheetMutation(baseOptions?: Apollo.MutationHookOptions<BandCreateLeadSheetMutation, BandCreateLeadSheetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandCreateLeadSheetMutation, BandCreateLeadSheetMutationVariables>(BandCreateLeadSheetDocument, options);
      }
export type BandCreateLeadSheetMutationHookResult = ReturnType<typeof useBandCreateLeadSheetMutation>;
export type BandCreateLeadSheetMutationResult = Apollo.MutationResult<BandCreateLeadSheetMutation>;
export type BandCreateLeadSheetMutationOptions = Apollo.BaseMutationOptions<BandCreateLeadSheetMutation, BandCreateLeadSheetMutationVariables>;
export const BandUpdateLeadSheetDocument = gql`
    mutation bandUpdateLeadSheet($leadSheetId: Int!, $data: UpdateLeadSheetInput!) {
  updateLeadSheet(leadSheetId: $leadSheetId, data: $data) {
    id
  }
}
    `;
export type BandUpdateLeadSheetMutationFn = Apollo.MutationFunction<BandUpdateLeadSheetMutation, BandUpdateLeadSheetMutationVariables>;

/**
 * __useBandUpdateLeadSheetMutation__
 *
 * To run a mutation, you first call `useBandUpdateLeadSheetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandUpdateLeadSheetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandUpdateLeadSheetMutation, { data, loading, error }] = useBandUpdateLeadSheetMutation({
 *   variables: {
 *      leadSheetId: // value for 'leadSheetId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useBandUpdateLeadSheetMutation(baseOptions?: Apollo.MutationHookOptions<BandUpdateLeadSheetMutation, BandUpdateLeadSheetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandUpdateLeadSheetMutation, BandUpdateLeadSheetMutationVariables>(BandUpdateLeadSheetDocument, options);
      }
export type BandUpdateLeadSheetMutationHookResult = ReturnType<typeof useBandUpdateLeadSheetMutation>;
export type BandUpdateLeadSheetMutationResult = Apollo.MutationResult<BandUpdateLeadSheetMutation>;
export type BandUpdateLeadSheetMutationOptions = Apollo.BaseMutationOptions<BandUpdateLeadSheetMutation, BandUpdateLeadSheetMutationVariables>;
export const BandDeleteLeadSheetDocument = gql`
    mutation bandDeleteLeadSheet($leadSheetId: Int!) {
  deleteLeadSheet(leadSheetId: $leadSheetId) {
    id
  }
}
    `;
export type BandDeleteLeadSheetMutationFn = Apollo.MutationFunction<BandDeleteLeadSheetMutation, BandDeleteLeadSheetMutationVariables>;

/**
 * __useBandDeleteLeadSheetMutation__
 *
 * To run a mutation, you first call `useBandDeleteLeadSheetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandDeleteLeadSheetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandDeleteLeadSheetMutation, { data, loading, error }] = useBandDeleteLeadSheetMutation({
 *   variables: {
 *      leadSheetId: // value for 'leadSheetId'
 *   },
 * });
 */
export function useBandDeleteLeadSheetMutation(baseOptions?: Apollo.MutationHookOptions<BandDeleteLeadSheetMutation, BandDeleteLeadSheetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandDeleteLeadSheetMutation, BandDeleteLeadSheetMutationVariables>(BandDeleteLeadSheetDocument, options);
      }
export type BandDeleteLeadSheetMutationHookResult = ReturnType<typeof useBandDeleteLeadSheetMutation>;
export type BandDeleteLeadSheetMutationResult = Apollo.MutationResult<BandDeleteLeadSheetMutation>;
export type BandDeleteLeadSheetMutationOptions = Apollo.BaseMutationOptions<BandDeleteLeadSheetMutation, BandDeleteLeadSheetMutationVariables>;
export const BandCreateLeadSheetSectionDocument = gql`
    mutation bandCreateLeadSheetSection($leadSheetId: Int!, $data: CreateLeadSheetSectionInput!) {
  createLeadSheetSection(leadSheetId: $leadSheetId, data: $data) {
    ...LeadSheetSection
  }
}
    ${LeadSheetSectionFragmentDoc}`;
export type BandCreateLeadSheetSectionMutationFn = Apollo.MutationFunction<BandCreateLeadSheetSectionMutation, BandCreateLeadSheetSectionMutationVariables>;

/**
 * __useBandCreateLeadSheetSectionMutation__
 *
 * To run a mutation, you first call `useBandCreateLeadSheetSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandCreateLeadSheetSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandCreateLeadSheetSectionMutation, { data, loading, error }] = useBandCreateLeadSheetSectionMutation({
 *   variables: {
 *      leadSheetId: // value for 'leadSheetId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useBandCreateLeadSheetSectionMutation(baseOptions?: Apollo.MutationHookOptions<BandCreateLeadSheetSectionMutation, BandCreateLeadSheetSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandCreateLeadSheetSectionMutation, BandCreateLeadSheetSectionMutationVariables>(BandCreateLeadSheetSectionDocument, options);
      }
export type BandCreateLeadSheetSectionMutationHookResult = ReturnType<typeof useBandCreateLeadSheetSectionMutation>;
export type BandCreateLeadSheetSectionMutationResult = Apollo.MutationResult<BandCreateLeadSheetSectionMutation>;
export type BandCreateLeadSheetSectionMutationOptions = Apollo.BaseMutationOptions<BandCreateLeadSheetSectionMutation, BandCreateLeadSheetSectionMutationVariables>;
export const BandUpdateLeadSheetSectionDocument = gql`
    mutation bandUpdateLeadSheetSection($leadSheetSectionId: Int!, $data: UpdateLeadSheetSectionInput!) {
  updateLeadSheetSection(leadSheetSectionId: $leadSheetSectionId, data: $data) {
    ...LeadSheetSection
  }
}
    ${LeadSheetSectionFragmentDoc}`;
export type BandUpdateLeadSheetSectionMutationFn = Apollo.MutationFunction<BandUpdateLeadSheetSectionMutation, BandUpdateLeadSheetSectionMutationVariables>;

/**
 * __useBandUpdateLeadSheetSectionMutation__
 *
 * To run a mutation, you first call `useBandUpdateLeadSheetSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandUpdateLeadSheetSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandUpdateLeadSheetSectionMutation, { data, loading, error }] = useBandUpdateLeadSheetSectionMutation({
 *   variables: {
 *      leadSheetSectionId: // value for 'leadSheetSectionId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useBandUpdateLeadSheetSectionMutation(baseOptions?: Apollo.MutationHookOptions<BandUpdateLeadSheetSectionMutation, BandUpdateLeadSheetSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandUpdateLeadSheetSectionMutation, BandUpdateLeadSheetSectionMutationVariables>(BandUpdateLeadSheetSectionDocument, options);
      }
export type BandUpdateLeadSheetSectionMutationHookResult = ReturnType<typeof useBandUpdateLeadSheetSectionMutation>;
export type BandUpdateLeadSheetSectionMutationResult = Apollo.MutationResult<BandUpdateLeadSheetSectionMutation>;
export type BandUpdateLeadSheetSectionMutationOptions = Apollo.BaseMutationOptions<BandUpdateLeadSheetSectionMutation, BandUpdateLeadSheetSectionMutationVariables>;
export const BandDeleteLeadSheetSectionDocument = gql`
    mutation bandDeleteLeadSheetSection($leadSheetSectionId: Int!) {
  deleteLeadSheetSection(leadSheetSectionId: $leadSheetSectionId) {
    id
  }
}
    `;
export type BandDeleteLeadSheetSectionMutationFn = Apollo.MutationFunction<BandDeleteLeadSheetSectionMutation, BandDeleteLeadSheetSectionMutationVariables>;

/**
 * __useBandDeleteLeadSheetSectionMutation__
 *
 * To run a mutation, you first call `useBandDeleteLeadSheetSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBandDeleteLeadSheetSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bandDeleteLeadSheetSectionMutation, { data, loading, error }] = useBandDeleteLeadSheetSectionMutation({
 *   variables: {
 *      leadSheetSectionId: // value for 'leadSheetSectionId'
 *   },
 * });
 */
export function useBandDeleteLeadSheetSectionMutation(baseOptions?: Apollo.MutationHookOptions<BandDeleteLeadSheetSectionMutation, BandDeleteLeadSheetSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BandDeleteLeadSheetSectionMutation, BandDeleteLeadSheetSectionMutationVariables>(BandDeleteLeadSheetSectionDocument, options);
      }
export type BandDeleteLeadSheetSectionMutationHookResult = ReturnType<typeof useBandDeleteLeadSheetSectionMutation>;
export type BandDeleteLeadSheetSectionMutationResult = Apollo.MutationResult<BandDeleteLeadSheetSectionMutation>;
export type BandDeleteLeadSheetSectionMutationOptions = Apollo.BaseMutationOptions<BandDeleteLeadSheetSectionMutation, BandDeleteLeadSheetSectionMutationVariables>;
export const StartMultipartUploadDocument = gql`
    mutation StartMultipartUpload($fileName: String!, $fileType: String!, $fileSize: Int!) {
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
export type StartMultipartUploadMutationFn = Apollo.MutationFunction<StartMultipartUploadMutation, StartMultipartUploadMutationVariables>;

/**
 * __useStartMultipartUploadMutation__
 *
 * To run a mutation, you first call `useStartMultipartUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartMultipartUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startMultipartUploadMutation, { data, loading, error }] = useStartMultipartUploadMutation({
 *   variables: {
 *      fileName: // value for 'fileName'
 *      fileType: // value for 'fileType'
 *      fileSize: // value for 'fileSize'
 *   },
 * });
 */
export function useStartMultipartUploadMutation(baseOptions?: Apollo.MutationHookOptions<StartMultipartUploadMutation, StartMultipartUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartMultipartUploadMutation, StartMultipartUploadMutationVariables>(StartMultipartUploadDocument, options);
      }
export type StartMultipartUploadMutationHookResult = ReturnType<typeof useStartMultipartUploadMutation>;
export type StartMultipartUploadMutationResult = Apollo.MutationResult<StartMultipartUploadMutation>;
export type StartMultipartUploadMutationOptions = Apollo.BaseMutationOptions<StartMultipartUploadMutation, StartMultipartUploadMutationVariables>;
export const GetPresignedUrlsDocument = gql`
    mutation GetPresignedUrls($uploadId: ID!, $key: String!, $parts: Int!) {
  getPresignedUrls(uploadId: $uploadId, key: $key, parts: $parts)
}
    `;
export type GetPresignedUrlsMutationFn = Apollo.MutationFunction<GetPresignedUrlsMutation, GetPresignedUrlsMutationVariables>;

/**
 * __useGetPresignedUrlsMutation__
 *
 * To run a mutation, you first call `useGetPresignedUrlsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetPresignedUrlsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getPresignedUrlsMutation, { data, loading, error }] = useGetPresignedUrlsMutation({
 *   variables: {
 *      uploadId: // value for 'uploadId'
 *      key: // value for 'key'
 *      parts: // value for 'parts'
 *   },
 * });
 */
export function useGetPresignedUrlsMutation(baseOptions?: Apollo.MutationHookOptions<GetPresignedUrlsMutation, GetPresignedUrlsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetPresignedUrlsMutation, GetPresignedUrlsMutationVariables>(GetPresignedUrlsDocument, options);
      }
export type GetPresignedUrlsMutationHookResult = ReturnType<typeof useGetPresignedUrlsMutation>;
export type GetPresignedUrlsMutationResult = Apollo.MutationResult<GetPresignedUrlsMutation>;
export type GetPresignedUrlsMutationOptions = Apollo.BaseMutationOptions<GetPresignedUrlsMutation, GetPresignedUrlsMutationVariables>;
export const CompleteMultipartUploadDocument = gql`
    mutation CompleteMultipartUpload($uploadId: ID!, $key: String!, $parts: [UploadPartInput!]!) {
  completeMultipartUpload(uploadId: $uploadId, key: $key, parts: $parts) {
    ...Upload
  }
}
    ${UploadFragmentDoc}`;
export type CompleteMultipartUploadMutationFn = Apollo.MutationFunction<CompleteMultipartUploadMutation, CompleteMultipartUploadMutationVariables>;

/**
 * __useCompleteMultipartUploadMutation__
 *
 * To run a mutation, you first call `useCompleteMultipartUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteMultipartUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeMultipartUploadMutation, { data, loading, error }] = useCompleteMultipartUploadMutation({
 *   variables: {
 *      uploadId: // value for 'uploadId'
 *      key: // value for 'key'
 *      parts: // value for 'parts'
 *   },
 * });
 */
export function useCompleteMultipartUploadMutation(baseOptions?: Apollo.MutationHookOptions<CompleteMultipartUploadMutation, CompleteMultipartUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteMultipartUploadMutation, CompleteMultipartUploadMutationVariables>(CompleteMultipartUploadDocument, options);
      }
export type CompleteMultipartUploadMutationHookResult = ReturnType<typeof useCompleteMultipartUploadMutation>;
export type CompleteMultipartUploadMutationResult = Apollo.MutationResult<CompleteMultipartUploadMutation>;
export type CompleteMultipartUploadMutationOptions = Apollo.BaseMutationOptions<CompleteMultipartUploadMutation, CompleteMultipartUploadMutationVariables>;
export const DeleteUploadDocument = gql`
    mutation DeleteUpload($id: Int!) {
  deleteUpload(id: $id) {
    id
  }
}
    `;
export type DeleteUploadMutationFn = Apollo.MutationFunction<DeleteUploadMutation, DeleteUploadMutationVariables>;

/**
 * __useDeleteUploadMutation__
 *
 * To run a mutation, you first call `useDeleteUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUploadMutation, { data, loading, error }] = useDeleteUploadMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUploadMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUploadMutation, DeleteUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUploadMutation, DeleteUploadMutationVariables>(DeleteUploadDocument, options);
      }
export type DeleteUploadMutationHookResult = ReturnType<typeof useDeleteUploadMutation>;
export type DeleteUploadMutationResult = Apollo.MutationResult<DeleteUploadMutation>;
export type DeleteUploadMutationOptions = Apollo.BaseMutationOptions<DeleteUploadMutation, DeleteUploadMutationVariables>;
export const BandGigsDocument = gql`
    query bandGigs {
  gigs {
    ...Gig
  }
}
    ${GigFragmentDoc}`;

/**
 * __useBandGigsQuery__
 *
 * To run a query within a React component, call `useBandGigsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBandGigsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBandGigsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBandGigsQuery(baseOptions?: Apollo.QueryHookOptions<BandGigsQuery, BandGigsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BandGigsQuery, BandGigsQueryVariables>(BandGigsDocument, options);
      }
export function useBandGigsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BandGigsQuery, BandGigsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BandGigsQuery, BandGigsQueryVariables>(BandGigsDocument, options);
        }
export function useBandGigsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BandGigsQuery, BandGigsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BandGigsQuery, BandGigsQueryVariables>(BandGigsDocument, options);
        }
export type BandGigsQueryHookResult = ReturnType<typeof useBandGigsQuery>;
export type BandGigsLazyQueryHookResult = ReturnType<typeof useBandGigsLazyQuery>;
export type BandGigsSuspenseQueryHookResult = ReturnType<typeof useBandGigsSuspenseQuery>;
export type BandGigsQueryResult = Apollo.QueryResult<BandGigsQuery, BandGigsQueryVariables>;
export const BandSongsDocument = gql`
    query bandSongs {
  songs {
    ...Song
  }
}
    ${SongFragmentDoc}`;

/**
 * __useBandSongsQuery__
 *
 * To run a query within a React component, call `useBandSongsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBandSongsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBandSongsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBandSongsQuery(baseOptions?: Apollo.QueryHookOptions<BandSongsQuery, BandSongsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BandSongsQuery, BandSongsQueryVariables>(BandSongsDocument, options);
      }
export function useBandSongsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BandSongsQuery, BandSongsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BandSongsQuery, BandSongsQueryVariables>(BandSongsDocument, options);
        }
export function useBandSongsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BandSongsQuery, BandSongsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BandSongsQuery, BandSongsQueryVariables>(BandSongsDocument, options);
        }
export type BandSongsQueryHookResult = ReturnType<typeof useBandSongsQuery>;
export type BandSongsLazyQueryHookResult = ReturnType<typeof useBandSongsLazyQuery>;
export type BandSongsSuspenseQueryHookResult = ReturnType<typeof useBandSongsSuspenseQuery>;
export type BandSongsQueryResult = Apollo.QueryResult<BandSongsQuery, BandSongsQueryVariables>;
export const BandSongDocument = gql`
    query bandSong($id: Int!) {
  song(id: $id) {
    ...Song
  }
}
    ${SongFragmentDoc}`;

/**
 * __useBandSongQuery__
 *
 * To run a query within a React component, call `useBandSongQuery` and pass it any options that fit your needs.
 * When your component renders, `useBandSongQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBandSongQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBandSongQuery(baseOptions: Apollo.QueryHookOptions<BandSongQuery, BandSongQueryVariables> & ({ variables: BandSongQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BandSongQuery, BandSongQueryVariables>(BandSongDocument, options);
      }
export function useBandSongLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BandSongQuery, BandSongQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BandSongQuery, BandSongQueryVariables>(BandSongDocument, options);
        }
export function useBandSongSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BandSongQuery, BandSongQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BandSongQuery, BandSongQueryVariables>(BandSongDocument, options);
        }
export type BandSongQueryHookResult = ReturnType<typeof useBandSongQuery>;
export type BandSongLazyQueryHookResult = ReturnType<typeof useBandSongLazyQuery>;
export type BandSongSuspenseQueryHookResult = ReturnType<typeof useBandSongSuspenseQuery>;
export type BandSongQueryResult = Apollo.QueryResult<BandSongQuery, BandSongQueryVariables>;
export const BandSongWithLeadSheetDocument = gql`
    query bandSongWithLeadSheet($id: Int!) {
  song(id: $id) {
    ...Song
    leadSheet {
      ...LeadSheet
    }
  }
}
    ${SongFragmentDoc}
${LeadSheetFragmentDoc}`;

/**
 * __useBandSongWithLeadSheetQuery__
 *
 * To run a query within a React component, call `useBandSongWithLeadSheetQuery` and pass it any options that fit your needs.
 * When your component renders, `useBandSongWithLeadSheetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBandSongWithLeadSheetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBandSongWithLeadSheetQuery(baseOptions: Apollo.QueryHookOptions<BandSongWithLeadSheetQuery, BandSongWithLeadSheetQueryVariables> & ({ variables: BandSongWithLeadSheetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BandSongWithLeadSheetQuery, BandSongWithLeadSheetQueryVariables>(BandSongWithLeadSheetDocument, options);
      }
export function useBandSongWithLeadSheetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BandSongWithLeadSheetQuery, BandSongWithLeadSheetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BandSongWithLeadSheetQuery, BandSongWithLeadSheetQueryVariables>(BandSongWithLeadSheetDocument, options);
        }
export function useBandSongWithLeadSheetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BandSongWithLeadSheetQuery, BandSongWithLeadSheetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BandSongWithLeadSheetQuery, BandSongWithLeadSheetQueryVariables>(BandSongWithLeadSheetDocument, options);
        }
export type BandSongWithLeadSheetQueryHookResult = ReturnType<typeof useBandSongWithLeadSheetQuery>;
export type BandSongWithLeadSheetLazyQueryHookResult = ReturnType<typeof useBandSongWithLeadSheetLazyQuery>;
export type BandSongWithLeadSheetSuspenseQueryHookResult = ReturnType<typeof useBandSongWithLeadSheetSuspenseQuery>;
export type BandSongWithLeadSheetQueryResult = Apollo.QueryResult<BandSongWithLeadSheetQuery, BandSongWithLeadSheetQueryVariables>;
export const UploadsDocument = gql`
    query uploads {
  uploads {
    ...Upload
  }
}
    ${UploadFragmentDoc}`;

/**
 * __useUploadsQuery__
 *
 * To run a query within a React component, call `useUploadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUploadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUploadsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUploadsQuery(baseOptions?: Apollo.QueryHookOptions<UploadsQuery, UploadsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UploadsQuery, UploadsQueryVariables>(UploadsDocument, options);
      }
export function useUploadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UploadsQuery, UploadsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UploadsQuery, UploadsQueryVariables>(UploadsDocument, options);
        }
export function useUploadsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UploadsQuery, UploadsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UploadsQuery, UploadsQueryVariables>(UploadsDocument, options);
        }
export type UploadsQueryHookResult = ReturnType<typeof useUploadsQuery>;
export type UploadsLazyQueryHookResult = ReturnType<typeof useUploadsLazyQuery>;
export type UploadsSuspenseQueryHookResult = ReturnType<typeof useUploadsSuspenseQuery>;
export type UploadsQueryResult = Apollo.QueryResult<UploadsQuery, UploadsQueryVariables>;
export const UploadDocument = gql`
    query upload($id: Int!) {
  upload(id: $id) {
    ...Upload
  }
}
    ${UploadFragmentDoc}`;

/**
 * __useUploadQuery__
 *
 * To run a query within a React component, call `useUploadQuery` and pass it any options that fit your needs.
 * When your component renders, `useUploadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUploadQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUploadQuery(baseOptions: Apollo.QueryHookOptions<UploadQuery, UploadQueryVariables> & ({ variables: UploadQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UploadQuery, UploadQueryVariables>(UploadDocument, options);
      }
export function useUploadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UploadQuery, UploadQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UploadQuery, UploadQueryVariables>(UploadDocument, options);
        }
export function useUploadSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UploadQuery, UploadQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UploadQuery, UploadQueryVariables>(UploadDocument, options);
        }
export type UploadQueryHookResult = ReturnType<typeof useUploadQuery>;
export type UploadLazyQueryHookResult = ReturnType<typeof useUploadLazyQuery>;
export type UploadSuspenseQueryHookResult = ReturnType<typeof useUploadSuspenseQuery>;
export type UploadQueryResult = Apollo.QueryResult<UploadQuery, UploadQueryVariables>;
export const AdminChangeEventActiveEngagementDocument = gql`
    mutation adminChangeEventActiveEngagement($eventId: Int!, $engagementId: Int) {
  changeEventActiveEngagement(engagementId: $engagementId, eventId: $eventId) {
    ...AdminEvent
  }
}
    ${AdminEventFragmentDoc}`;
export type AdminChangeEventActiveEngagementMutationFn = Apollo.MutationFunction<AdminChangeEventActiveEngagementMutation, AdminChangeEventActiveEngagementMutationVariables>;

/**
 * __useAdminChangeEventActiveEngagementMutation__
 *
 * To run a mutation, you first call `useAdminChangeEventActiveEngagementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminChangeEventActiveEngagementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminChangeEventActiveEngagementMutation, { data, loading, error }] = useAdminChangeEventActiveEngagementMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      engagementId: // value for 'engagementId'
 *   },
 * });
 */
export function useAdminChangeEventActiveEngagementMutation(baseOptions?: Apollo.MutationHookOptions<AdminChangeEventActiveEngagementMutation, AdminChangeEventActiveEngagementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminChangeEventActiveEngagementMutation, AdminChangeEventActiveEngagementMutationVariables>(AdminChangeEventActiveEngagementDocument, options);
      }
export type AdminChangeEventActiveEngagementMutationHookResult = ReturnType<typeof useAdminChangeEventActiveEngagementMutation>;
export type AdminChangeEventActiveEngagementMutationResult = Apollo.MutationResult<AdminChangeEventActiveEngagementMutation>;
export type AdminChangeEventActiveEngagementMutationOptions = Apollo.BaseMutationOptions<AdminChangeEventActiveEngagementMutation, AdminChangeEventActiveEngagementMutationVariables>;
export const AdminCreateEngagementDocument = gql`
    mutation adminCreateEngagement($eventId: Int!, $input: CreateEngagementInput!) {
  createEngagement(eventId: $eventId, data: $input) {
    ...AdminEngagement
  }
}
    ${AdminEngagementFragmentDoc}`;
export type AdminCreateEngagementMutationFn = Apollo.MutationFunction<AdminCreateEngagementMutation, AdminCreateEngagementMutationVariables>;

/**
 * __useAdminCreateEngagementMutation__
 *
 * To run a mutation, you first call `useAdminCreateEngagementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateEngagementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateEngagementMutation, { data, loading, error }] = useAdminCreateEngagementMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminCreateEngagementMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateEngagementMutation, AdminCreateEngagementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateEngagementMutation, AdminCreateEngagementMutationVariables>(AdminCreateEngagementDocument, options);
      }
export type AdminCreateEngagementMutationHookResult = ReturnType<typeof useAdminCreateEngagementMutation>;
export type AdminCreateEngagementMutationResult = Apollo.MutationResult<AdminCreateEngagementMutation>;
export type AdminCreateEngagementMutationOptions = Apollo.BaseMutationOptions<AdminCreateEngagementMutation, AdminCreateEngagementMutationVariables>;
export const AdminCreateEventDocument = gql`
    mutation adminCreateEvent($input: CreateEventInput!) {
  createEvent(data: $input) {
    ...AdminEvent
  }
}
    ${AdminEventFragmentDoc}`;
export type AdminCreateEventMutationFn = Apollo.MutationFunction<AdminCreateEventMutation, AdminCreateEventMutationVariables>;

/**
 * __useAdminCreateEventMutation__
 *
 * To run a mutation, you first call `useAdminCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateEventMutation, { data, loading, error }] = useAdminCreateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateEventMutation, AdminCreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateEventMutation, AdminCreateEventMutationVariables>(AdminCreateEventDocument, options);
      }
export type AdminCreateEventMutationHookResult = ReturnType<typeof useAdminCreateEventMutation>;
export type AdminCreateEventMutationResult = Apollo.MutationResult<AdminCreateEventMutation>;
export type AdminCreateEventMutationOptions = Apollo.BaseMutationOptions<AdminCreateEventMutation, AdminCreateEventMutationVariables>;
export const AdminCreatePresignedUrlDocument = gql`
    mutation adminCreatePresignedUrl($mimeType: String!) {
  adminCreatePresignedUrl(mimeType: $mimeType) {
    url
    key
  }
}
    `;
export type AdminCreatePresignedUrlMutationFn = Apollo.MutationFunction<AdminCreatePresignedUrlMutation, AdminCreatePresignedUrlMutationVariables>;

/**
 * __useAdminCreatePresignedUrlMutation__
 *
 * To run a mutation, you first call `useAdminCreatePresignedUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreatePresignedUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreatePresignedUrlMutation, { data, loading, error }] = useAdminCreatePresignedUrlMutation({
 *   variables: {
 *      mimeType: // value for 'mimeType'
 *   },
 * });
 */
export function useAdminCreatePresignedUrlMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreatePresignedUrlMutation, AdminCreatePresignedUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreatePresignedUrlMutation, AdminCreatePresignedUrlMutationVariables>(AdminCreatePresignedUrlDocument, options);
      }
export type AdminCreatePresignedUrlMutationHookResult = ReturnType<typeof useAdminCreatePresignedUrlMutation>;
export type AdminCreatePresignedUrlMutationResult = Apollo.MutationResult<AdminCreatePresignedUrlMutation>;
export type AdminCreatePresignedUrlMutationOptions = Apollo.BaseMutationOptions<AdminCreatePresignedUrlMutation, AdminCreatePresignedUrlMutationVariables>;
export const AdminDeleteEngagementDocument = gql`
    mutation adminDeleteEngagement($id: Int!) {
  deleteEngagement(engagementId: $id) {
    ...AdminEngagement
  }
}
    ${AdminEngagementFragmentDoc}`;
export type AdminDeleteEngagementMutationFn = Apollo.MutationFunction<AdminDeleteEngagementMutation, AdminDeleteEngagementMutationVariables>;

/**
 * __useAdminDeleteEngagementMutation__
 *
 * To run a mutation, you first call `useAdminDeleteEngagementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteEngagementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteEngagementMutation, { data, loading, error }] = useAdminDeleteEngagementMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminDeleteEngagementMutation(baseOptions?: Apollo.MutationHookOptions<AdminDeleteEngagementMutation, AdminDeleteEngagementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminDeleteEngagementMutation, AdminDeleteEngagementMutationVariables>(AdminDeleteEngagementDocument, options);
      }
export type AdminDeleteEngagementMutationHookResult = ReturnType<typeof useAdminDeleteEngagementMutation>;
export type AdminDeleteEngagementMutationResult = Apollo.MutationResult<AdminDeleteEngagementMutation>;
export type AdminDeleteEngagementMutationOptions = Apollo.BaseMutationOptions<AdminDeleteEngagementMutation, AdminDeleteEngagementMutationVariables>;
export const AdminDeleteEventDocument = gql`
    mutation adminDeleteEvent($id: Int!) {
  deleteEvent(eventId: $id) {
    ...AdminEvent
  }
}
    ${AdminEventFragmentDoc}`;
export type AdminDeleteEventMutationFn = Apollo.MutationFunction<AdminDeleteEventMutation, AdminDeleteEventMutationVariables>;

/**
 * __useAdminDeleteEventMutation__
 *
 * To run a mutation, you first call `useAdminDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteEventMutation, { data, loading, error }] = useAdminDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminDeleteEventMutation(baseOptions?: Apollo.MutationHookOptions<AdminDeleteEventMutation, AdminDeleteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminDeleteEventMutation, AdminDeleteEventMutationVariables>(AdminDeleteEventDocument, options);
      }
export type AdminDeleteEventMutationHookResult = ReturnType<typeof useAdminDeleteEventMutation>;
export type AdminDeleteEventMutationResult = Apollo.MutationResult<AdminDeleteEventMutation>;
export type AdminDeleteEventMutationOptions = Apollo.BaseMutationOptions<AdminDeleteEventMutation, AdminDeleteEventMutationVariables>;
export const AdminDeleteFromS3Document = gql`
    mutation adminDeleteFromS3($key: String!) {
  adminDeleteFromS3(key: $key)
}
    `;
export type AdminDeleteFromS3MutationFn = Apollo.MutationFunction<AdminDeleteFromS3Mutation, AdminDeleteFromS3MutationVariables>;

/**
 * __useAdminDeleteFromS3Mutation__
 *
 * To run a mutation, you first call `useAdminDeleteFromS3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteFromS3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteFromS3Mutation, { data, loading, error }] = useAdminDeleteFromS3Mutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useAdminDeleteFromS3Mutation(baseOptions?: Apollo.MutationHookOptions<AdminDeleteFromS3Mutation, AdminDeleteFromS3MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminDeleteFromS3Mutation, AdminDeleteFromS3MutationVariables>(AdminDeleteFromS3Document, options);
      }
export type AdminDeleteFromS3MutationHookResult = ReturnType<typeof useAdminDeleteFromS3Mutation>;
export type AdminDeleteFromS3MutationResult = Apollo.MutationResult<AdminDeleteFromS3Mutation>;
export type AdminDeleteFromS3MutationOptions = Apollo.BaseMutationOptions<AdminDeleteFromS3Mutation, AdminDeleteFromS3MutationVariables>;
export const AdminDeleteSubmissionDocument = gql`
    mutation adminDeleteSubmission($id: Int!) {
  deleteSubmission(submissionId: $id) {
    ...AdminSubmission
  }
}
    ${AdminSubmissionFragmentDoc}`;
export type AdminDeleteSubmissionMutationFn = Apollo.MutationFunction<AdminDeleteSubmissionMutation, AdminDeleteSubmissionMutationVariables>;

/**
 * __useAdminDeleteSubmissionMutation__
 *
 * To run a mutation, you first call `useAdminDeleteSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteSubmissionMutation, { data, loading, error }] = useAdminDeleteSubmissionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminDeleteSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<AdminDeleteSubmissionMutation, AdminDeleteSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminDeleteSubmissionMutation, AdminDeleteSubmissionMutationVariables>(AdminDeleteSubmissionDocument, options);
      }
export type AdminDeleteSubmissionMutationHookResult = ReturnType<typeof useAdminDeleteSubmissionMutation>;
export type AdminDeleteSubmissionMutationResult = Apollo.MutationResult<AdminDeleteSubmissionMutation>;
export type AdminDeleteSubmissionMutationOptions = Apollo.BaseMutationOptions<AdminDeleteSubmissionMutation, AdminDeleteSubmissionMutationVariables>;
export const AdminGenerateImageDocument = gql`
    mutation adminGenerateImage($data: GenerateImageInput!) {
  adminGenerateImage(data: $data) {
    uri
    error
  }
}
    `;
export type AdminGenerateImageMutationFn = Apollo.MutationFunction<AdminGenerateImageMutation, AdminGenerateImageMutationVariables>;

/**
 * __useAdminGenerateImageMutation__
 *
 * To run a mutation, you first call `useAdminGenerateImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminGenerateImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminGenerateImageMutation, { data, loading, error }] = useAdminGenerateImageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAdminGenerateImageMutation(baseOptions?: Apollo.MutationHookOptions<AdminGenerateImageMutation, AdminGenerateImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminGenerateImageMutation, AdminGenerateImageMutationVariables>(AdminGenerateImageDocument, options);
      }
export type AdminGenerateImageMutationHookResult = ReturnType<typeof useAdminGenerateImageMutation>;
export type AdminGenerateImageMutationResult = Apollo.MutationResult<AdminGenerateImageMutation>;
export type AdminGenerateImageMutationOptions = Apollo.BaseMutationOptions<AdminGenerateImageMutation, AdminGenerateImageMutationVariables>;
export const AdminMoveEngagementDocument = gql`
    mutation adminMoveEngagement($engagementId: Int!, $direction: String!) {
  moveEngagement(engagementId: $engagementId, direction: $direction) {
    ...AdminEngagement
  }
}
    ${AdminEngagementFragmentDoc}`;
export type AdminMoveEngagementMutationFn = Apollo.MutationFunction<AdminMoveEngagementMutation, AdminMoveEngagementMutationVariables>;

/**
 * __useAdminMoveEngagementMutation__
 *
 * To run a mutation, you first call `useAdminMoveEngagementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminMoveEngagementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminMoveEngagementMutation, { data, loading, error }] = useAdminMoveEngagementMutation({
 *   variables: {
 *      engagementId: // value for 'engagementId'
 *      direction: // value for 'direction'
 *   },
 * });
 */
export function useAdminMoveEngagementMutation(baseOptions?: Apollo.MutationHookOptions<AdminMoveEngagementMutation, AdminMoveEngagementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminMoveEngagementMutation, AdminMoveEngagementMutationVariables>(AdminMoveEngagementDocument, options);
      }
export type AdminMoveEngagementMutationHookResult = ReturnType<typeof useAdminMoveEngagementMutation>;
export type AdminMoveEngagementMutationResult = Apollo.MutationResult<AdminMoveEngagementMutation>;
export type AdminMoveEngagementMutationOptions = Apollo.BaseMutationOptions<AdminMoveEngagementMutation, AdminMoveEngagementMutationVariables>;
export const AdminUpdateEngagementDocument = gql`
    mutation adminUpdateEngagement($id: Int!, $data: UpdateEngagementInput!) {
  updateEngagement(engagementId: $id, data: $data) {
    ...AdminEngagement
  }
}
    ${AdminEngagementFragmentDoc}`;
export type AdminUpdateEngagementMutationFn = Apollo.MutationFunction<AdminUpdateEngagementMutation, AdminUpdateEngagementMutationVariables>;

/**
 * __useAdminUpdateEngagementMutation__
 *
 * To run a mutation, you first call `useAdminUpdateEngagementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateEngagementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateEngagementMutation, { data, loading, error }] = useAdminUpdateEngagementMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAdminUpdateEngagementMutation(baseOptions?: Apollo.MutationHookOptions<AdminUpdateEngagementMutation, AdminUpdateEngagementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUpdateEngagementMutation, AdminUpdateEngagementMutationVariables>(AdminUpdateEngagementDocument, options);
      }
export type AdminUpdateEngagementMutationHookResult = ReturnType<typeof useAdminUpdateEngagementMutation>;
export type AdminUpdateEngagementMutationResult = Apollo.MutationResult<AdminUpdateEngagementMutation>;
export type AdminUpdateEngagementMutationOptions = Apollo.BaseMutationOptions<AdminUpdateEngagementMutation, AdminUpdateEngagementMutationVariables>;
export const AdminUpdateEventDocument = gql`
    mutation adminUpdateEvent($id: Int!, $data: UpdateEventInput!) {
  updateEvent(eventId: $id, data: $data) {
    ...AdminEvent
  }
}
    ${AdminEventFragmentDoc}`;
export type AdminUpdateEventMutationFn = Apollo.MutationFunction<AdminUpdateEventMutation, AdminUpdateEventMutationVariables>;

/**
 * __useAdminUpdateEventMutation__
 *
 * To run a mutation, you first call `useAdminUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateEventMutation, { data, loading, error }] = useAdminUpdateEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAdminUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<AdminUpdateEventMutation, AdminUpdateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUpdateEventMutation, AdminUpdateEventMutationVariables>(AdminUpdateEventDocument, options);
      }
export type AdminUpdateEventMutationHookResult = ReturnType<typeof useAdminUpdateEventMutation>;
export type AdminUpdateEventMutationResult = Apollo.MutationResult<AdminUpdateEventMutation>;
export type AdminUpdateEventMutationOptions = Apollo.BaseMutationOptions<AdminUpdateEventMutation, AdminUpdateEventMutationVariables>;
export const AdminUpdateEventFanConfigDocument = gql`
    mutation adminUpdateEventFanConfig($id: Int!, $data: UpdateEventFanConfigInput!) {
  updateEventFanConfig(eventId: $id, data: $data) {
    ...EventFanConfig
  }
}
    ${EventFanConfigFragmentDoc}`;
export type AdminUpdateEventFanConfigMutationFn = Apollo.MutationFunction<AdminUpdateEventFanConfigMutation, AdminUpdateEventFanConfigMutationVariables>;

/**
 * __useAdminUpdateEventFanConfigMutation__
 *
 * To run a mutation, you first call `useAdminUpdateEventFanConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateEventFanConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateEventFanConfigMutation, { data, loading, error }] = useAdminUpdateEventFanConfigMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAdminUpdateEventFanConfigMutation(baseOptions?: Apollo.MutationHookOptions<AdminUpdateEventFanConfigMutation, AdminUpdateEventFanConfigMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUpdateEventFanConfigMutation, AdminUpdateEventFanConfigMutationVariables>(AdminUpdateEventFanConfigDocument, options);
      }
export type AdminUpdateEventFanConfigMutationHookResult = ReturnType<typeof useAdminUpdateEventFanConfigMutation>;
export type AdminUpdateEventFanConfigMutationResult = Apollo.MutationResult<AdminUpdateEventFanConfigMutation>;
export type AdminUpdateEventFanConfigMutationOptions = Apollo.BaseMutationOptions<AdminUpdateEventFanConfigMutation, AdminUpdateEventFanConfigMutationVariables>;
export const AdminUpdateEventStageConfigDocument = gql`
    mutation adminUpdateEventStageConfig($id: Int!, $data: UpdateEventStageConfigInput!) {
  updateEventStageConfig(eventId: $id, data: $data) {
    ...EventStageConfig
  }
}
    ${EventStageConfigFragmentDoc}`;
export type AdminUpdateEventStageConfigMutationFn = Apollo.MutationFunction<AdminUpdateEventStageConfigMutation, AdminUpdateEventStageConfigMutationVariables>;

/**
 * __useAdminUpdateEventStageConfigMutation__
 *
 * To run a mutation, you first call `useAdminUpdateEventStageConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateEventStageConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateEventStageConfigMutation, { data, loading, error }] = useAdminUpdateEventStageConfigMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAdminUpdateEventStageConfigMutation(baseOptions?: Apollo.MutationHookOptions<AdminUpdateEventStageConfigMutation, AdminUpdateEventStageConfigMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUpdateEventStageConfigMutation, AdminUpdateEventStageConfigMutationVariables>(AdminUpdateEventStageConfigDocument, options);
      }
export type AdminUpdateEventStageConfigMutationHookResult = ReturnType<typeof useAdminUpdateEventStageConfigMutation>;
export type AdminUpdateEventStageConfigMutationResult = Apollo.MutationResult<AdminUpdateEventStageConfigMutation>;
export type AdminUpdateEventStageConfigMutationOptions = Apollo.BaseMutationOptions<AdminUpdateEventStageConfigMutation, AdminUpdateEventStageConfigMutationVariables>;
export const AdminUpdateSubmissionDocument = gql`
    mutation adminUpdateSubmission($id: Int!, $data: Json!) {
  updateSubmission(submissionId: $id, data: $data) {
    ...AdminSubmission
  }
}
    ${AdminSubmissionFragmentDoc}`;
export type AdminUpdateSubmissionMutationFn = Apollo.MutationFunction<AdminUpdateSubmissionMutation, AdminUpdateSubmissionMutationVariables>;

/**
 * __useAdminUpdateSubmissionMutation__
 *
 * To run a mutation, you first call `useAdminUpdateSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateSubmissionMutation, { data, loading, error }] = useAdminUpdateSubmissionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAdminUpdateSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<AdminUpdateSubmissionMutation, AdminUpdateSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUpdateSubmissionMutation, AdminUpdateSubmissionMutationVariables>(AdminUpdateSubmissionDocument, options);
      }
export type AdminUpdateSubmissionMutationHookResult = ReturnType<typeof useAdminUpdateSubmissionMutation>;
export type AdminUpdateSubmissionMutationResult = Apollo.MutationResult<AdminUpdateSubmissionMutation>;
export type AdminUpdateSubmissionMutationOptions = Apollo.BaseMutationOptions<AdminUpdateSubmissionMutation, AdminUpdateSubmissionMutationVariables>;
export const CreateReactionDocument = gql`
    mutation createReaction($submissionId: Int!, $type: String!) {
  createReaction(submissionId: $submissionId, type: $type) {
    ...FanReaction
  }
}
    ${FanReactionFragmentDoc}`;
export type CreateReactionMutationFn = Apollo.MutationFunction<CreateReactionMutation, CreateReactionMutationVariables>;

/**
 * __useCreateReactionMutation__
 *
 * To run a mutation, you first call `useCreateReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReactionMutation, { data, loading, error }] = useCreateReactionMutation({
 *   variables: {
 *      submissionId: // value for 'submissionId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useCreateReactionMutation(baseOptions?: Apollo.MutationHookOptions<CreateReactionMutation, CreateReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReactionMutation, CreateReactionMutationVariables>(CreateReactionDocument, options);
      }
export type CreateReactionMutationHookResult = ReturnType<typeof useCreateReactionMutation>;
export type CreateReactionMutationResult = Apollo.MutationResult<CreateReactionMutation>;
export type CreateReactionMutationOptions = Apollo.BaseMutationOptions<CreateReactionMutation, CreateReactionMutationVariables>;
export const CreateSubmissionDocument = gql`
    mutation createSubmission($engagementId: Int!, $data: Json!) {
  createSubmission(engagementId: $engagementId, data: $data) {
    ...FanSubmission
  }
}
    ${FanSubmissionFragmentDoc}`;
export type CreateSubmissionMutationFn = Apollo.MutationFunction<CreateSubmissionMutation, CreateSubmissionMutationVariables>;

/**
 * __useCreateSubmissionMutation__
 *
 * To run a mutation, you first call `useCreateSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubmissionMutation, { data, loading, error }] = useCreateSubmissionMutation({
 *   variables: {
 *      engagementId: // value for 'engagementId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubmissionMutation, CreateSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubmissionMutation, CreateSubmissionMutationVariables>(CreateSubmissionDocument, options);
      }
export type CreateSubmissionMutationHookResult = ReturnType<typeof useCreateSubmissionMutation>;
export type CreateSubmissionMutationResult = Apollo.MutationResult<CreateSubmissionMutation>;
export type CreateSubmissionMutationOptions = Apollo.BaseMutationOptions<CreateSubmissionMutation, CreateSubmissionMutationVariables>;
export const CreateSubmissionPresignedUrlDocument = gql`
    mutation CreateSubmissionPresignedUrl($engagementId: Int!, $mimeType: String!) {
  createSubmissionPresignedUrl(engagementId: $engagementId, mimeType: $mimeType) {
    url
    key
  }
}
    `;
export type CreateSubmissionPresignedUrlMutationFn = Apollo.MutationFunction<CreateSubmissionPresignedUrlMutation, CreateSubmissionPresignedUrlMutationVariables>;

/**
 * __useCreateSubmissionPresignedUrlMutation__
 *
 * To run a mutation, you first call `useCreateSubmissionPresignedUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubmissionPresignedUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubmissionPresignedUrlMutation, { data, loading, error }] = useCreateSubmissionPresignedUrlMutation({
 *   variables: {
 *      engagementId: // value for 'engagementId'
 *      mimeType: // value for 'mimeType'
 *   },
 * });
 */
export function useCreateSubmissionPresignedUrlMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubmissionPresignedUrlMutation, CreateSubmissionPresignedUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubmissionPresignedUrlMutation, CreateSubmissionPresignedUrlMutationVariables>(CreateSubmissionPresignedUrlDocument, options);
      }
export type CreateSubmissionPresignedUrlMutationHookResult = ReturnType<typeof useCreateSubmissionPresignedUrlMutation>;
export type CreateSubmissionPresignedUrlMutationResult = Apollo.MutationResult<CreateSubmissionPresignedUrlMutation>;
export type CreateSubmissionPresignedUrlMutationOptions = Apollo.BaseMutationOptions<CreateSubmissionPresignedUrlMutation, CreateSubmissionPresignedUrlMutationVariables>;
export const FanSignupDocument = gql`
    mutation fanSignup($data: SignupInput!) {
  signup(data: $data) {
    id
    name
    role
  }
}
    `;
export type FanSignupMutationFn = Apollo.MutationFunction<FanSignupMutation, FanSignupMutationVariables>;

/**
 * __useFanSignupMutation__
 *
 * To run a mutation, you first call `useFanSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFanSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fanSignupMutation, { data, loading, error }] = useFanSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFanSignupMutation(baseOptions?: Apollo.MutationHookOptions<FanSignupMutation, FanSignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FanSignupMutation, FanSignupMutationVariables>(FanSignupDocument, options);
      }
export type FanSignupMutationHookResult = ReturnType<typeof useFanSignupMutation>;
export type FanSignupMutationResult = Apollo.MutationResult<FanSignupMutation>;
export type FanSignupMutationOptions = Apollo.BaseMutationOptions<FanSignupMutation, FanSignupMutationVariables>;
export const LoginDocument = gql`
    mutation login($emailOrUsername: String!, $password: String!) {
  login(emailOrUsername: $emailOrUsername, password: $password) {
    id
    email
    name
    username
    role
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      emailOrUsername: // value for 'emailOrUsername'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const AdminGetEngagementDocument = gql`
    query adminGetEngagement($engagementId: Int!) {
  engagement(id: $engagementId) {
    ...AdminEngagement
  }
}
    ${AdminEngagementFragmentDoc}`;

/**
 * __useAdminGetEngagementQuery__
 *
 * To run a query within a React component, call `useAdminGetEngagementQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetEngagementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetEngagementQuery({
 *   variables: {
 *      engagementId: // value for 'engagementId'
 *   },
 * });
 */
export function useAdminGetEngagementQuery(baseOptions: Apollo.QueryHookOptions<AdminGetEngagementQuery, AdminGetEngagementQueryVariables> & ({ variables: AdminGetEngagementQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetEngagementQuery, AdminGetEngagementQueryVariables>(AdminGetEngagementDocument, options);
      }
export function useAdminGetEngagementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetEngagementQuery, AdminGetEngagementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetEngagementQuery, AdminGetEngagementQueryVariables>(AdminGetEngagementDocument, options);
        }
export function useAdminGetEngagementSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AdminGetEngagementQuery, AdminGetEngagementQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AdminGetEngagementQuery, AdminGetEngagementQueryVariables>(AdminGetEngagementDocument, options);
        }
export type AdminGetEngagementQueryHookResult = ReturnType<typeof useAdminGetEngagementQuery>;
export type AdminGetEngagementLazyQueryHookResult = ReturnType<typeof useAdminGetEngagementLazyQuery>;
export type AdminGetEngagementSuspenseQueryHookResult = ReturnType<typeof useAdminGetEngagementSuspenseQuery>;
export type AdminGetEngagementQueryResult = Apollo.QueryResult<AdminGetEngagementQuery, AdminGetEngagementQueryVariables>;
export const AdminGetEngagementsDocument = gql`
    query adminGetEngagements($eventId: Int!) {
  engagements(eventId: $eventId) {
    ...AdminEngagement
  }
}
    ${AdminEngagementFragmentDoc}`;

/**
 * __useAdminGetEngagementsQuery__
 *
 * To run a query within a React component, call `useAdminGetEngagementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetEngagementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetEngagementsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAdminGetEngagementsQuery(baseOptions: Apollo.QueryHookOptions<AdminGetEngagementsQuery, AdminGetEngagementsQueryVariables> & ({ variables: AdminGetEngagementsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetEngagementsQuery, AdminGetEngagementsQueryVariables>(AdminGetEngagementsDocument, options);
      }
export function useAdminGetEngagementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetEngagementsQuery, AdminGetEngagementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetEngagementsQuery, AdminGetEngagementsQueryVariables>(AdminGetEngagementsDocument, options);
        }
export function useAdminGetEngagementsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AdminGetEngagementsQuery, AdminGetEngagementsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AdminGetEngagementsQuery, AdminGetEngagementsQueryVariables>(AdminGetEngagementsDocument, options);
        }
export type AdminGetEngagementsQueryHookResult = ReturnType<typeof useAdminGetEngagementsQuery>;
export type AdminGetEngagementsLazyQueryHookResult = ReturnType<typeof useAdminGetEngagementsLazyQuery>;
export type AdminGetEngagementsSuspenseQueryHookResult = ReturnType<typeof useAdminGetEngagementsSuspenseQuery>;
export type AdminGetEngagementsQueryResult = Apollo.QueryResult<AdminGetEngagementsQuery, AdminGetEngagementsQueryVariables>;
export const AdminGetEventDocument = gql`
    query adminGetEvent($slug: String!) {
  event(slug: $slug) {
    ...AdminEvent
  }
}
    ${AdminEventFragmentDoc}`;

/**
 * __useAdminGetEventQuery__
 *
 * To run a query within a React component, call `useAdminGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetEventQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useAdminGetEventQuery(baseOptions: Apollo.QueryHookOptions<AdminGetEventQuery, AdminGetEventQueryVariables> & ({ variables: AdminGetEventQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetEventQuery, AdminGetEventQueryVariables>(AdminGetEventDocument, options);
      }
export function useAdminGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetEventQuery, AdminGetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetEventQuery, AdminGetEventQueryVariables>(AdminGetEventDocument, options);
        }
export function useAdminGetEventSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AdminGetEventQuery, AdminGetEventQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AdminGetEventQuery, AdminGetEventQueryVariables>(AdminGetEventDocument, options);
        }
export type AdminGetEventQueryHookResult = ReturnType<typeof useAdminGetEventQuery>;
export type AdminGetEventLazyQueryHookResult = ReturnType<typeof useAdminGetEventLazyQuery>;
export type AdminGetEventSuspenseQueryHookResult = ReturnType<typeof useAdminGetEventSuspenseQuery>;
export type AdminGetEventQueryResult = Apollo.QueryResult<AdminGetEventQuery, AdminGetEventQueryVariables>;
export const AdminGetEventsDocument = gql`
    query adminGetEvents {
  events {
    ...AdminEvent
  }
}
    ${AdminEventFragmentDoc}`;

/**
 * __useAdminGetEventsQuery__
 *
 * To run a query within a React component, call `useAdminGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminGetEventsQuery(baseOptions?: Apollo.QueryHookOptions<AdminGetEventsQuery, AdminGetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetEventsQuery, AdminGetEventsQueryVariables>(AdminGetEventsDocument, options);
      }
export function useAdminGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetEventsQuery, AdminGetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetEventsQuery, AdminGetEventsQueryVariables>(AdminGetEventsDocument, options);
        }
export function useAdminGetEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AdminGetEventsQuery, AdminGetEventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AdminGetEventsQuery, AdminGetEventsQueryVariables>(AdminGetEventsDocument, options);
        }
export type AdminGetEventsQueryHookResult = ReturnType<typeof useAdminGetEventsQuery>;
export type AdminGetEventsLazyQueryHookResult = ReturnType<typeof useAdminGetEventsLazyQuery>;
export type AdminGetEventsSuspenseQueryHookResult = ReturnType<typeof useAdminGetEventsSuspenseQuery>;
export type AdminGetEventsQueryResult = Apollo.QueryResult<AdminGetEventsQuery, AdminGetEventsQueryVariables>;
export const AdminGetSubmissionDocument = gql`
    query adminGetSubmission($submissionId: Int!) {
  submission(id: $submissionId) {
    ...AdminSubmission
  }
}
    ${AdminSubmissionFragmentDoc}`;

/**
 * __useAdminGetSubmissionQuery__
 *
 * To run a query within a React component, call `useAdminGetSubmissionQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetSubmissionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetSubmissionQuery({
 *   variables: {
 *      submissionId: // value for 'submissionId'
 *   },
 * });
 */
export function useAdminGetSubmissionQuery(baseOptions: Apollo.QueryHookOptions<AdminGetSubmissionQuery, AdminGetSubmissionQueryVariables> & ({ variables: AdminGetSubmissionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetSubmissionQuery, AdminGetSubmissionQueryVariables>(AdminGetSubmissionDocument, options);
      }
export function useAdminGetSubmissionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetSubmissionQuery, AdminGetSubmissionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetSubmissionQuery, AdminGetSubmissionQueryVariables>(AdminGetSubmissionDocument, options);
        }
export function useAdminGetSubmissionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AdminGetSubmissionQuery, AdminGetSubmissionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AdminGetSubmissionQuery, AdminGetSubmissionQueryVariables>(AdminGetSubmissionDocument, options);
        }
export type AdminGetSubmissionQueryHookResult = ReturnType<typeof useAdminGetSubmissionQuery>;
export type AdminGetSubmissionLazyQueryHookResult = ReturnType<typeof useAdminGetSubmissionLazyQuery>;
export type AdminGetSubmissionSuspenseQueryHookResult = ReturnType<typeof useAdminGetSubmissionSuspenseQuery>;
export type AdminGetSubmissionQueryResult = Apollo.QueryResult<AdminGetSubmissionQuery, AdminGetSubmissionQueryVariables>;
export const AdminGetSubmissionsDocument = gql`
    query adminGetSubmissions($engagementId: Int!) {
  submissions(engagementId: $engagementId) {
    ...AdminSubmission
  }
}
    ${AdminSubmissionFragmentDoc}`;

/**
 * __useAdminGetSubmissionsQuery__
 *
 * To run a query within a React component, call `useAdminGetSubmissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetSubmissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetSubmissionsQuery({
 *   variables: {
 *      engagementId: // value for 'engagementId'
 *   },
 * });
 */
export function useAdminGetSubmissionsQuery(baseOptions: Apollo.QueryHookOptions<AdminGetSubmissionsQuery, AdminGetSubmissionsQueryVariables> & ({ variables: AdminGetSubmissionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetSubmissionsQuery, AdminGetSubmissionsQueryVariables>(AdminGetSubmissionsDocument, options);
      }
export function useAdminGetSubmissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetSubmissionsQuery, AdminGetSubmissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetSubmissionsQuery, AdminGetSubmissionsQueryVariables>(AdminGetSubmissionsDocument, options);
        }
export function useAdminGetSubmissionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AdminGetSubmissionsQuery, AdminGetSubmissionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AdminGetSubmissionsQuery, AdminGetSubmissionsQueryVariables>(AdminGetSubmissionsDocument, options);
        }
export type AdminGetSubmissionsQueryHookResult = ReturnType<typeof useAdminGetSubmissionsQuery>;
export type AdminGetSubmissionsLazyQueryHookResult = ReturnType<typeof useAdminGetSubmissionsLazyQuery>;
export type AdminGetSubmissionsSuspenseQueryHookResult = ReturnType<typeof useAdminGetSubmissionsSuspenseQuery>;
export type AdminGetSubmissionsQueryResult = Apollo.QueryResult<AdminGetSubmissionsQuery, AdminGetSubmissionsQueryVariables>;
export const CanCreateSubmissionDocument = gql`
    query canCreateSubmission($engagementId: Int!) {
  canCreateSubmission(engagementId: $engagementId)
}
    `;

/**
 * __useCanCreateSubmissionQuery__
 *
 * To run a query within a React component, call `useCanCreateSubmissionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCanCreateSubmissionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCanCreateSubmissionQuery({
 *   variables: {
 *      engagementId: // value for 'engagementId'
 *   },
 * });
 */
export function useCanCreateSubmissionQuery(baseOptions: Apollo.QueryHookOptions<CanCreateSubmissionQuery, CanCreateSubmissionQueryVariables> & ({ variables: CanCreateSubmissionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CanCreateSubmissionQuery, CanCreateSubmissionQueryVariables>(CanCreateSubmissionDocument, options);
      }
export function useCanCreateSubmissionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CanCreateSubmissionQuery, CanCreateSubmissionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CanCreateSubmissionQuery, CanCreateSubmissionQueryVariables>(CanCreateSubmissionDocument, options);
        }
export function useCanCreateSubmissionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CanCreateSubmissionQuery, CanCreateSubmissionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CanCreateSubmissionQuery, CanCreateSubmissionQueryVariables>(CanCreateSubmissionDocument, options);
        }
export type CanCreateSubmissionQueryHookResult = ReturnType<typeof useCanCreateSubmissionQuery>;
export type CanCreateSubmissionLazyQueryHookResult = ReturnType<typeof useCanCreateSubmissionLazyQuery>;
export type CanCreateSubmissionSuspenseQueryHookResult = ReturnType<typeof useCanCreateSubmissionSuspenseQuery>;
export type CanCreateSubmissionQueryResult = Apollo.QueryResult<CanCreateSubmissionQuery, CanCreateSubmissionQueryVariables>;
export const FanGetEventDocument = gql`
    query fanGetEvent($slug: String!) {
  event(slug: $slug) {
    ...FanEvent
  }
}
    ${FanEventFragmentDoc}`;

/**
 * __useFanGetEventQuery__
 *
 * To run a query within a React component, call `useFanGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useFanGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFanGetEventQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useFanGetEventQuery(baseOptions: Apollo.QueryHookOptions<FanGetEventQuery, FanGetEventQueryVariables> & ({ variables: FanGetEventQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FanGetEventQuery, FanGetEventQueryVariables>(FanGetEventDocument, options);
      }
export function useFanGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FanGetEventQuery, FanGetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FanGetEventQuery, FanGetEventQueryVariables>(FanGetEventDocument, options);
        }
export function useFanGetEventSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FanGetEventQuery, FanGetEventQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FanGetEventQuery, FanGetEventQueryVariables>(FanGetEventDocument, options);
        }
export type FanGetEventQueryHookResult = ReturnType<typeof useFanGetEventQuery>;
export type FanGetEventLazyQueryHookResult = ReturnType<typeof useFanGetEventLazyQuery>;
export type FanGetEventSuspenseQueryHookResult = ReturnType<typeof useFanGetEventSuspenseQuery>;
export type FanGetEventQueryResult = Apollo.QueryResult<FanGetEventQuery, FanGetEventQueryVariables>;
export const FanGetSubmissionDocument = gql`
    query fanGetSubmission($submissionId: Int!) {
  submission(id: $submissionId) {
    ...FanSubmission
  }
}
    ${FanSubmissionFragmentDoc}`;

/**
 * __useFanGetSubmissionQuery__
 *
 * To run a query within a React component, call `useFanGetSubmissionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFanGetSubmissionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFanGetSubmissionQuery({
 *   variables: {
 *      submissionId: // value for 'submissionId'
 *   },
 * });
 */
export function useFanGetSubmissionQuery(baseOptions: Apollo.QueryHookOptions<FanGetSubmissionQuery, FanGetSubmissionQueryVariables> & ({ variables: FanGetSubmissionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FanGetSubmissionQuery, FanGetSubmissionQueryVariables>(FanGetSubmissionDocument, options);
      }
export function useFanGetSubmissionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FanGetSubmissionQuery, FanGetSubmissionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FanGetSubmissionQuery, FanGetSubmissionQueryVariables>(FanGetSubmissionDocument, options);
        }
export function useFanGetSubmissionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FanGetSubmissionQuery, FanGetSubmissionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FanGetSubmissionQuery, FanGetSubmissionQueryVariables>(FanGetSubmissionDocument, options);
        }
export type FanGetSubmissionQueryHookResult = ReturnType<typeof useFanGetSubmissionQuery>;
export type FanGetSubmissionLazyQueryHookResult = ReturnType<typeof useFanGetSubmissionLazyQuery>;
export type FanGetSubmissionSuspenseQueryHookResult = ReturnType<typeof useFanGetSubmissionSuspenseQuery>;
export type FanGetSubmissionQueryResult = Apollo.QueryResult<FanGetSubmissionQuery, FanGetSubmissionQueryVariables>;
export const FanGetSubmissionsDocument = gql`
    query fanGetSubmissions($engagementId: Int!) {
  submissions(engagementId: $engagementId) {
    ...FanSubmission
  }
}
    ${FanSubmissionFragmentDoc}`;

/**
 * __useFanGetSubmissionsQuery__
 *
 * To run a query within a React component, call `useFanGetSubmissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFanGetSubmissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFanGetSubmissionsQuery({
 *   variables: {
 *      engagementId: // value for 'engagementId'
 *   },
 * });
 */
export function useFanGetSubmissionsQuery(baseOptions: Apollo.QueryHookOptions<FanGetSubmissionsQuery, FanGetSubmissionsQueryVariables> & ({ variables: FanGetSubmissionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FanGetSubmissionsQuery, FanGetSubmissionsQueryVariables>(FanGetSubmissionsDocument, options);
      }
export function useFanGetSubmissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FanGetSubmissionsQuery, FanGetSubmissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FanGetSubmissionsQuery, FanGetSubmissionsQueryVariables>(FanGetSubmissionsDocument, options);
        }
export function useFanGetSubmissionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FanGetSubmissionsQuery, FanGetSubmissionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FanGetSubmissionsQuery, FanGetSubmissionsQueryVariables>(FanGetSubmissionsDocument, options);
        }
export type FanGetSubmissionsQueryHookResult = ReturnType<typeof useFanGetSubmissionsQuery>;
export type FanGetSubmissionsLazyQueryHookResult = ReturnType<typeof useFanGetSubmissionsLazyQuery>;
export type FanGetSubmissionsSuspenseQueryHookResult = ReturnType<typeof useFanGetSubmissionsSuspenseQuery>;
export type FanGetSubmissionsQueryResult = Apollo.QueryResult<FanGetSubmissionsQuery, FanGetSubmissionsQueryVariables>;
export const RandomNameDocument = gql`
    query RandomName {
  randomName
}
    `;

/**
 * __useRandomNameQuery__
 *
 * To run a query within a React component, call `useRandomNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useRandomNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRandomNameQuery({
 *   variables: {
 *   },
 * });
 */
export function useRandomNameQuery(baseOptions?: Apollo.QueryHookOptions<RandomNameQuery, RandomNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RandomNameQuery, RandomNameQueryVariables>(RandomNameDocument, options);
      }
export function useRandomNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RandomNameQuery, RandomNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RandomNameQuery, RandomNameQueryVariables>(RandomNameDocument, options);
        }
export function useRandomNameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RandomNameQuery, RandomNameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RandomNameQuery, RandomNameQueryVariables>(RandomNameDocument, options);
        }
export type RandomNameQueryHookResult = ReturnType<typeof useRandomNameQuery>;
export type RandomNameLazyQueryHookResult = ReturnType<typeof useRandomNameLazyQuery>;
export type RandomNameSuspenseQueryHookResult = ReturnType<typeof useRandomNameSuspenseQuery>;
export type RandomNameQueryResult = Apollo.QueryResult<RandomNameQuery, RandomNameQueryVariables>;
export const StageGetActiveEngagementDocument = gql`
    query stageGetActiveEngagement($eventSlug: String!) {
  activeEventEngagement(eventSlug: $eventSlug) {
    ...StageEngagement
  }
}
    ${StageEngagementFragmentDoc}`;

/**
 * __useStageGetActiveEngagementQuery__
 *
 * To run a query within a React component, call `useStageGetActiveEngagementQuery` and pass it any options that fit your needs.
 * When your component renders, `useStageGetActiveEngagementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStageGetActiveEngagementQuery({
 *   variables: {
 *      eventSlug: // value for 'eventSlug'
 *   },
 * });
 */
export function useStageGetActiveEngagementQuery(baseOptions: Apollo.QueryHookOptions<StageGetActiveEngagementQuery, StageGetActiveEngagementQueryVariables> & ({ variables: StageGetActiveEngagementQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StageGetActiveEngagementQuery, StageGetActiveEngagementQueryVariables>(StageGetActiveEngagementDocument, options);
      }
export function useStageGetActiveEngagementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StageGetActiveEngagementQuery, StageGetActiveEngagementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StageGetActiveEngagementQuery, StageGetActiveEngagementQueryVariables>(StageGetActiveEngagementDocument, options);
        }
export function useStageGetActiveEngagementSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StageGetActiveEngagementQuery, StageGetActiveEngagementQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StageGetActiveEngagementQuery, StageGetActiveEngagementQueryVariables>(StageGetActiveEngagementDocument, options);
        }
export type StageGetActiveEngagementQueryHookResult = ReturnType<typeof useStageGetActiveEngagementQuery>;
export type StageGetActiveEngagementLazyQueryHookResult = ReturnType<typeof useStageGetActiveEngagementLazyQuery>;
export type StageGetActiveEngagementSuspenseQueryHookResult = ReturnType<typeof useStageGetActiveEngagementSuspenseQuery>;
export type StageGetActiveEngagementQueryResult = Apollo.QueryResult<StageGetActiveEngagementQuery, StageGetActiveEngagementQueryVariables>;
export const StageGetEventDocument = gql`
    query stageGetEvent($slug: String!) {
  event(slug: $slug) {
    ...StageEvent
  }
}
    ${StageEventFragmentDoc}`;

/**
 * __useStageGetEventQuery__
 *
 * To run a query within a React component, call `useStageGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useStageGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStageGetEventQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useStageGetEventQuery(baseOptions: Apollo.QueryHookOptions<StageGetEventQuery, StageGetEventQueryVariables> & ({ variables: StageGetEventQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StageGetEventQuery, StageGetEventQueryVariables>(StageGetEventDocument, options);
      }
export function useStageGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StageGetEventQuery, StageGetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StageGetEventQuery, StageGetEventQueryVariables>(StageGetEventDocument, options);
        }
export function useStageGetEventSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StageGetEventQuery, StageGetEventQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StageGetEventQuery, StageGetEventQueryVariables>(StageGetEventDocument, options);
        }
export type StageGetEventQueryHookResult = ReturnType<typeof useStageGetEventQuery>;
export type StageGetEventLazyQueryHookResult = ReturnType<typeof useStageGetEventLazyQuery>;
export type StageGetEventSuspenseQueryHookResult = ReturnType<typeof useStageGetEventSuspenseQuery>;
export type StageGetEventQueryResult = Apollo.QueryResult<StageGetEventQuery, StageGetEventQueryVariables>;
export const StageGetEventsDocument = gql`
    query stageGetEvents {
  events {
    ...StageEvent
  }
}
    ${StageEventFragmentDoc}`;

/**
 * __useStageGetEventsQuery__
 *
 * To run a query within a React component, call `useStageGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStageGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStageGetEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStageGetEventsQuery(baseOptions?: Apollo.QueryHookOptions<StageGetEventsQuery, StageGetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StageGetEventsQuery, StageGetEventsQueryVariables>(StageGetEventsDocument, options);
      }
export function useStageGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StageGetEventsQuery, StageGetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StageGetEventsQuery, StageGetEventsQueryVariables>(StageGetEventsDocument, options);
        }
export function useStageGetEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StageGetEventsQuery, StageGetEventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StageGetEventsQuery, StageGetEventsQueryVariables>(StageGetEventsDocument, options);
        }
export type StageGetEventsQueryHookResult = ReturnType<typeof useStageGetEventsQuery>;
export type StageGetEventsLazyQueryHookResult = ReturnType<typeof useStageGetEventsLazyQuery>;
export type StageGetEventsSuspenseQueryHookResult = ReturnType<typeof useStageGetEventsSuspenseQuery>;
export type StageGetEventsQueryResult = Apollo.QueryResult<StageGetEventsQuery, StageGetEventsQueryVariables>;
export const StageGetSubmissionDocument = gql`
    query stageGetSubmission($id: Int!) {
  submission(id: $id) {
    ...StageSubmission
  }
}
    ${StageSubmissionFragmentDoc}`;

/**
 * __useStageGetSubmissionQuery__
 *
 * To run a query within a React component, call `useStageGetSubmissionQuery` and pass it any options that fit your needs.
 * When your component renders, `useStageGetSubmissionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStageGetSubmissionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStageGetSubmissionQuery(baseOptions: Apollo.QueryHookOptions<StageGetSubmissionQuery, StageGetSubmissionQueryVariables> & ({ variables: StageGetSubmissionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StageGetSubmissionQuery, StageGetSubmissionQueryVariables>(StageGetSubmissionDocument, options);
      }
export function useStageGetSubmissionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StageGetSubmissionQuery, StageGetSubmissionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StageGetSubmissionQuery, StageGetSubmissionQueryVariables>(StageGetSubmissionDocument, options);
        }
export function useStageGetSubmissionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StageGetSubmissionQuery, StageGetSubmissionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StageGetSubmissionQuery, StageGetSubmissionQueryVariables>(StageGetSubmissionDocument, options);
        }
export type StageGetSubmissionQueryHookResult = ReturnType<typeof useStageGetSubmissionQuery>;
export type StageGetSubmissionLazyQueryHookResult = ReturnType<typeof useStageGetSubmissionLazyQuery>;
export type StageGetSubmissionSuspenseQueryHookResult = ReturnType<typeof useStageGetSubmissionSuspenseQuery>;
export type StageGetSubmissionQueryResult = Apollo.QueryResult<StageGetSubmissionQuery, StageGetSubmissionQueryVariables>;
export const StageGetSubmissionsDocument = gql`
    query stageGetSubmissions($engagementId: Int!) {
  submissions(engagementId: $engagementId) {
    ...StageSubmission
  }
}
    ${StageSubmissionFragmentDoc}`;

/**
 * __useStageGetSubmissionsQuery__
 *
 * To run a query within a React component, call `useStageGetSubmissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStageGetSubmissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStageGetSubmissionsQuery({
 *   variables: {
 *      engagementId: // value for 'engagementId'
 *   },
 * });
 */
export function useStageGetSubmissionsQuery(baseOptions: Apollo.QueryHookOptions<StageGetSubmissionsQuery, StageGetSubmissionsQueryVariables> & ({ variables: StageGetSubmissionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StageGetSubmissionsQuery, StageGetSubmissionsQueryVariables>(StageGetSubmissionsDocument, options);
      }
export function useStageGetSubmissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StageGetSubmissionsQuery, StageGetSubmissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StageGetSubmissionsQuery, StageGetSubmissionsQueryVariables>(StageGetSubmissionsDocument, options);
        }
export function useStageGetSubmissionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StageGetSubmissionsQuery, StageGetSubmissionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StageGetSubmissionsQuery, StageGetSubmissionsQueryVariables>(StageGetSubmissionsDocument, options);
        }
export type StageGetSubmissionsQueryHookResult = ReturnType<typeof useStageGetSubmissionsQuery>;
export type StageGetSubmissionsLazyQueryHookResult = ReturnType<typeof useStageGetSubmissionsLazyQuery>;
export type StageGetSubmissionsSuspenseQueryHookResult = ReturnType<typeof useStageGetSubmissionsSuspenseQuery>;
export type StageGetSubmissionsQueryResult = Apollo.QueryResult<StageGetSubmissionsQuery, StageGetSubmissionsQueryVariables>;
export const ValidateGoogleFontDocument = gql`
    query validateGoogleFont($fontName: String!) {
  validateGoogleFont(fontName: $fontName)
}
    `;

/**
 * __useValidateGoogleFontQuery__
 *
 * To run a query within a React component, call `useValidateGoogleFontQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateGoogleFontQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateGoogleFontQuery({
 *   variables: {
 *      fontName: // value for 'fontName'
 *   },
 * });
 */
export function useValidateGoogleFontQuery(baseOptions: Apollo.QueryHookOptions<ValidateGoogleFontQuery, ValidateGoogleFontQueryVariables> & ({ variables: ValidateGoogleFontQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateGoogleFontQuery, ValidateGoogleFontQueryVariables>(ValidateGoogleFontDocument, options);
      }
export function useValidateGoogleFontLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateGoogleFontQuery, ValidateGoogleFontQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateGoogleFontQuery, ValidateGoogleFontQueryVariables>(ValidateGoogleFontDocument, options);
        }
export function useValidateGoogleFontSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ValidateGoogleFontQuery, ValidateGoogleFontQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ValidateGoogleFontQuery, ValidateGoogleFontQueryVariables>(ValidateGoogleFontDocument, options);
        }
export type ValidateGoogleFontQueryHookResult = ReturnType<typeof useValidateGoogleFontQuery>;
export type ValidateGoogleFontLazyQueryHookResult = ReturnType<typeof useValidateGoogleFontLazyQuery>;
export type ValidateGoogleFontSuspenseQueryHookResult = ReturnType<typeof useValidateGoogleFontSuspenseQuery>;
export type ValidateGoogleFontQueryResult = Apollo.QueryResult<ValidateGoogleFontQuery, ValidateGoogleFontQueryVariables>;
export const WhoamiDocument = gql`
    query whoami {
  whoami {
    id
    email
    username
    name
    lastLogin
    role
  }
}
    `;

/**
 * __useWhoamiQuery__
 *
 * To run a query within a React component, call `useWhoamiQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoamiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoamiQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoamiQuery(baseOptions?: Apollo.QueryHookOptions<WhoamiQuery, WhoamiQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WhoamiQuery, WhoamiQueryVariables>(WhoamiDocument, options);
      }
export function useWhoamiLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WhoamiQuery, WhoamiQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WhoamiQuery, WhoamiQueryVariables>(WhoamiDocument, options);
        }
export function useWhoamiSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<WhoamiQuery, WhoamiQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WhoamiQuery, WhoamiQueryVariables>(WhoamiDocument, options);
        }
export type WhoamiQueryHookResult = ReturnType<typeof useWhoamiQuery>;
export type WhoamiLazyQueryHookResult = ReturnType<typeof useWhoamiLazyQuery>;
export type WhoamiSuspenseQueryHookResult = ReturnType<typeof useWhoamiSuspenseQuery>;
export type WhoamiQueryResult = Apollo.QueryResult<WhoamiQuery, WhoamiQueryVariables>;
export const OnActiveEngagementChangedDocument = gql`
    subscription OnActiveEngagementChanged($eventSlug: String!) {
  activeEngagementChanged(eventSlug: $eventSlug) {
    ...StageEngagement
  }
}
    ${StageEngagementFragmentDoc}`;

/**
 * __useOnActiveEngagementChangedSubscription__
 *
 * To run a query within a React component, call `useOnActiveEngagementChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnActiveEngagementChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnActiveEngagementChangedSubscription({
 *   variables: {
 *      eventSlug: // value for 'eventSlug'
 *   },
 * });
 */
export function useOnActiveEngagementChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnActiveEngagementChangedSubscription, OnActiveEngagementChangedSubscriptionVariables> & ({ variables: OnActiveEngagementChangedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnActiveEngagementChangedSubscription, OnActiveEngagementChangedSubscriptionVariables>(OnActiveEngagementChangedDocument, options);
      }
export type OnActiveEngagementChangedSubscriptionHookResult = ReturnType<typeof useOnActiveEngagementChangedSubscription>;
export type OnActiveEngagementChangedSubscriptionResult = Apollo.SubscriptionResult<OnActiveEngagementChangedSubscription>;
export const OnEngagementViewDataChangedDocument = gql`
    subscription OnEngagementViewDataChanged($engagementId: Int!) {
  engagementViewDataChanged(engagementId: $engagementId) {
    viewData {
      ...PhotoCarouselViewDataFields
      ...VoteForViewDataFields
    }
  }
}
    ${PhotoCarouselViewDataFieldsFragmentDoc}
${VoteForViewDataFieldsFragmentDoc}`;

/**
 * __useOnEngagementViewDataChangedSubscription__
 *
 * To run a query within a React component, call `useOnEngagementViewDataChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnEngagementViewDataChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnEngagementViewDataChangedSubscription({
 *   variables: {
 *      engagementId: // value for 'engagementId'
 *   },
 * });
 */
export function useOnEngagementViewDataChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnEngagementViewDataChangedSubscription, OnEngagementViewDataChangedSubscriptionVariables> & ({ variables: OnEngagementViewDataChangedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnEngagementViewDataChangedSubscription, OnEngagementViewDataChangedSubscriptionVariables>(OnEngagementViewDataChangedDocument, options);
      }
export type OnEngagementViewDataChangedSubscriptionHookResult = ReturnType<typeof useOnEngagementViewDataChangedSubscription>;
export type OnEngagementViewDataChangedSubscriptionResult = Apollo.SubscriptionResult<OnEngagementViewDataChangedSubscription>;
export const OnReactionsCreatedDocument = gql`
    subscription OnReactionsCreated($submissionId: Int!) {
  reactionsCreated(submissionId: $submissionId) {
    reactions {
      ...StageReaction
    }
  }
}
    ${StageReactionFragmentDoc}`;

/**
 * __useOnReactionsCreatedSubscription__
 *
 * To run a query within a React component, call `useOnReactionsCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnReactionsCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnReactionsCreatedSubscription({
 *   variables: {
 *      submissionId: // value for 'submissionId'
 *   },
 * });
 */
export function useOnReactionsCreatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnReactionsCreatedSubscription, OnReactionsCreatedSubscriptionVariables> & ({ variables: OnReactionsCreatedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnReactionsCreatedSubscription, OnReactionsCreatedSubscriptionVariables>(OnReactionsCreatedDocument, options);
      }
export type OnReactionsCreatedSubscriptionHookResult = ReturnType<typeof useOnReactionsCreatedSubscription>;
export type OnReactionsCreatedSubscriptionResult = Apollo.SubscriptionResult<OnReactionsCreatedSubscription>;
export const OnSubmissionDeletedDocument = gql`
    subscription OnSubmissionDeleted($engagementId: Int!) {
  submissionDeleted(engagementId: $engagementId) {
    submissionId
  }
}
    `;

/**
 * __useOnSubmissionDeletedSubscription__
 *
 * To run a query within a React component, call `useOnSubmissionDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnSubmissionDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnSubmissionDeletedSubscription({
 *   variables: {
 *      engagementId: // value for 'engagementId'
 *   },
 * });
 */
export function useOnSubmissionDeletedSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnSubmissionDeletedSubscription, OnSubmissionDeletedSubscriptionVariables> & ({ variables: OnSubmissionDeletedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnSubmissionDeletedSubscription, OnSubmissionDeletedSubscriptionVariables>(OnSubmissionDeletedDocument, options);
      }
export type OnSubmissionDeletedSubscriptionHookResult = ReturnType<typeof useOnSubmissionDeletedSubscription>;
export type OnSubmissionDeletedSubscriptionResult = Apollo.SubscriptionResult<OnSubmissionDeletedSubscription>;