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

export type CreateReactionInput = {
  type: Scalars['String']['input'];
};

export type CreateSubmissionInput = {
  data: Scalars['Json']['input'];
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

export type Mutation = {
  __typename?: 'Mutation';
  adminCreatePresignedUrl: PresignedUrlResponse;
  adminGenerateImage: GenerateImageResponse;
  changeEventActiveEngagement: Event;
  createEngagement: Engagement;
  createEvent: Event;
  createReaction: Reaction;
  createSubmission: Submission;
  createSubmissionPresignedUrl: PresignedUrlResponse;
  deleteEngagement: Engagement;
  deleteEvent: Event;
  deleteReaction: Reaction;
  deleteSubmission: Submission;
  login?: Maybe<User>;
  moveEngagement: Array<Engagement>;
  signup: User;
  updateEngagement: Engagement;
  updateEvent: Event;
  updateEventFanConfig: EventFanConfig;
  updateEventStageConfig: EventStageConfig;
  updateReaction: Reaction;
  updateSubmission: Submission;
};


export type MutationAdminCreatePresignedUrlArgs = {
  mimeType: Scalars['String']['input'];
};


export type MutationAdminGenerateImageArgs = {
  data: GenerateImageInput;
};


export type MutationChangeEventActiveEngagementArgs = {
  engagementId?: InputMaybe<Scalars['Int']['input']>;
  eventId: Scalars['Int']['input'];
};


export type MutationCreateEngagementArgs = {
  data: CreateEngagementInput;
  eventId: Scalars['Int']['input'];
};


export type MutationCreateEventArgs = {
  data?: InputMaybe<CreateEventInput>;
};


export type MutationCreateReactionArgs = {
  submissionId: Scalars['Int']['input'];
  type: Scalars['String']['input'];
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


export type MutationDeleteReactionArgs = {
  reactionId: Scalars['Int']['input'];
};


export type MutationDeleteSubmissionArgs = {
  submissionId: Scalars['Int']['input'];
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


export type MutationUpdateReactionArgs = {
  reactionId: Scalars['Int']['input'];
  type: Scalars['String']['input'];
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
  randomName: Scalars['String']['output'];
  submission?: Maybe<Submission>;
  submissions: Array<Submission>;
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


export type QuerySubmissionArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySubmissionsArgs = {
  engagementId: Scalars['Int']['input'];
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
  engagementViewDataChanged?: Maybe<EngagementViewDataChangedPayload>;
  reactionsCreated?: Maybe<ReactionsCreatedPayload>;
  submissionCreated?: Maybe<SubmissionCreatedPayload>;
  submissionDeleted?: Maybe<SubmissionDeletedPayload>;
};


export type SubscriptionActiveEngagementChangedArgs = {
  eventSlug: Scalars['String']['input'];
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

export type UpdateReactionInput = {
  type: Scalars['String']['input'];
};

export type UpdateSubmissionInput = {
  data: Scalars['Json']['input'];
};

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