import { useAdminDeleteSubmissionMutation } from "@/gql/graphql";
import { InlineConfirmButton } from "./InlineConfirmButton";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export function DeleteSubmissionButton({
  id,
  ...buttonProps
}: { id: number } & Omit<React.ComponentProps<typeof Button>, "id">) {
  const [deleteSubmission, { loading, error }] =
    useAdminDeleteSubmissionMutation({
      update: (cache) => {
        cache.evict({ id: `Submission:${id}` });
      },
    });

  return (
    <InlineConfirmButton
      onConfirm={() => deleteSubmission({ variables: { id } })}
      loading={loading}
      error={error}
      size="icon"
      {...buttonProps}
    >
      <TrashIcon />
    </InlineConfirmButton>
  );
}
