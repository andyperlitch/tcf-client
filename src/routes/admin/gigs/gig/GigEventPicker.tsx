import { InfoIcon } from "@/components/InfoIcon";
import { Autocomplete } from "@/components/ui/autocomplete";
import { Label } from "@/components/ui/label";
import {
  GigFragment,
  useAdminGetEventsQuery,
  useBandUpdateGigMutation,
} from "@/gql/graphql";
import { createLogger } from "@/utils/createLogger";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useCallback, useMemo } from "react";

const logger = createLogger("GigEventPicker");

interface Option {
  value: string;
  id: number;
  label: string;
  keywords?: string[];
}

export function GigEventPicker({ gig }: { gig: GigFragment }) {
  const { data: eventsData } = useAdminGetEventsQuery();

  const [updateGig] = useBandUpdateGigMutation();

  const events: Option[] = useMemo(() => {
    return (
      eventsData?.events.map((event) => ({
        value: event.id.toString(),
        id: event.id,
        label: event.name || event.slug || `event-${event.id}`,
        keywords: [event.name, event.slug].filter(Boolean) as string[],
      })) || []
    );
  }, [eventsData]);

  const onEventSelect = useCallback(
    (selected: Option) => {
      logger.info("event selected", selected);
      updateGig({
        variables: {
          gigId: gig.id,
          data: {
            eventId: selected.id,
          },
        },
        update: (cache) => {
          cache.modify({
            id: cache.identify({ __typename: "Gig", id: gig.id }),
            fields: {
              eventId: () => selected.id,
            },
          });
        },
      }).then(() => {
        logger.info("gig event updated");
      });
    },
    [gig.id, updateGig]
  );

  const value = events.find((event) => event.id === gig.eventId);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Label>
          Gig Event{" "}
          <InfoIcon icon={InfoCircledIcon} className="inline-block">
            <div className={`max-w-[300px]`}>
              The event associated with this gig.
            </div>
          </InfoIcon>
        </Label>
        <Autocomplete items={events} onSelect={onEventSelect} value={value} />
      </div>
    </div>
  );
}
