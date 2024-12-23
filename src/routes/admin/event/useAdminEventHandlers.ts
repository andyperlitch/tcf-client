import { AdminEventFragment, useAdminUpdateEventMutation } from "@/gql/graphql";
import { useMemo } from "react";

export function useAdminEventHandlers({
  event,
}: {
  event: AdminEventFragment | null | undefined;
}) {
  const [updateEvent, { loading: updateLoading }] =
    useAdminUpdateEventMutation();

  return useMemo(() => {
    const createUpdateHandler =
      <T extends string | boolean>(field: string) =>
      (value: T) => {
        if (event) {
          return updateEvent({
            variables: {
              id: event.id,
              data: {
                [field]: value,
              },
            },
          });
        }
      };

    return {
      setLive: createUpdateHandler<boolean>("live"),
      updateEventName: createUpdateHandler<string>("name"),
      updateEventDescription: createUpdateHandler<string>("description"),
      updateEventSlug: createUpdateHandler<string>("slug"),
      updateEventLocation: createUpdateHandler<string>("location"),
      updateLocked: createUpdateHandler<boolean>("locked"),
      updateEventDate: createUpdateHandler<string>("date"),
      updateLoading,
    };
  }, [updateEvent, event, updateLoading]);
}
