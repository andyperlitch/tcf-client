import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  Json: { input: any; output: any };
};

export type CreateEngagementInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  endTime?: InputMaybe<Scalars["DateTime"]["input"]>;
  startTime?: InputMaybe<Scalars["DateTime"]["input"]>;
  status?: InputMaybe<EngagementStatus>;
  title: Scalars["String"]["input"];
  viewConfig?: InputMaybe<Scalars["Json"]["input"]>;
  viewData?: InputMaybe<Scalars["Json"]["input"]>;
};

export type CreateEventInput = {
  date?: InputMaybe<Scalars["DateTime"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  live?: InputMaybe<Scalars["Boolean"]["input"]>;
  location?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  slug: Scalars["String"]["input"];
};

export type Engagement = {
  __typename?: "Engagement";
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  endTime?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["Int"]["output"];
  order: Scalars["Int"]["output"];
  startTime?: Maybe<Scalars["DateTime"]["output"]>;
  status: EngagementStatus;
  submissions: Array<Submission>;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  viewConfig?: Maybe<Scalars["Json"]["output"]>;
  viewData?: Maybe<Scalars["Json"]["output"]>;
};

export enum EngagementStatus {
  Finished = "FINISHED",
  InProgress = "IN_PROGRESS",
  NotStarted = "NOT_STARTED",
}

export type Event = {
  __typename?: "Event";
  activeEngagement?: Maybe<Engagement>;
  activeEngagementId?: Maybe<Scalars["Int"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  date?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  engagements: Array<Engagement>;
  id: Scalars["Int"]["output"];
  live: Scalars["Boolean"]["output"];
  location?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createEngagement: Engagement;
  createEvent: Event;
  createReaction: Reaction;
  createSubmission: Submission;
  deleteEngagement: Engagement;
  login?: Maybe<User>;
  updateEngagement: Engagement;
  updateEngagementStatus: Engagement;
  updateEvent: Event;
  updateEventActiveEngagement: Event;
};

export type MutationCreateEngagementArgs = {
  data: CreateEngagementInput;
  eventId: Scalars["Int"]["input"];
};

export type MutationCreateEventArgs = {
  data?: InputMaybe<CreateEventInput>;
};

export type MutationCreateReactionArgs = {
  submissionId: Scalars["Int"]["input"];
  type: Scalars["String"]["input"];
  userId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationCreateSubmissionArgs = {
  data: Scalars["Json"]["input"];
  engagementId: Scalars["Int"]["input"];
  userId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationDeleteEngagementArgs = {
  engagementId: Scalars["Int"]["input"];
};

export type MutationLoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationUpdateEngagementArgs = {
  data: UpdateEngagementInput;
  engagementId: Scalars["Int"]["input"];
};

export type MutationUpdateEngagementStatusArgs = {
  engagementId: Scalars["Int"]["input"];
  status: EngagementStatus;
};

export type MutationUpdateEventArgs = {
  data?: InputMaybe<UpdateEventInput>;
  eventId: Scalars["Int"]["input"];
};

export type MutationUpdateEventActiveEngagementArgs = {
  engagementId?: InputMaybe<Scalars["Int"]["input"]>;
  eventId: Scalars["Int"]["input"];
};

export type Query = {
  __typename?: "Query";
  engagement?: Maybe<Engagement>;
  engagements: Array<Engagement>;
  event?: Maybe<Event>;
  events: Array<Event>;
  submissions: Array<Submission>;
};

export type QueryEngagementArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryEngagementsArgs = {
  eventId: Scalars["Int"]["input"];
};

export type QueryEventArgs = {
  slug: Scalars["String"]["input"];
};

export type QuerySubmissionsArgs = {
  engagementId: Scalars["Int"]["input"];
};

export type Reaction = {
  __typename?: "Reaction";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  submissionId: Scalars["Int"]["output"];
  type: Scalars["String"]["output"];
  user?: Maybe<User>;
  userId?: Maybe<Scalars["Int"]["output"]>;
};

export enum Role {
  Admin = "ADMIN",
  Anon = "ANON",
  Bandmate = "BANDMATE",
}

export type Submission = {
  __typename?: "Submission";
  createdAt: Scalars["DateTime"]["output"];
  data: Scalars["Json"]["output"];
  hash?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["Int"]["output"];
  reactions: Array<Reaction>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars["Int"]["output"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  activeEngagementChanged?: Maybe<Engagement>;
  engagementStatusChanged?: Maybe<EngagementStatus>;
  newReaction?: Maybe<Reaction>;
  newSubmission?: Maybe<Submission>;
};

export type SubscriptionActiveEngagementChangedArgs = {
  eventId: Scalars["Int"]["input"];
};

export type SubscriptionEngagementStatusChangedArgs = {
  engagementId: Scalars["Int"]["input"];
};

export type SubscriptionNewReactionArgs = {
  engagementId: Scalars["Int"]["input"];
};

export type SubscriptionNewSubmissionArgs = {
  engagementId: Scalars["Int"]["input"];
};

export type UpdateEngagementInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  endTime?: InputMaybe<Scalars["DateTime"]["input"]>;
  order?: InputMaybe<Scalars["Int"]["input"]>;
  startTime?: InputMaybe<Scalars["DateTime"]["input"]>;
  status?: InputMaybe<EngagementStatus>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  viewConfig?: InputMaybe<Scalars["Json"]["input"]>;
  viewData?: InputMaybe<Scalars["Json"]["input"]>;
  viewType?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateEventInput = {
  date?: InputMaybe<Scalars["DateTime"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  live?: InputMaybe<Scalars["Boolean"]["input"]>;
  location?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["Int"]["output"];
  lastLogin?: Maybe<Scalars["DateTime"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  role: Role;
  username?: Maybe<Scalars["String"]["output"]>;
};

export type AdminEngagementFragment = {
  __typename?: "Engagement";
  id: number;
  createdAt: any;
  updatedAt: any;
  title: string;
  description?: string | null;
  startTime?: any | null;
  endTime?: any | null;
  viewConfig?: any | null;
  viewData?: any | null;
  status: EngagementStatus;
  order: number;
};

export type AdminEventFragment = {
  __typename?: "Event";
  id: number;
  name: string;
  date?: any | null;
  location?: string | null;
  description?: string | null;
  slug: string;
  live: boolean;
  createdAt: any;
  updatedAt: any;
  activeEngagementId?: number | null;
  activeEngagement?: { __typename?: "Engagement"; id: number } | null;
  engagements: Array<{
    __typename?: "Engagement";
    id: number;
    title: string;
    description?: string | null;
    startTime?: any | null;
    endTime?: any | null;
    viewData?: any | null;
    viewConfig?: any | null;
    status: EngagementStatus;
    order: number;
    createdAt: any;
    updatedAt: any;
  }>;
};

export type UserEventFragment = {
  __typename?: "Event";
  id: number;
  name: string;
  live: boolean;
  description?: string | null;
  date?: any | null;
  location?: string | null;
};

export type AdminCreateEngagementMutationVariables = Exact<{
  eventId: Scalars["Int"]["input"];
  input: CreateEngagementInput;
}>;

export type AdminCreateEngagementMutation = {
  __typename?: "Mutation";
  createEngagement: {
    __typename?: "Engagement";
    id: number;
    createdAt: any;
    updatedAt: any;
    title: string;
    description?: string | null;
    startTime?: any | null;
    endTime?: any | null;
    viewConfig?: any | null;
    viewData?: any | null;
    status: EngagementStatus;
    order: number;
  };
};

export type AdminCreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;

export type AdminCreateEventMutation = {
  __typename?: "Mutation";
  createEvent: {
    __typename?: "Event";
    id: number;
    name: string;
    date?: any | null;
    location?: string | null;
    description?: string | null;
    slug: string;
    live: boolean;
    createdAt: any;
    updatedAt: any;
    activeEngagementId?: number | null;
    activeEngagement?: { __typename?: "Engagement"; id: number } | null;
    engagements: Array<{
      __typename?: "Engagement";
      id: number;
      title: string;
      description?: string | null;
      startTime?: any | null;
      endTime?: any | null;
      viewData?: any | null;
      viewConfig?: any | null;
      status: EngagementStatus;
      order: number;
      createdAt: any;
      updatedAt: any;
    }>;
  };
};

export type AdminDeleteEngagementMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type AdminDeleteEngagementMutation = {
  __typename?: "Mutation";
  deleteEngagement: {
    __typename?: "Engagement";
    id: number;
    createdAt: any;
    updatedAt: any;
    title: string;
    description?: string | null;
    startTime?: any | null;
    endTime?: any | null;
    viewConfig?: any | null;
    viewData?: any | null;
    status: EngagementStatus;
    order: number;
  };
};

export type AdminUpdateEventMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
  data: UpdateEventInput;
}>;

export type AdminUpdateEventMutation = {
  __typename?: "Mutation";
  updateEvent: {
    __typename?: "Event";
    id: number;
    name: string;
    date?: any | null;
    location?: string | null;
    description?: string | null;
    slug: string;
    live: boolean;
    createdAt: any;
    updatedAt: any;
    activeEngagementId?: number | null;
    activeEngagement?: { __typename?: "Engagement"; id: number } | null;
    engagements: Array<{
      __typename?: "Engagement";
      id: number;
      title: string;
      description?: string | null;
      startTime?: any | null;
      endTime?: any | null;
      viewData?: any | null;
      viewConfig?: any | null;
      status: EngagementStatus;
      order: number;
      createdAt: any;
      updatedAt: any;
    }>;
  };
};

export type AdminUpdateEventActiveEngagementMutationVariables = Exact<{
  eventId: Scalars["Int"]["input"];
  engagementId?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type AdminUpdateEventActiveEngagementMutation = {
  __typename?: "Mutation";
  updateEventActiveEngagement: {
    __typename?: "Event";
    id: number;
    activeEngagementId?: number | null;
    createdAt: any;
  };
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login?: {
    __typename?: "User";
    id: number;
    email?: string | null;
    name?: string | null;
    username?: string | null;
    role: Role;
  } | null;
};

export type AdminGetEngagementQueryVariables = Exact<{
  engagementId: Scalars["Int"]["input"];
}>;

export type AdminGetEngagementQuery = {
  __typename?: "Query";
  engagement?: {
    __typename?: "Engagement";
    id: number;
    createdAt: any;
    updatedAt: any;
    title: string;
    description?: string | null;
    startTime?: any | null;
    endTime?: any | null;
    viewConfig?: any | null;
    viewData?: any | null;
    status: EngagementStatus;
    order: number;
  } | null;
};

export type AdminGetEngagementsQueryVariables = Exact<{
  eventId: Scalars["Int"]["input"];
}>;

export type AdminGetEngagementsQuery = {
  __typename?: "Query";
  engagements: Array<{
    __typename?: "Engagement";
    id: number;
    createdAt: any;
    updatedAt: any;
    title: string;
    description?: string | null;
    startTime?: any | null;
    endTime?: any | null;
    viewConfig?: any | null;
    viewData?: any | null;
    status: EngagementStatus;
    order: number;
  }>;
};

export type AdminGetEventQueryVariables = Exact<{
  slug: Scalars["String"]["input"];
}>;

export type AdminGetEventQuery = {
  __typename?: "Query";
  event?: {
    __typename?: "Event";
    id: number;
    name: string;
    date?: any | null;
    location?: string | null;
    description?: string | null;
    slug: string;
    live: boolean;
    createdAt: any;
    updatedAt: any;
    activeEngagementId?: number | null;
    activeEngagement?: { __typename?: "Engagement"; id: number } | null;
    engagements: Array<{
      __typename?: "Engagement";
      id: number;
      title: string;
      description?: string | null;
      startTime?: any | null;
      endTime?: any | null;
      viewData?: any | null;
      viewConfig?: any | null;
      status: EngagementStatus;
      order: number;
      createdAt: any;
      updatedAt: any;
    }>;
  } | null;
};

export type AdminGetEventsQueryVariables = Exact<{ [key: string]: never }>;

export type AdminGetEventsQuery = {
  __typename?: "Query";
  events: Array<{
    __typename?: "Event";
    id: number;
    name: string;
    date?: any | null;
    location?: string | null;
    description?: string | null;
    slug: string;
    live: boolean;
    createdAt: any;
    updatedAt: any;
    activeEngagementId?: number | null;
    activeEngagement?: { __typename?: "Engagement"; id: number } | null;
    engagements: Array<{
      __typename?: "Engagement";
      id: number;
      title: string;
      description?: string | null;
      startTime?: any | null;
      endTime?: any | null;
      viewData?: any | null;
      viewConfig?: any | null;
      status: EngagementStatus;
      order: number;
      createdAt: any;
      updatedAt: any;
    }>;
  }>;
};

export type GetEventQueryVariables = Exact<{
  slug: Scalars["String"]["input"];
}>;

export type GetEventQuery = {
  __typename?: "Query";
  event?: {
    __typename?: "Event";
    id: number;
    name: string;
    live: boolean;
    description?: string | null;
    date?: any | null;
    location?: string | null;
  } | null;
};

export const AdminEngagementFragmentDoc = gql`
  fragment AdminEngagement on Engagement {
    id
    createdAt
    updatedAt
    title
    description
    startTime
    endTime
    viewConfig
    viewData
    status
    order
  }
`;
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
      viewData
      viewConfig
      status
      order
      createdAt
      updatedAt
    }
  }
`;
export const UserEventFragmentDoc = gql`
  fragment UserEvent on Event {
    id
    name
    live
    description
    date
    location
  }
`;
export const AdminCreateEngagementDocument = gql`
  mutation adminCreateEngagement(
    $eventId: Int!
    $input: CreateEngagementInput!
  ) {
    createEngagement(eventId: $eventId, data: $input) {
      ...AdminEngagement
    }
  }
  ${AdminEngagementFragmentDoc}
`;
export type AdminCreateEngagementMutationFn = Apollo.MutationFunction<
  AdminCreateEngagementMutation,
  AdminCreateEngagementMutationVariables
>;

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
export function useAdminCreateEngagementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AdminCreateEngagementMutation,
    AdminCreateEngagementMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AdminCreateEngagementMutation,
    AdminCreateEngagementMutationVariables
  >(AdminCreateEngagementDocument, options);
}
export type AdminCreateEngagementMutationHookResult = ReturnType<
  typeof useAdminCreateEngagementMutation
>;
export type AdminCreateEngagementMutationResult =
  Apollo.MutationResult<AdminCreateEngagementMutation>;
export type AdminCreateEngagementMutationOptions = Apollo.BaseMutationOptions<
  AdminCreateEngagementMutation,
  AdminCreateEngagementMutationVariables
>;
export const AdminCreateEventDocument = gql`
  mutation adminCreateEvent($input: CreateEventInput!) {
    createEvent(data: $input) {
      ...AdminEvent
    }
  }
  ${AdminEventFragmentDoc}
`;
export type AdminCreateEventMutationFn = Apollo.MutationFunction<
  AdminCreateEventMutation,
  AdminCreateEventMutationVariables
>;

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
export function useAdminCreateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AdminCreateEventMutation,
    AdminCreateEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AdminCreateEventMutation,
    AdminCreateEventMutationVariables
  >(AdminCreateEventDocument, options);
}
export type AdminCreateEventMutationHookResult = ReturnType<
  typeof useAdminCreateEventMutation
>;
export type AdminCreateEventMutationResult =
  Apollo.MutationResult<AdminCreateEventMutation>;
export type AdminCreateEventMutationOptions = Apollo.BaseMutationOptions<
  AdminCreateEventMutation,
  AdminCreateEventMutationVariables
>;
export const AdminDeleteEngagementDocument = gql`
  mutation adminDeleteEngagement($id: Int!) {
    deleteEngagement(engagementId: $id) {
      ...AdminEngagement
    }
  }
  ${AdminEngagementFragmentDoc}
`;
export type AdminDeleteEngagementMutationFn = Apollo.MutationFunction<
  AdminDeleteEngagementMutation,
  AdminDeleteEngagementMutationVariables
>;

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
export function useAdminDeleteEngagementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AdminDeleteEngagementMutation,
    AdminDeleteEngagementMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AdminDeleteEngagementMutation,
    AdminDeleteEngagementMutationVariables
  >(AdminDeleteEngagementDocument, options);
}
export type AdminDeleteEngagementMutationHookResult = ReturnType<
  typeof useAdminDeleteEngagementMutation
>;
export type AdminDeleteEngagementMutationResult =
  Apollo.MutationResult<AdminDeleteEngagementMutation>;
export type AdminDeleteEngagementMutationOptions = Apollo.BaseMutationOptions<
  AdminDeleteEngagementMutation,
  AdminDeleteEngagementMutationVariables
>;
export const AdminUpdateEventDocument = gql`
  mutation adminUpdateEvent($id: Int!, $data: UpdateEventInput!) {
    updateEvent(eventId: $id, data: $data) {
      ...AdminEvent
    }
  }
  ${AdminEventFragmentDoc}
`;
export type AdminUpdateEventMutationFn = Apollo.MutationFunction<
  AdminUpdateEventMutation,
  AdminUpdateEventMutationVariables
>;

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
export function useAdminUpdateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AdminUpdateEventMutation,
    AdminUpdateEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AdminUpdateEventMutation,
    AdminUpdateEventMutationVariables
  >(AdminUpdateEventDocument, options);
}
export type AdminUpdateEventMutationHookResult = ReturnType<
  typeof useAdminUpdateEventMutation
>;
export type AdminUpdateEventMutationResult =
  Apollo.MutationResult<AdminUpdateEventMutation>;
export type AdminUpdateEventMutationOptions = Apollo.BaseMutationOptions<
  AdminUpdateEventMutation,
  AdminUpdateEventMutationVariables
>;
export const AdminUpdateEventActiveEngagementDocument = gql`
  mutation adminUpdateEventActiveEngagement(
    $eventId: Int!
    $engagementId: Int
  ) {
    updateEventActiveEngagement(
      engagementId: $engagementId
      eventId: $eventId
    ) {
      id
      activeEngagementId
      createdAt
    }
  }
`;
export type AdminUpdateEventActiveEngagementMutationFn =
  Apollo.MutationFunction<
    AdminUpdateEventActiveEngagementMutation,
    AdminUpdateEventActiveEngagementMutationVariables
  >;

/**
 * __useAdminUpdateEventActiveEngagementMutation__
 *
 * To run a mutation, you first call `useAdminUpdateEventActiveEngagementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateEventActiveEngagementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateEventActiveEngagementMutation, { data, loading, error }] = useAdminUpdateEventActiveEngagementMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      engagementId: // value for 'engagementId'
 *   },
 * });
 */
export function useAdminUpdateEventActiveEngagementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AdminUpdateEventActiveEngagementMutation,
    AdminUpdateEventActiveEngagementMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AdminUpdateEventActiveEngagementMutation,
    AdminUpdateEventActiveEngagementMutationVariables
  >(AdminUpdateEventActiveEngagementDocument, options);
}
export type AdminUpdateEventActiveEngagementMutationHookResult = ReturnType<
  typeof useAdminUpdateEventActiveEngagementMutation
