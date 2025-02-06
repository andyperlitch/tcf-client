import { useAdminDeleteEventMutation } from "@/gql/graphql";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { InlineTypeoutConfirmButton } from "./InlineTypeoutConfirmButton";

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
    <InlineTypeoutConfirmButton
      onConfirm={() => deleteEvent({ variables: { id } })}
      loading={loading}
      error={error}
      {...buttonProps}
    >
      <TrashIcon />
    </InlineTypeoutConfirmButton>
  );
}
