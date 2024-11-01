import { useFanEvent } from "@/hooks/useFanEvent";
import { FanActiveEngagement } from "../FanActiveEngagement";
import { useFunksgivingBackground } from "./useFunksgivingBackground";

export function FunksgivingFanScreen() {
  useFunksgivingBackground();
  const { data } = useFanEvent("funksgiving");

  return (
    <div>
      {data?.event?.activeEngagement ? (
        <FanActiveEngagement engagement={data.event.activeEngagement} />
      ) : (
        <p>Stay tuned for ways you can engage with the band!</p>
      )}
    </div>
  );
}
