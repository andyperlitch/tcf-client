import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as SuperApolloProvider,
} from "@apollo/client";

let uri: string;
if (import.meta.env.VITE_GRAPHQL_API_URL) {
  uri = import.meta.env.VITE_GRAPHQL_API_URL;
} else {
  const hostname = window.location.hostname;
  if (hostname === "thecasualfunk.com") {
    uri = "https://api.thecasualfunk.com/graphql";
  } else {
    uri = `http://${hostname}:3000/graphql`;
  }
}

const client = new ApolloClient({
  uri, // Use the correct API URL for the environment
  cache: new InMemoryCache(),
  credentials: "include", // Include credentials like cookies (JWT)
});

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <SuperApolloProvider client={client}>{children}</SuperApolloProvider>;
}
