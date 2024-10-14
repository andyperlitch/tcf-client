/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  allowSubmissions: Scalars['Boolean']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<EngagementStatus>;
  title: Scalars['String']['input'];
  viewType: Scalars['String']['input'];
};

export type CreateEventInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  live?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export enum EngagementStatus {
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED'
}

export enum Role {
  Admin = 'ADMIN',
  Anon = 'ANON',
  Bandmate = 'BANDMATE'
}

export type UpdateEngagementInput = {
  allowSubmissions?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<EngagementStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
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

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: number, email?: string | null, name?: string | null, username?: string | null, role: Role } | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
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
  allowSubmissions: Scalars['Boolean']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<EngagementStatus>;
  title: Scalars['String']['input'];
  viewType: Scalars['String']['input'];
};

export type CreateEventInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  live?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type Engagement = {
  __typename?: 'Engagement';
  allowSubmissions: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  startTime?: Maybe<Scalars['DateTime']['output']>;
  status: EngagementStatus;
  submissions: Array<Submission>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  viewType: Scalars['String']['output'];
};

export enum EngagementStatus {
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED'
}

export type Event = {
  __typename?: 'Event';
  activeEngagement?: Maybe<Engagement>;
  activeEngagementId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  date?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  engagements: Array<Engagement>;
  id: Scalars['Int']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEngagement: Engagement;
  createEvent: Event;
  createReaction: Reaction;
  createSubmission: Submission;
  login?: Maybe<User>;
  updateEngagement: Engagement;
  updateEngagementStatus: Engagement;
  updateEvent: Event;
  updateEventActiveEngagement: Event;
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
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateSubmissionArgs = {
  data: Scalars['Json']['input'];
  engagementId: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateEngagementArgs = {
  data: UpdateEngagementInput;
  engagementId: Scalars['Int']['input'];
};


export type MutationUpdateEngagementStatusArgs = {
  engagementId: Scalars['Int']['input'];
  status: EngagementStatus;
};


export type MutationUpdateEventArgs = {
  data?: InputMaybe<UpdateEventInput>;
  eventId: Scalars['Int']['input'];
};


export type MutationUpdateEventActiveEngagementArgs = {
  engagementId: Scalars['Int']['input'];
  eventId: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  engagement?: Maybe<Engagement>;
  engagements: Array<Engagement>;
  event?: Maybe<Event>;
  events: Array<Event>;
  submissions: Array<Submission>;
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
  engagementStatusChanged?: Maybe<EngagementStatus>;
  newReaction?: Maybe<Reaction>;
  newSubmission?: Maybe<Submission>;
};


export type SubscriptionActiveEngagementChangedArgs = {
  eventId: Scalars['Int']['input'];
};


export type SubscriptionEngagementStatusChangedArgs = {
  engagementId: Scalars['Int']['input'];
};


export type SubscriptionNewReactionArgs = {
  engagementId: Scalars['Int']['input'];
};


export type SubscriptionNewSubmissionArgs = {
  engagementId: Scalars['Int']['input'];
};

export type UpdateEngagementInput = {
  allowSubmissions?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<EngagementStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
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

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role: Role;
  username?: Maybe<Scalars['String']['output']>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: number, email?: string | null, name?: string | null, username?: string | null, role: Role } | null };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
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
 *      email: // value for 'email'
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