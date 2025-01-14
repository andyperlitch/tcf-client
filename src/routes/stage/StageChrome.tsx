import { useParamsSafe } from "@/hooks/useParamsSafe";
import { StageQR } from "./StageQR";
import useWindowSize from "@/hooks/useWindowSize";
import { StageEventFragment } from "@/gql/graphql";
import { StageEngagementTitle } from "../../engagements/StageEngagementTitle";
import { useEventStageState } from "@/providers/StageStateProvider/EventStageStateContext";
import { EngagementMode } from "@/types/screen";

interface StageChromeProps {
  children: React.ReactNode;
  name: string;
  event?: StageEventFragment | null;
}

export function StageChrome({ children, name, event }: StageChromeProps) {
  const { slug } = useParamsSafe("slug");
  const { width } = useWindowSize();
  const { state } = useEventStageState();

  const hasActiveEngagement =
    state.engagementMode === EngagementMode.Guide ||
    Boolean(
      state.engagementMode === EngagementMode.Actual && state.activeEngagement
    );

  return (
    <div
      data-name={name}
      className={`flex h-screen w-screen items-stretch align-middle`}
    >
      <div data-name={`${name}-content`} className="relative z-10 flex-1">
        {children}
      </div>
      <div
        data-name={`${name}_SIDEBAR`}
        className={`
          flex-0 flex h-full w-[21vw] flex-col justify-end p-[2vh]
          transition-opacity duration-1000

          ${hasActiveEngagement ? "opacity-100" : "opacity-0"}
        `}
      >
        <StageEngagementTitle event={event} />
        <StageQR
          event={event}
          eventSlug={slug}
          width={width * 0.17}
          bgColor={
            state.savedConfig?.qrWrapperBackgroundColor || "rgba(255,255,255,1)"
          }
          fgColor={state.savedConfig?.qrForegroundColor || "rgba(0,0,0,1)"}
          bgQRColor={
            state.savedConfig?.qrBackgroundColor || "rgba(255,255,255,1)"
          }
        />
      </div>
    </div>
  );
}
