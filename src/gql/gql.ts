/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation CreateEngagement($eventId: Int!, $input: CreateEngagementInput!) {\n    createEngagement(eventId: $eventId, data: $input) {\n      id\n    }\n  }\n": types.CreateEngagementDocument,
    "\n  mutation CreateEvent($input: CreateEventInput!) {\n    createEvent(data: $input) {\n      id\n      name\n      location\n      date\n      description\n      slug\n      createdAt\n    }\n  }\n": types.CreateEventDocument,
    "\n  query Events {\n    events {\n      id\n      name\n      date\n      location\n      description\n      slug\n      activeEngagement {\n        id\n      }\n      activeEngagementId\n      engagements {\n        id\n        title\n        description\n        startTime\n        endTime\n        viewData\n        viewConfig\n        status\n        order\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.EventsDocument,
    "\n  query GetAdminEvent($slug: String!) {\n    event(slug: $slug) {\n      id\n      name\n      location\n      date\n      description\n      live\n      slug\n      createdAt\n      updatedAt\n      engagements {\n        id\n        description\n        viewData\n        viewConfig\n        startTime\n        endTime\n      }\n    }\n  }\n": types.GetAdminEventDocument,
    "\n  mutation UpdateEvent($id: Int!, $data: UpdateEventInput!) {\n    updateEvent(eventId: $id, data: $data) {\n      id\n      name\n      location\n      date\n      description\n      live\n      slug\n      createdAt\n      updatedAt\n      engagements {\n        id\n        description\n        viewData\n        viewConfig\n        createdAt\n        updatedAt\n        startTime\n        endTime\n      }\n    }\n  }\n": types.UpdateEventDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      email\n      name\n      username\n      role\n    }\n  }\n": types.LoginDocument,
    "\n  query useEvent($slug: String!) {\n    event(slug: $slug) {\n      id\n      name\n      live\n      description\n      date\n      location\n    }\n  }\n": types.UseEventDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateEngagement($eventId: Int!, $input: CreateEngagementInput!) {\n    createEngagement(eventId: $eventId, data: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateEngagement($eventId: Int!, $input: CreateEngagementInput!) {\n    createEngagement(eventId: $eventId, data: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateEvent($input: CreateEventInput!) {\n    createEvent(data: $input) {\n      id\n      name\n      location\n      date\n      description\n      slug\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateEvent($input: CreateEventInput!) {\n    createEvent(data: $input) {\n      id\n      name\n      location\n      date\n      description\n      slug\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Events {\n    events {\n      id\n      name\n      date\n      location\n      description\n      slug\n      activeEngagement {\n        id\n      }\n      activeEngagementId\n      engagements {\n        id\n        title\n        description\n        startTime\n        endTime\n        viewData\n        viewConfig\n        status\n        order\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Events {\n    events {\n      id\n      name\n      date\n      location\n      description\n      slug\n      activeEngagement {\n        id\n      }\n      activeEngagementId\n      engagements {\n        id\n        title\n        description\n        startTime\n        endTime\n        viewData\n        viewConfig\n        status\n        order\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAdminEvent($slug: String!) {\n    event(slug: $slug) {\n      id\n      name\n      location\n      date\n      description\n      live\n      slug\n      createdAt\n      updatedAt\n      engagements {\n        id\n        description\n        viewData\n        viewConfig\n        startTime\n        endTime\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAdminEvent($slug: String!) {\n    event(slug: $slug) {\n      id\n      name\n      location\n      date\n      description\n      live\n      slug\n      createdAt\n      updatedAt\n      engagements {\n        id\n        description\n        viewData\n        viewConfig\n        startTime\n        endTime\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateEvent($id: Int!, $data: UpdateEventInput!) {\n    updateEvent(eventId: $id, data: $data) {\n      id\n      name\n      location\n      date\n      description\n      live\n      slug\n      createdAt\n      updatedAt\n      engagements {\n        id\n        description\n        viewData\n        viewConfig\n        createdAt\n        updatedAt\n        startTime\n        endTime\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateEvent($id: Int!, $data: UpdateEventInput!) {\n    updateEvent(eventId: $id, data: $data) {\n      id\n      name\n      location\n      date\n      description\n      live\n      slug\n      createdAt\n      updatedAt\n      engagements {\n        id\n        description\n        viewData\n        viewConfig\n        createdAt\n        updatedAt\n        startTime\n        endTime\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      email\n      name\n      username\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      email\n      name\n      username\n      role\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query useEvent($slug: String!) {\n    event(slug: $slug) {\n      id\n      name\n      live\n      description\n      date\n      location\n    }\n  }\n"): (typeof documents)["\n  query useEvent($slug: String!) {\n    event(slug: $slug) {\n      id\n      name\n      live\n      description\n      date\n      location\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;