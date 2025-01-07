import { getErrorCode } from "@/utils/getErrorCode";
import { ApolloError } from "@apollo/client";
import { CodeBlock } from "./CodeBlock";

export function ErrorScreen({
  error,
  title = "Uh oh...",
  description = "An error occurred.",
}: {
  error?: ApolloError;
  title?: string;
  description?: string;
}) {
  return (
    <div
      className={`flex h-screen w-screen flex-col items-center justify-center`}
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-lg">{description}</p>
      <CodeBlock className="w-1/2">
        {error?.message || "Unknown error"} ({getErrorCode(error)})
      </CodeBlock>
    </div>
  );
}
