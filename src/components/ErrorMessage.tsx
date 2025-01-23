import { ApolloError } from "@apollo/client";
import { Button } from "./ui/button";

export function ErrorMessage({
  error,
  retry,
}: {
  error: Error | ApolloError;
  retry?: () => void;
}) {
  return (
    <div>
      <div>{error.message}</div>
      {retry && (
        <div>
          <Button onClick={retry}>Retry</Button>
        </div>
      )}
    </div>
  );
}
