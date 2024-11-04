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
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
  viewConfig?: InputMaybe<Scalars['Json']['input']>;
  viewData?: InputMaybe<Scalars['Json']['input']>;
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
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  startTime?: Maybe<Scalars['DateTime']['output']>;
  submissions: Array<Submission>;
  title: Scalars['String']['output'];
  type: EngagementType;
  updatedAt: Scalars['DateTime']['output'];
  viewConfig?: Maybe<EngagementConfig>;
  viewData?: Maybe<EngagementData>;
};

export type EngagementConfig = PhotoCarouselConfig | VoteForConfig;

export type EngagementData = PhotoCarouselData | VoteForData;

export enum EngagementType {
  PhotoCarousel = 'PHOTO_CAROUSEL',
  VoteFor = 'VOTE_FOR'
}

export type EngagementViewDataChangedPayload = {
  __typename?: 'EngagementViewDataChangedPayload';
  viewData: EngagementData;
};

export type Event = {
  __typename?: 'Event';
  activeEngagement?: Maybe<Engagement>;
  activeEngagementId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  date?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  engagements: Array<Engagement>;
  id: Scalars['Int']['output'];
  live: Scalars['Boolean']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeEventActiveEngagement: Event;
  createEngagement: Engagement;
  createEvent: Event;
  createReaction: Reaction;
  createSubmission: Submission;
  createSubmissionPresignedUrl: PresignedUrlResponse;
  deleteEngagement: Engagement;
  deleteReaction: Reaction;
  deleteSubmission: Submission;
  login?: Maybe<User>;
  signup: User;
  updateEngagement: Engagement;
  updateEvent: Event;
  updateReaction: Reaction;
  updateSubmission: Submission;
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


export type MutationUpdateReactionArgs = {
  reactionId: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};


export type MutationUpdateSubmissionArgs = {
  data: Scalars['Json']['input'];
  submissionId: Scalars['Int']['input'];
};

export type PhotoCarouselConfig = {
  __typename?: 'PhotoCarouselConfig';
  maxSubmissionsPerUser: Scalars['Int']['output'];
};

export type PhotoCarouselData = {
  __typename?: 'PhotoCarouselData';
  visibleSubmission?: Maybe<Scalars['Int']['output']>;
};

export type PresignedUrlResponse = {
  __typename?: 'PresignedUrlResponse';
  key: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  canCreateSubmission: Scalars['Boolean']['output'];
  engagement?: Maybe<Engagement>;
  engagements: Array<Engagement>;
  event?: Maybe<Event>;
  events: Array<Event>;
  randomName: Scalars['String']['output'];
  submission?: Maybe<Submission>;
  submissions: Array<Submission>;
  whoami?: Maybe<User>;
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

export type Reaction = {
  __typename?: 'Reaction';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  submissionId: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export enum Role {
  Admin = 'ADMIN',
  Anon = 'ANON',
  Bandmate = 'BANDMATE'
}

export type SignupInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Submission = {
  __typename?: 'Submission';
  createdAt: Scalars['DateTime']['output'];
  data: Scalars['Json']['output'];
  hash?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  reactions: Array<Reaction>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  activeEngagementChanged?: Maybe<Engagement>;
  engagementViewDataChanged?: Maybe<EngagementViewDataChangedPayload>;
};


export type SubscriptionActiveEngagementChangedArgs = {
  eventSlug: Scalars['String']['input'];
};


export type SubscriptionEngagementViewDataChangedArgs = {
  engagementId: Scalars['Int']['input'];
};

export type UpdateEngagementInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  viewConfig?: InputMaybe<Scalars['Json']['input']>;
  viewData?: InputMaybe<Scalars['Json']['input']>;
  viewType?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEventInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  live?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
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

export type VoteForConfig = {
  __typename?: 'VoteForConfig';
  votesPerUser: Scalars['Int']['output'];
};

export type VoteForData = {
  __typename?: 'VoteForData';
  voteCounts: Array<VoteCount>;
};

export type AdminEngagementFragment = { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, order: number, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null };

export type AdminEventFragment = { __typename?: 'Event', id: number, name: string, date?: any | null, location?: string | null, description?: string | null, slug: string, live: boolean, createdAt: any, updatedAt: any, activeEngagementId?: number | null, activeEngagement?: { __typename?: 'Engagement', id: number } | null, engagements: Array<{ __typename?: 'Engagement', id: number, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, order: number, createdAt: any, updatedAt: any, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null }> };

export type AdminSubmissionFragment = { __typename?: 'Submission', id: number, data: any, createdAt: any, reactions: Array<{ __typename?: 'Reaction', id: number, type: string }> };

type EngagementViewConfig_PhotoCarouselConfig_Fragment = { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number };

type EngagementViewConfig_VoteForConfig_Fragment = { __typename?: 'VoteForConfig', votesPerUser: number };

export type EngagementViewConfigFragment = EngagementViewConfig_PhotoCarouselConfig_Fragment | EngagementViewConfig_VoteForConfig_Fragment;

type EngagementViewData_PhotoCarouselData_Fragment = { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null };

type EngagementViewData_VoteForData_Fragment = { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> };

export type EngagementViewDataFragment = EngagementViewData_PhotoCarouselData_Fragment | EngagementViewData_VoteForData_Fragment;

export type FanEngagementFragment = { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, submissions: Array<{ __typename?: 'Submission', id: number, createdAt: any, data: any, reactions: Array<{ __typename?: 'Reaction', id: number, createdAt: any, type: string, userId?: number | null, user?: { __typename?: 'User', id: number, name?: string | null } | null }> }> };

export type FanEventFragment = { __typename?: 'Event', id: number, name: string, live: boolean, description?: string | null, date?: any | null, location?: string | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, submissions: Array<{ __typename?: 'Submission', id: number, createdAt: any, data: any, reactions: Array<{ __typename?: 'Reaction', id: number, createdAt: any, type: string, userId?: number | null, user?: { __typename?: 'User', id: number, name?: string | null } | null }> }> } | null };

export type FanSubmissionFragment = { __typename?: 'Submission', id: number, data: any, createdAt: any, reactions: Array<{ __typename?: 'Reaction', id: number, type: string }> };

export type StageEngagementFragment = { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, submissions: Array<{ __typename?: 'Submission', id: number, createdAt: any, data: any, reactions: Array<{ __typename?: 'Reaction', id: number, createdAt: any, type: string, userId?: number | null, user?: { __typename?: 'User', id: number, name?: string | null } | null }> }> };

export type StageEventFragment = { __typename?: 'Event', id: number, name: string, live: boolean, slug: string, description?: string | null, date?: any | null, location?: string | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, submissions: Array<{ __typename?: 'Submission', id: number, createdAt: any, data: any, reactions: Array<{ __typename?: 'Reaction', id: number, createdAt: any, type: string, userId?: number | null, user?: { __typename?: 'User', id: number, name?: string | null } | null }> }> } | null };

export type StageSubmissionFragment = { __typename?: 'Submission', id: number, createdAt: any, data: any, reactions: Array<{ __typename?: 'Reaction', id: number, createdAt: any, type: string, userId?: number | null, user?: { __typename?: 'User', id: number, name?: string | null } | null }> };

export type UserEngagementFragment = { __typename?: 'Engagement', id: number, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null };

export type AdminChangeEventActiveEngagementMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
  engagementId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AdminChangeEventActiveEngagementMutation = { __typename?: 'Mutation', changeEventActiveEngagement: { __typename?: 'Event', id: number, activeEngagementId?: number | null, createdAt: any } };

export type AdminCreateEngagementMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
  input: CreateEngagementInput;
}>;


