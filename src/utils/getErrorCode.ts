import { ApolloError } from "@apollo/client";

export function getErrorCode(error: ApolloError | undefined) {
  if (!error) return "UNKNOWN";

  const extensions = error.cause?.extensions as {
    appError?: { code?: string };
  };
  return extensions?.appError?.code || "UNKNOWN";
}
