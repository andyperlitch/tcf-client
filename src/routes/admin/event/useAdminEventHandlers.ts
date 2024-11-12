import { useAdminUpdateEventMutation } from "@/gql/graphql";

import { useMemo } from "react";
import { AdminGetEventQuery } from "@/gql/graphql";

export function useAdminEventHandlers({
  data,
}: {
  data: AdminGetEventQuery | null | undefined;
}) {
  const [updateEvent, { loading: updateLoading }] =
    useAdminUpdateEventMutation();

  return useMemo(() => {
    const setLive = (live: boolean) => {
      if (data?.event) {
        updateEvent({
          variables: {
            id: data.event.id,
            data: {
              live,
            },
          },
        });
      }
    };

    const updateEventName = (name: string) => {
      if (data?.event) {
        return updateEvent({
          variables: { id: data.event.id, data: { name } },
        });
      }
    };

    const updateEventDescription = (description: string) => {
      if (data?.event) {
        return updateEvent({
          variables: { id: data.event.id, data: { description } },
        });
      }
    };

    const updateEventSlug = (slug: string) => {
      if (data?.event) {
        return updateEvent({
          variables: { id: data.event.id, data: { slug } },
        });
      }
    };

    const updateEventLocation = (location: string) => {
      if (data?.event) {
        return updateEvent({
          variables: { id: data.event.id, data: { location } },
        });
      }
    };

    const updateLocked = (locked: boolean) => {
      if (data?.event) {
        return updateEvent({
          variables: { id: data.event.id, data: { locked } },
        });
      }
    };

    const updateEventDate = (date: string) => {
      if (data?.event) {
        return updateEvent({
          variables: { id: data.event.id, data: { date } },
        });
      }
    };

    return {
      setLive,
      updateEventName,
      updateEventDescription,
      updateEventSlug,
      updateEventLocation,
      updateLocked,
      updateEventDate,
      updateLoading,
    };
  }, [updateEvent, data, updateLoading]);
}