export type AdminCreateEngagementMutation = { __typename?: 'Mutation', createEngagement: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, order: number, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null } };

export type AdminCreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type AdminCreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id: number, name: string, date?: any | null, location?: string | null, description?: string | null, slug: string, live: boolean, createdAt: any, updatedAt: any, activeEngagementId?: number | null, activeEngagement?: { __typename?: 'Engagement', id: number } | null, engagements: Array<{ __typename?: 'Engagement', id: number, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, order: number, createdAt: any, updatedAt: any, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null }> } };

export type AdminDeleteEngagementMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminDeleteEngagementMutation = { __typename?: 'Mutation', deleteEngagement: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, order: number, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null } };

export type AdminDeleteSubmissionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminDeleteSubmissionMutation = { __typename?: 'Mutation', deleteSubmission: { __typename?: 'Submission', id: number, data: any, createdAt: any, reactions: Array<{ __typename?: 'Reaction', id: number, type: string }> } };

export type AdminUpdateEventMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateEventInput;
}>;


export type AdminUpdateEventMutation = { __typename?: 'Mutation', updateEvent: { __typename?: 'Event', id: number, name: string, date?: any | null, location?: string | null, description?: string | null, slug: string, live: boolean, createdAt: any, updatedAt: any, activeEngagementId?: number | null, activeEngagement?: { __typename?: 'Engagement', id: number } | null, engagements: Array<{ __typename?: 'Engagement', id: number, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, order: number, createdAt: any, updatedAt: any, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null }> } };

