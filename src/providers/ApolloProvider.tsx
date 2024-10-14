import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as SuperApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_API_URL, // Use the correct API URL for the environment
  cache: new InMemoryCache(),
  credentials: "include", // Include credentials like cookies (JWT)
});

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <SuperApolloProvider client={client}>{children}</SuperApolloProvider>;
}