>;
export type AdminUpdateEventActiveEngagementMutationResult =
  Apollo.MutationResult<AdminUpdateEventActiveEngagementMutation>;
export type AdminUpdateEventActiveEngagementMutationOptions =
  Apollo.BaseMutationOptions<
    AdminUpdateEventActiveEngagementMutation,
    AdminUpdateEventActiveEngagementMutationVariables
  >;
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
      username
      role
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

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
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const AdminGetEngagementDocument = gql`
  query adminGetEngagement($engagementId: Int!) {
    engagement(id: $engagementId) {
      ...AdminEngagement
    }
  }
  ${AdminEngagementFragmentDoc}
`;

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
export function useAdminGetEngagementQuery(
  baseOptions: Apollo.QueryHookOptions<
    AdminGetEngagementQuery,
    AdminGetEngagementQueryVariables
  > &
    (
      | { variables: AdminGetEngagementQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AdminGetEngagementQuery,
    AdminGetEngagementQueryVariables
  >(AdminGetEngagementDocument, options);
}
export function useAdminGetEngagementLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdminGetEngagementQuery,
    AdminGetEngagementQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AdminGetEngagementQuery,
    AdminGetEngagementQueryVariables
  >(AdminGetEngagementDocument, options);
}
export function useAdminGetEngagementSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        AdminGetEngagementQuery,
        AdminGetEngagementQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    AdminGetEngagementQuery,
    AdminGetEngagementQueryVariables
  >(AdminGetEngagementDocument, options);
}
export type AdminGetEngagementQueryHookResult = ReturnType<
  typeof useAdminGetEngagementQuery