export type CreateSubmissionPresignedUrlMutationVariables = Exact<{
  engagementId: Scalars['Int']['input'];
  mimeType: Scalars['String']['input'];
}>;


export type CreateSubmissionPresignedUrlMutation = { __typename?: 'Mutation', createSubmissionPresignedUrl: { __typename?: 'PresignedUrlResponse', url: string, key: string } };

export type FanCreateSubmissionMutationVariables = Exact<{
  engagementId: Scalars['Int']['input'];
  data: Scalars['Json']['input'];
}>;


export type FanCreateSubmissionMutation = { __typename?: 'Mutation', createSubmission: { __typename?: 'Submission', id: number, data: any, createdAt: any, reactions: Array<{ __typename?: 'Reaction', id: number, type: string }> } };

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


export type AdminGetEngagementQuery = { __typename?: 'Query', engagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, order: number, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null } | null };

export type AdminGetEngagementsQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type AdminGetEngagementsQuery = { __typename?: 'Query', engagements: Array<{ __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, order: number, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null }> };

export type AdminGetEventQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type AdminGetEventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: number, name: string, date?: any | null, location?: string | null, description?: string | null, slug: string, live: boolean, createdAt: any, updatedAt: any, activeEngagementId?: number | null, activeEngagement?: { __typename?: 'Engagement', id: number } | null, engagements: Array<{ __typename?: 'Engagement', id: number, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, order: number, createdAt: any, updatedAt: any, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null }> } | null };

export type AdminGetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminGetEventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: number, name: string, date?: any | null, location?: string | null, description?: string | null, slug: string, live: boolean, createdAt: any, updatedAt: any, activeEngagementId?: number | null, activeEngagement?: { __typename?: 'Engagement', id: number } | null, engagements: Array<{ __typename?: 'Engagement', id: number, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, order: number, createdAt: any, updatedAt: any, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null }> }> };

export type AdminGetSubmissionsQueryVariables = Exact<{
  engagementId: Scalars['Int']['input'];
}>;


export type AdminGetSubmissionsQuery = { __typename?: 'Query', submissions: Array<{ __typename?: 'Submission', id: number, data: any, createdAt: any, reactions: Array<{ __typename?: 'Reaction', id: number, type: string }> }> };

export type FanGetEventQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type FanGetEventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: number, name: string, live: boolean, description?: string | null, date?: any | null, location?: string | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, submissions: Array<{ __typename?: 'Submission', id: number, createdAt: any, data: any, reactions: Array<{ __typename?: 'Reaction', id: number, createdAt: any, type: string, userId?: number | null, user?: { __typename?: 'User', id: number, name?: string | null } | null }> }> } | null } | null };

export type RandomNameQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomNameQuery = { __typename?: 'Query', randomName: string };

