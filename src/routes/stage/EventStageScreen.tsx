import { useParamsSafe } from "@/hooks/useParamsSafe";
import { FunksGivingStage } from "./Funksgiving/FunksGivingStage";
import { FC, useCallback } from "react";
import { useStageScreenViewport } from "./useStageScreenViewport";
import { useStageStyles } from "./useStageStyles";
import { StageActiveEngagement } from "@/engagements/StageActiveEngagement";
import { StageElement } from "./StageElement";
import { StageChrome } from "./StageChrome";
import { useStageEvent } from "@/hooks/useStageEvent";
import { useStageState } from "./useStageState";
import { StageElementFragment, StageEventFragment } from "@/gql/graphql";
import { useSearchParams } from "react-router-dom";
import { useGoogleFonts } from "@/hooks/useGoogleFonts";

const CUSTOM_EVENT_PAGES: Record<string, FC> = {
  funksgiving: FunksGivingStage,
};

export function EventStageScreen() {
  const { slug } = useParamsSafe("slug");

  useStageScreenViewport();

  const { data } = useStageEvent(slug);

  if (!data?.event) {
    return <div>Loading...</div>;
  }

  return <Screen event={data.event} />;
}

function Screen({ event }: { event: StageEventFragment }) {
  const CustomEventPage = CUSTOM_EVENT_PAGES[event.slug];
  const [searchParams] = useSearchParams();
  const editor = searchParams.get("editor") === "true";
  const {
    stageConfig,
    draftConfig,
    setSavedConfig,
    setSelectedElementId,
    selectedElementId,
  } = useStageState({
    initialConfig: event.stageConfig || { elements: [] },
  });
  const { rootStyles } = useStageStyles({ stageConfig, draftConfig });
  const handleUpdateElement = useCallback(
    (element: StageElementFragment) => {
      setSavedConfig((prev) => ({
        ...prev,
        elements:
          prev.elements?.map((e) => (e.id === element.id ? element : e)) || [],
      }));
    },
    [setSavedConfig]
  );

  useGoogleFonts({
    fontFamily: draftConfig?.fontFamily || stageConfig?.fontFamily || [],
  });

  return (
    <div
      data-name="STAGE_ROOT"
      className={`
      relative flex h-screen w-screen flex-col gap-4 overflow-hidden
    `}
      style={rootStyles}
    >
      {CustomEventPage ? (
        <CustomEventPage />
      ) : (
        <StageChrome name="STAGE_CHROME" event={event}>
          {stageConfig?.elements?.map((element) => (
            <StageElement
              onSelect={setSelectedElementId}
              selected={selectedElementId === element.id}
              element={element}
              key={element.id}
              editor={editor}
              activeEngagement={event.activeEngagement}
              onUpdate={handleUpdateElement}
            />
          ))}
          {event.activeEngagement && <StageActiveEngagement event={event} />}
        </StageChrome>
      )}
    </div>
  );
}
