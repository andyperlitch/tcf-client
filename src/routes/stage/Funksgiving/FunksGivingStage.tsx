import { useStageEvent } from "@/hooks/useStageEvent";
import { StageActiveEngagement } from "../StageActiveEngagement";
import { useFunksgivingBackground } from "./useFunksgivingBackground";
import { StageChrome } from "@/components/StageChrome";
import { NoEngagementStage } from "./NoEngagementStage";

export function FunksGivingStage() {
  const { data } = useStageEvent("funksgiving");

  useFunksgivingBackground();

  return data?.event?.activeEngagement ? (
    <StageChrome name="funksgiving-screen">
      {/* funksgiving logo */}
      <img
        className="absolute left-1/2 top-[2vw] -translate-x-1/2"
        src="/funksgiving-fan-title.png"
        style={{ width: "50vw" }}
      />
      {/* top right logo and text */}
      <div className="absolute right-[3vw] top-[0.5vw]">
        <p className="relative font-hand text-4xl text-[#593312]">
          ...an evening with
        </p>
        <img src="/funksgiving-logo.svg" style={{ width: "17vw" }} />
      </div>
      <StageActiveEngagement event={data.event} />
    </StageChrome>
  ) : (
    <NoEngagementStage />
  );
}