export type StageGetEventQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type StageGetEventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: number, name: string, live: boolean, slug: string, description?: string | null, date?: any | null, location?: string | null, activeEngagement?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, submissions: Array<{ __typename?: 'Submission', id: number, createdAt: any, data: any, reactions: Array<{ __typename?: 'Reaction', id: number, createdAt: any, type: string, userId?: number | null, user?: { __typename?: 'User', id: number, name?: string | null } | null }> }> } | null } | null };

export type StageGetSubmissionQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type StageGetSubmissionQuery = { __typename?: 'Query', submission?: { __typename?: 'Submission', id: number, createdAt: any, data: any, reactions: Array<{ __typename?: 'Reaction', id: number, createdAt: any, type: string, userId?: number | null, user?: { __typename?: 'User', id: number, name?: string | null } | null }> } | null };

export type WhoamiQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoamiQuery = { __typename?: 'Query', whoami?: { __typename?: 'User', id: number, email?: string | null, username?: string | null, name?: string | null, lastLogin?: any | null, role: Role } | null };

export type OnActiveEngagementChangedSubscriptionVariables = Exact<{
  eventSlug: Scalars['String']['input'];
}>;


export type OnActiveEngagementChangedSubscription = { __typename?: 'Subscription', activeEngagementChanged?: { __typename?: 'Engagement', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null, startTime?: any | null, endTime?: any | null, type: EngagementType, order: number, viewConfig?: { __typename?: 'PhotoCarouselConfig', maxSubmissionsPerUser: number } | { __typename?: 'VoteForConfig', votesPerUser: number } | null, viewData?: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } | null, submissions: Array<{ __typename?: 'Submission', id: number, createdAt: any, data: any, reactions: Array<{ __typename?: 'Reaction', id: number, createdAt: any, type: string, userId?: number | null, user?: { __typename?: 'User', id: number, name?: string | null } | null }> }> } | null };

export type OnEngagementViewDataChangedSubscriptionVariables = Exact<{
  engagementId: Scalars['Int']['input'];
}>;


export type OnEngagementViewDataChangedSubscription = { __typename?: 'Subscription', engagementViewDataChanged?: { __typename?: 'EngagementViewDataChangedPayload', viewData: { __typename?: 'PhotoCarouselData', visibleSubmission?: number | null } | { __typename?: 'VoteForData', voteCounts: Array<{ __typename?: 'VoteCount', submissionId: number, count: number }> } } | null };

export const EngagementViewConfigFragmentDoc = gql`
    fragment EngagementViewConfig on EngagementConfig {
  ... on PhotoCarouselConfig {
    maxSubmissionsPerUser
  }
  ... on VoteForConfig {
    votesPerUser
  }
}
    `;
export const EngagementViewDataFragmentDoc = gql`
    fragment EngagementViewData on EngagementData {
  ... on PhotoCarouselData {
    visibleSubmission
  }
  ... on VoteForData {
    voteCounts {
      submissionId
      count
    }
  }
}
    `;
export const AdminEngagementFragmentDoc = gql`
    fragment AdminEngagement on Engagement {
  id
  createdAt
  updatedAt
  title
  description
  startTime
  endTime
  viewConfig {
    ...EngagementViewConfig
  }
  viewData {
    ...EngagementViewData
  }
  order
}
    ${EngagementViewConfigFragmentDoc}
${EngagementViewDataFragmentDoc}`;
export const AdminEventFragmentDoc = gql`
    fragment AdminEvent on Event {
  id
  name
  date
  location
  description
  slug
  live
  createdAt
  updatedAt
  activeEngagement {
    id
  }
  activeEngagementId
  engagements {
    id
    title
    description
    startTime
    endTime
    viewConfig {
      ...EngagementViewConfig
    }
    viewData {
      ...EngagementViewData
    }
    order
    createdAt
    updatedAt
  }
}
    ${EngagementViewConfigFragmentDoc}
${EngagementViewDataFragmentDoc}`;
export const AdminSubmissionFragmentDoc = gql`
    fragment AdminSubmission on Submission {
  id
  data
  createdAt
  reactions {
    id
    type
  }
}
    `;
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
    ...EngagementViewConfig
  }
  viewData {
    ...EngagementViewData
  }
  type
  order
  submissions {
    id
    createdAt
    data
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
}
    ${EngagementViewConfigFragmentDoc}
