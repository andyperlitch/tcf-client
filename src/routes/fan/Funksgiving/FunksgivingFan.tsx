import { useFanEvent } from "@/hooks/useFanEvent";
import { FanActiveEngagement } from "../FanActiveEngagement";
import { useFunksgivingBackground } from "./useFunksgivingBackground";

export function FunksgivingFanScreen() {
  useFunksgivingBackground();
  const { data } = useFanEvent("funksgiving");

  return (
    <div>
      <h1
        className={`
          absolute left-0 top-0 mt-4 h-12 w-full
          bg-[url('/funksgiving-fan-title.png')] bg-contain bg-center
          bg-no-repeat -indent-[1000px] text-4xl font-bold
        `}
      >
        Funksgiving
      </h1>

      {data?.event?.activeEngagement ? (
        <FanActiveEngagement engagement={data.event.activeEngagement} />
      ) : (
        <p>Stay tuned for ways you can engage with the band!</p>
      )}
    </div>
  );
}
