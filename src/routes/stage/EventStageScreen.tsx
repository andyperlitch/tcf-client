import { useParamsSafe } from "@/hooks/useParamsSafe";
import { FunksGivingStage } from "./Funksgiving/FunksGivingStage";
import { FC, useEffect } from "react";
import { useStageScreenViewport } from "./useStageScreenViewport";
import { useStageStyles } from "./useStageStyles";
import { StageActiveEngagement } from "@/engagements/StageActiveEngagement";
import { StageElement } from "./StageElement";
import { StageChrome } from "./StageChrome";
import { useStageEvent } from "@/hooks/useStageEvent";
import { useStageState } from "./useStageState";
import { StageEventFragment } from "@/gql/graphql";
import { useSearchParams } from "react-router-dom";
import { useGoogleFonts } from "@/hooks/useGoogleFonts";
import { useStageElementHandlers } from "../admin/event/StageEditor/useStageElementHandlers";

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
    selectedElement,
  } = useStageState({
    initialConfig: event.stageConfig || { elements: [] },
  });
  const { rootStyles } = useStageStyles({ stageConfig, draftConfig });

  const { handleUpdateElement, handleDeleteElement } = useStageElementHandlers({
    setSavedConfig,
    setSelectedElementId,
    selectedElementId,
  });

  useGoogleFonts({
    fontFamily: draftConfig?.fontFamily || stageConfig?.fontFamily || [],
  });

  // Keyboard shortcuts
  useEffect(() => {
    // only set the window listener if the user is in editor mode
    if (editor) {
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Backspace") {
          const isEditing =
            (event.target as HTMLElement).contentEditable === "true";
          if (!isEditing && selectedElement) {
            handleDeleteElement(selectedElement);
          }
        }
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [editor, selectedElement, handleDeleteElement]);

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
