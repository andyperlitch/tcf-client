import { useParamsSafe } from "@/hooks/useParamsSafe";
import { FunksGivingStage } from "./Funksgiving/FunksGivingStage";
import { FC } from "react";
import { useStageScreenViewport } from "./useStageScreenViewport";

const CUSTOM_EVENT_PAGES: Record<string, FC> = {
  funksgiving: FunksGivingStage,
};

export function EventStageScreen() {
  const { slug } = useParamsSafe("slug");
  const CustomEventPage = CUSTOM_EVENT_PAGES[slug];
  useStageScreenViewport();

  return (
    <div
      className={`
      relative flex h-screen w-screen flex-col gap-4 overflow-hidden
    `}
    >
      {CustomEventPage ? (
        <CustomEventPage />
      ) : (
        <div>
          <h2>No Custom Event Page</h2>
        </div>
      )}
    </div>
  );
}
