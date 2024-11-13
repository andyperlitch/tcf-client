import { Switch } from "./ui/switch";
import { useSetActiveEngagement } from "@/hooks/useSetActiveEngagement";

export function ToggleActiveEngagementButton({
  id,
  activeId,
  eventId,
}: {
  id: number;
  activeId?: number | null;
  eventId: number;
}) {
  const { setActive, loading } = useSetActiveEngagement({
    activeId,
    eventId,
  });

  return (
    <Switch
      id="engagement-active"
      checked={id === activeId}
      onCheckedChange={() => setActive(id)}
      disabled={loading}
    />
  );
}
