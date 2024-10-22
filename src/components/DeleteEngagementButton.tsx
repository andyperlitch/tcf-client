import { useAdminDeleteEngagementMutation } from "@/gql/graphql";
import { InlineConfirmButton } from "./InlineConfirmButton";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export function DeleteEngagementButton({
  id,
  ...buttonProps
}: { id: number } & Omit<React.ComponentProps<typeof Button>, "id">) {
  const [deleteEngagement, { loading, error }] =
    useAdminDeleteEngagementMutation({
      update: (cache) => {
        cache.evict({ id: `Engagement:${id}` });
      },
    });

  return (
    <InlineConfirmButton
      onConfirm={() => deleteEngagement({ variables: { id } })}
      loading={loading}
      error={error}
      {...buttonProps}
    >
      <TrashIcon />
    </InlineConfirmButton>
  );
}