>;
export type AdminGetEngagementLazyQueryHookResult = ReturnType<
  typeof useAdminGetEngagementLazyQuery
>;
export type AdminGetEngagementSuspenseQueryHookResult = ReturnType<
  typeof useAdminGetEngagementSuspenseQuery
>;
export type AdminGetEngagementQueryResult = Apollo.QueryResult<
  AdminGetEngagementQuery,
  AdminGetEngagementQueryVariables
>;
export const AdminGetEngagementsDocument = gql`
  query adminGetEngagements($eventId: Int!) {
    engagements(eventId: $eventId) {
      ...AdminEngagement
    }
  }
  ${AdminEngagementFragmentDoc}
`;

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
export function useAdminGetEngagementsQuery(
  baseOptions: Apollo.QueryHookOptions<
    AdminGetEngagementsQuery,
    AdminGetEngagementsQueryVariables
  > &
    (
      | { variables: AdminGetEngagementsQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AdminGetEngagementsQuery,
    AdminGetEngagementsQueryVariables
  >(AdminGetEngagementsDocument, options);
}
export function useAdminGetEngagementsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdminGetEngagementsQuery,
    AdminGetEngagementsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AdminGetEngagementsQuery,
    AdminGetEngagementsQueryVariables
  >(AdminGetEngagementsDocument, options);
}
export function useAdminGetEngagementsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        AdminGetEngagementsQuery,
        AdminGetEngagementsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    AdminGetEngagementsQuery,
    AdminGetEngagementsQueryVariables
  >(AdminGetEngagementsDocument, options);
}
export type AdminGetEngagementsQueryHookResult = ReturnType<
  typeof useAdminGetEngagementsQuery
