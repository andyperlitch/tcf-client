import { InfoIcon } from "@/components/InfoIcon";
import { Autocomplete } from "@/components/ui/autocomplete";
import { Label } from "@/components/ui/label";
import {
  EngagementType,
  GigFragment,
  useAdminGetEventByIdQuery,
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

export function GigNowPlayingPicker({
  gig,
}: {
  gig: GigFragment & { eventId: number }; // eventId is guaranteed to be present
}) {
  const { data: eventData } = useAdminGetEventByIdQuery({
    variables: {
      id: gig.eventId,
    },
  });

  const [updateGig] = useBandUpdateGigMutation();

  // get list of engagements which are NowPlaying type
  const engagements = useMemo(() => {
    debugger;
    return (
      eventData?.eventById?.engagements.filter(
        (engagement) => engagement.type === EngagementType.NowPlaying
      ) || []
    ).map((engagement) => ({
      value: engagement.id.toString(),
      id: engagement.id,
      label: engagement.title,
      keywords: [engagement.title, engagement.type],
    }));
  }, [eventData]);

  const onEngagementSelect = useCallback(
    (selected: Option) => {
      logger.info("engagement selected", selected);
      updateGig({
        variables: {
          gigId: gig.id,
          data: {
            nowPlayingEngagementId: selected.id,
          },
        },
        update: (cache) => {
          cache.modify({
            id: cache.identify({ __typename: "Gig", id: gig.id }),
            fields: {
              nowPlayingEngagementId: () => selected.id,
            },
          });
        },
      }).then(() => {
        logger.info("gig now playing engagement updated");
      });
    },
    [gig.id, updateGig]
  );

  const value = engagements.find(
    (engagement) => engagement.id === gig.nowPlayingEngagementId
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Label>
          Now Playing Engagement{" "}
          <InfoIcon icon={InfoCircledIcon} className="inline-block">
            <div className={`max-w-[300px]`}>
              The "Now Playing" engagement from this gig's event to "hook into."
            </div>
          </InfoIcon>
        </Label>
        <Autocomplete
          items={engagements}
          onSelect={onEngagementSelect}
          value={value}
        />
      </div>
    </div>
  );
}
