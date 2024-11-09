import { useStageEvent } from "@/hooks/useStageEvent";
import { StageActiveEngagement } from "../StageActiveEngagement";
import { useFunksgivingBackground } from "./useFunksgivingBackground";
import { StageChrome } from "../StageChrome";

export function FunksGivingStage() {
  const { data } = useStageEvent("funksgiving");
  const hasActiveEngagement = Boolean(data?.event?.activeEngagement);
  useFunksgivingBackground();

  return (
    <StageChrome name="funksgiving-screen" event={data?.event}>
      {/* funksgiving logo */}
      <img
        data-name="FUNKSGIVING-LOGO"
        className={`
          absolute transition-all duration-1000

          ${
            hasActiveEngagement
              ? `right-[1vw] top-[2vh] h-[8vh] translate-x-0`
              : "right-1/2 top-[18vh] h-[15vh] translate-x-1/2"
          }
        `}
        src="/funksgiving-fan-title.png"
      />
      {/* top right logo and text */}
      <div
        data-name="LOGO-AND-TEXT"
        className={`
          absolute flex flex-col items-center transition-all duration-1000

          ${
            hasActiveEngagement
              ? "right-[3vw] top-[11vh] translate-x-0"
              : `right-[50vw] top-[35vh] translate-x-1/2`
          }
        `}
      >
        <p
          className={`
            relative font-hand transition-all duration-1000

            ${
              hasActiveEngagement
                ? `translate-x-[5vw] text-3xl text-[#593312]`
                : `translate-x-0 text-6xl text-yellow-100`
            }
          `}
        >
          ...an evening with
        </p>
        <img
          src="/logo_with_text.svg"
          className={`
            transition-all duration-1000

            ${hasActiveEngagement ? "w-[18vw]" : "w-[30vw]"}
          `}
        />
      </div>
      {data?.event?.activeEngagement && (
        <StageActiveEngagement event={data.event} />
      )}
    </StageChrome>
  );
}