>;
export type AdminGetEngagementsLazyQueryHookResult = ReturnType<
  typeof useAdminGetEngagementsLazyQuery
>;
export type AdminGetEngagementsSuspenseQueryHookResult = ReturnType<
  typeof useAdminGetEngagementsSuspenseQuery
>;
export type AdminGetEngagementsQueryResult = Apollo.QueryResult<
  AdminGetEngagementsQuery,
  AdminGetEngagementsQueryVariables
>;
export const AdminGetEventDocument = gql`
  query adminGetEvent($slug: String!) {
    event(slug: $slug) {
      ...AdminEvent
    }
  }
  ${AdminEventFragmentDoc}
`;

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
export function useAdminGetEventQuery(
  baseOptions: Apollo.QueryHookOptions<
    AdminGetEventQuery,
    AdminGetEventQueryVariables
  > &
    (
      | { variables: AdminGetEventQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AdminGetEventQuery, AdminGetEventQueryVariables>(
    AdminGetEventDocument,
    options
  );
}
export function useAdminGetEventLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdminGetEventQuery,
    AdminGetEventQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AdminGetEventQuery, AdminGetEventQueryVariables>(
    AdminGetEventDocument,
    options
  );
}
export function useAdminGetEventSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        AdminGetEventQuery,
        AdminGetEventQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    AdminGetEventQuery,
    AdminGetEventQueryVariables
  >(AdminGetEventDocument, options);
}
export type AdminGetEventQueryHookResult = ReturnType<
  typeof useAdminGetEventQuery
