import { useAdminChangeEventActiveEngagementMutation } from "@/gql/graphql";
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
  const [changeEvent, { loading /* , error, data */ }] =
    useAdminChangeEventActiveEngagementMutation();

  const setActive = useCallback(() => {
    changeEvent({
      variables: {
        eventId,
        engagementId: id === activeId ? null : id,
      },
    });
  }, [activeId, eventId, id, changeEvent]);

  return (
    <Switch
      id="engagement-active"
      checked={id === activeId}
      onCheckedChange={setActive}
      disabled={loading}
    />
  );
}
