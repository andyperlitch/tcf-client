import { useAdminUpdateEventActiveEngagementMutation } from "@/gql/graphql";
import { Switch } from "./ui/switch";
import { useCallback } from "react";

export function ToggleActiveEngagementButton({
  id,
  activeId,
  eventId,
}: {
  id: number;
  activeId?: number | null;
  eventId: number;
}) {
  const [updateEvent, { loading /* , error, data */ }] =
    useAdminUpdateEventActiveEngagementMutation();

  const setActive = useCallback(() => {
    updateEvent({
      variables: {
        eventId,
        engagementId: id,
      },
    });
  }, [eventId, id, updateEvent]);

  return (
    <Switch
      id="engagement-active"
      checked={id === activeId}
      onCheckedChange={setActive}
      disabled={loading}
    />
  );
}
