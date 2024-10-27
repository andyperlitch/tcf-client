import { useParamsSafe } from "@/hooks/useParamsSafe";
import { FunksGivingStage } from "./FunksGivingStage";
import { FC } from "react";

const CUSTOM_EVENT_PAGES: Record<string, FC> = {
  funksgiving: FunksGivingStage,
};

export function EventStageScreen() {
  const { slug } = useParamsSafe("slug");
  const CustomEventPage = CUSTOM_EVENT_PAGES[slug];

  return (
    <div className="flex flex-col gap-4">
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
