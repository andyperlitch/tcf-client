import { useFanEvent } from "@/hooks/useFanEvent";
import { FanActiveEngagement } from "../FanActiveEngagement";
import { useFunksgivingBackground } from "./useFunksgivingBackground";
import { NoEngagementFan } from "./NoEngagementFan";

export function FunksgivingFanScreen() {
  useFunksgivingBackground();
  const { data } = useFanEvent("funksgiving");

  return (
    <div>
      {data?.event?.activeEngagement ? (
        <FanActiveEngagement engagement={data.event.activeEngagement} />
      ) : (
        <NoEngagementFan />
      )}
    </div>
  );
}
