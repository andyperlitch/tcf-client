import { useAdminChangeEventActiveEngagementMutation } from "@/gql/graphql";
import { Switch } from "./ui/switch";
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export function ToggleActiveEngagementButton({
  id,
  activeId,
  eventId,
}: {
  id: number;
  activeId?: number | null;
  eventId: number;
}) {
  const { toast } = useToast();
  const [changeEvent, { loading }] =
    useAdminChangeEventActiveEngagementMutation({
      onError(error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });

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
