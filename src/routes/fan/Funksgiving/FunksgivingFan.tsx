import { FanActiveEngagement } from "../../../engagements/FanActiveEngagement";
import { useFunksgivingBackground } from "./useFunksgivingBackground";
import { NoEngagementFan } from "./NoEngagementFan";
import { FanEventFragment } from "@/gql/graphql";

export function FunksgivingFanScreen({ event }: { event: FanEventFragment }) {
  useFunksgivingBackground();

  return (
    <div>
      {event?.activeEngagement ? (
        <FanActiveEngagement engagement={event.activeEngagement} />
      ) : (
        <NoEngagementFan />
      )}
    </div>
  );
}
