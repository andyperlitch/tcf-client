import {
  AdminGetEventDocument,
  useAdminChangeEventActiveEngagementMutation,
} from "@/gql/graphql";
import { useToast } from "./use-toast";
import { useCallback } from "react";
import { useApolloClient } from "@apollo/client";

export function useSetActiveEngagement({
  activeId,
  eventId,
}: {
  activeId?: number | null;
  eventId?: number | null;
}) {
  const { toast } = useToast();
  const client = useApolloClient();
  const [changeEvent, { loading }] =
    useAdminChangeEventActiveEngagementMutation({
      onCompleted(data) {
        // Update Apollo cache with the new Event data
        client.writeQuery({
          query: AdminGetEventDocument,
          variables: { id: eventId },
          data: {
            event: data.changeEventActiveEngagement,
          },
        });
      },
      onError(error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const setActive = useCallback(
    (id: number) => {
      if (!eventId || !id) return;

      changeEvent({
        variables: {
          eventId: eventId!,
          engagementId: id === activeId ? null : id,
        },
      });
    },
    [activeId, eventId, changeEvent]
  );

  return { setActive, loading };
}
