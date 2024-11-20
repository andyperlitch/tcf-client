import { useAdminDeleteEventMutation } from "@/gql/graphql";
import { InlineConfirmButton } from "./InlineConfirmButton";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export function DeleteEventButton({
  id,
  ...buttonProps
}: { id: number } & Omit<React.ComponentProps<typeof Button>, "id">) {
  const [deleteEvent, { loading, error }] = useAdminDeleteEventMutation({
    update: (cache) => {
      cache.evict({ id: `Event:${id}` });
    },
  });

  return (
    <InlineConfirmButton
      onConfirm={() => deleteEvent({ variables: { id } })}
      loading={loading}
      error={error}
      {...buttonProps}
    >
      <TrashIcon />
    </InlineConfirmButton>
  );
}