${EngagementViewDataFragmentDoc}`;
export const FanEventFragmentDoc = gql`
    fragment FanEvent on Event {
  id
  name
  live
  description
  date
  location
  activeEngagement {
    ...FanEngagement
  }
}
    ${FanEngagementFragmentDoc}`;
export const FanSubmissionFragmentDoc = gql`
    fragment FanSubmission on Submission {
  id
  data
  createdAt
  reactions {
    id
    type
  }
}
    `;
export const StageSubmissionFragmentDoc = gql`
    fragment StageSubmission on Submission {
  id
  createdAt
  data
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
    `;
export const StageEngagementFragmentDoc = gql`
    fragment StageEngagement on Engagement {
  id
  createdAt
  updatedAt
  title
  description
  startTime
  endTime
  viewConfig {
    ... on PhotoCarouselConfig {
      maxSubmissionsPerUser
    }
    ... on VoteForConfig {
      votesPerUser
    }
  }
  viewData {
    ... on PhotoCarouselData {
      visibleSubmission
    }
    ... on VoteForData {
      voteCounts {
        submissionId
        count
      }
    }
  }
  type
  order
  submissions {
    ...StageSubmission
  }
}
    ${StageSubmissionFragmentDoc}`;
export const StageEventFragmentDoc = gql`
    fragment StageEvent on Event {
  id
  name
  live
  slug
  description
  date
  location
  activeEngagement {
    ...StageEngagement
  }
}
    ${StageEngagementFragmentDoc}`;
export const UserEngagementFragmentDoc = gql`
    fragment UserEngagement on Engagement {
  id
  title
  description
  startTime
  endTime
  viewConfig {
    ...EngagementViewConfig
  }
  viewData {
    ...EngagementViewData
  }
  type
}
    ${EngagementViewConfigFragmentDoc}
${EngagementViewDataFragmentDoc}`;
export const AdminChangeEventActiveEngagementDocument = gql`
    mutation adminChangeEventActiveEngagement($eventId: Int!, $engagementId: Int) {
  changeEventActiveEngagement(engagementId: $engagementId, eventId: $eventId) {
    id
    activeEngagementId
    createdAt
  }
}
    `;
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
export const FanCreateSubmissionDocument = gql`
    mutation fanCreateSubmission($engagementId: Int!, $data: Json!) {
  createSubmission(engagementId: $engagementId, data: $data) {
    ...FanSubmission
  }
}
    ${FanSubmissionFragmentDoc}`;
export type FanCreateSubmissionMutationFn = Apollo.MutationFunction<FanCreateSubmissionMutation, FanCreateSubmissionMutationVariables>;

/**
 * __useFanCreateSubmissionMutation__
 *
 * To run a mutation, you first call `useFanCreateSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFanCreateSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fanCreateSubmissionMutation, { data, loading, error }] = useFanCreateSubmissionMutation({
 *   variables: {
 *      engagementId: // value for 'engagementId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFanCreateSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<FanCreateSubmissionMutation, FanCreateSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FanCreateSubmissionMutation, FanCreateSubmissionMutationVariables>(FanCreateSubmissionDocument, options);
      }
export type FanCreateSubmissionMutationHookResult = ReturnType<typeof useFanCreateSubmissionMutation>;
export type FanCreateSubmissionMutationResult = Apollo.MutationResult<FanCreateSubmissionMutation>;
export type FanCreateSubmissionMutationOptions = Apollo.BaseMutationOptions<FanCreateSubmissionMutation, FanCreateSubmissionMutationVariables>;
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
      ...EngagementViewData
    }
  }
}
    ${EngagementViewDataFragmentDoc}`;

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