>;
export type AdminGetEventLazyQueryHookResult = ReturnType<
  typeof useAdminGetEventLazyQuery
>;
export type AdminGetEventSuspenseQueryHookResult = ReturnType<
  typeof useAdminGetEventSuspenseQuery
>;
export type AdminGetEventQueryResult = Apollo.QueryResult<
  AdminGetEventQuery,
  AdminGetEventQueryVariables
>;
export const AdminGetEventsDocument = gql`
  query adminGetEvents {
    events {
      ...AdminEvent
    }
  }
  ${AdminEventFragmentDoc}
`;

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
export function useAdminGetEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AdminGetEventsQuery,
    AdminGetEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AdminGetEventsQuery, AdminGetEventsQueryVariables>(
    AdminGetEventsDocument,
    options
  );
}
export function useAdminGetEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdminGetEventsQuery,
    AdminGetEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AdminGetEventsQuery, AdminGetEventsQueryVariables>(
    AdminGetEventsDocument,
    options
  );
}
export function useAdminGetEventsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        AdminGetEventsQuery,
        AdminGetEventsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    AdminGetEventsQuery,
    AdminGetEventsQueryVariables
  >(AdminGetEventsDocument, options);
}
export type AdminGetEventsQueryHookResult = ReturnType<
  typeof useAdminGetEventsQuery
