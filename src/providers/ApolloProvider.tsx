import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as SuperApolloProvider,
  split,
  HttpLink,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

let httpUri: string;
let wsUri: string;
const hostname = window.location.hostname;

if (hostname === "thecasualfunk.com") {
  httpUri = "https://api.thecasualfunk.com/graphql";
  wsUri = "wss://api.thecasualfunk.com/graphql";
} else {
  httpUri = `http://${hostname}:3000/graphql`;
  wsUri = `ws://${hostname}:3000/graphql`;
}

// HTTP Link for queries and mutations
const httpLink = new HttpLink({
  uri: httpUri,
  credentials: "include", // Include credentials like cookies (JWT)
});

// WebSocket Link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUri,
    retryAttempts: 5, // Maximum number of retry attempts
    shouldRetry: () => true, // Always attempt to retry the connection
  })
);

// Split the links based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink, // Use wsLink for subscriptions
  httpLink // Use httpLink for queries and mutations
);

// Create the Apollo Client instance
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <SuperApolloProvider client={client}>{children}</SuperApolloProvider>;
}
