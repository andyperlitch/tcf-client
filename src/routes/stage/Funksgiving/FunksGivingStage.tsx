import { useStageEvent } from "@/hooks/useStageEvent";
import { StageActiveEngagement } from "../StageActiveEngagement";
import { useFunksgivingBackground } from "./useFunksgivingBackground";

export function FunksGivingStage() {
  const { data } = useStageEvent("funksgiving");

  useFunksgivingBackground();

  return (
    <div
      className={`
        flex h-screen w-screen flex-col items-center justify-center gap-4
      `}
    >
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

      {/* active engagement */}
      {data?.event?.activeEngagement ? (
        <StageActiveEngagement event={data.event} />
      ) : (
        <>
          <h1>Welcome to FunksGiving!</h1>
        </>
      )}
    </div>
  );
}