>;
export type AdminGetEventsLazyQueryHookResult = ReturnType<
  typeof useAdminGetEventsLazyQuery
>;
export type AdminGetEventsSuspenseQueryHookResult = ReturnType<
  typeof useAdminGetEventsSuspenseQuery
>;
export type AdminGetEventsQueryResult = Apollo.QueryResult<
  AdminGetEventsQuery,
  AdminGetEventsQueryVariables
>;
export const GetEventDocument = gql`
  query getEvent($slug: String!) {
    event(slug: $slug) {
      ...UserEvent
    }
  }
  ${UserEventFragmentDoc}
`;

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetEventQuery(
  baseOptions: Apollo.QueryHookOptions<GetEventQuery, GetEventQueryVariables> &
    ({ variables: GetEventQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetEventQuery, GetEventQueryVariables>(
    GetEventDocument,
    options
  );
}
export function useGetEventLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEventQuery,
    GetEventQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetEventQuery, GetEventQueryVariables>(
    GetEventDocument,
    options
  );
}
export function useGetEventSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetEventQuery, GetEventQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetEventQuery, GetEventQueryVariables>(
    GetEventDocument,
    options
  );
}
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<
  typeof useGetEventLazyQuery
>;
export type GetEventSuspenseQueryHookResult = ReturnType<
  typeof useGetEventSuspenseQuery
>;
export type GetEventQueryResult = Apollo.QueryResult<
  GetEventQuery,
  GetEventQueryVariables
>;
