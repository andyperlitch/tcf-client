import { useHotkeys } from "@shelf/hotkeys";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { FunksGivingStage } from "./Funksgiving/FunksGivingStage";
import { FC, useCallback, useState } from "react";
import { useStageScreenViewport } from "./useStageScreenViewport";
import { useStageStyles } from "./useStageStyles";
import { StageActiveEngagement } from "@/engagements/StageActiveEngagement";
import { StageElement } from "./StageElement";
import { StageChrome } from "./StageChrome";
import { useStageEvent } from "@/hooks/useStageEvent";
import { StageEventFragment } from "@/gql/graphql";
import { useSearchParams } from "react-router-dom";
import { useGoogleFonts } from "@/hooks/useGoogleFonts";
import { StageStateProvider } from "@/providers/StageStateProvider";
import { EventStageStateProvider } from "@/providers/StageStateProvider/EventStageStateProvider";
import { useEventStageState } from "@/providers/StageStateProvider/EventStageStateContext";
import { FullScreenLoader } from "@/components/Loader";
import { ErrorScreen } from "@/components/ErrorScreen";
import {
  deleteScreenElement,
  selectScreenElement,
} from "@/providers/sharedActions";
import { EngagementMode } from "@/types/screen";
import { StageGuideEngagement } from "./StageGuideEngagement";

const CUSTOM_EVENT_PAGES: Record<string, FC> = {
  funksgiving: FunksGivingStage,
};

export function EventStageScreen() {
  const { slug } = useParamsSafe("slug");

  useStageScreenViewport();

  const { data, loading, error } = useStageEvent(slug);

  const [engagementMode, setEngagementMode] = useState<EngagementMode>(
    EngagementMode.Actual
  );

  if (!data?.event) {
    if (loading) {
      return <FullScreenLoader />;
    }
    return <ErrorScreen error={error} />;
  }

  return (
    <StageStateProvider
      event={data.event}
      engagementMode={engagementMode}
      setEngagementMode={setEngagementMode}
    >
      <EventStageStateProvider>
        <Screen event={data.event} />
      </EventStageStateProvider>
    </StageStateProvider>
  );
}

function Screen({ event }: { event: StageEventFragment }) {
  const CustomEventPage = CUSTOM_EVENT_PAGES[event.slug];
  const [searchParams] = useSearchParams();
  const editor = searchParams.get("editor") === "true";
  const {
    dispatch,
    state: { savedConfig, draftConfig, selectedElementId },
    state,
  } = useEventStageState();

  const { rootStyles } = useStageStyles({ state });

  useGoogleFonts({
    fontFamily: draftConfig?.fontFamily || savedConfig?.fontFamily || [],
  });

  useHotkeys({
    Backspace: useCallback(() => {
      if (editor && selectedElementId) {
        dispatch(deleteScreenElement({ id: selectedElementId }));
      }
    }, [editor, selectedElementId, dispatch]),
  });

  const handleDeselectAll = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const dataName = (e.target as HTMLElement).getAttribute("data-name");
      if (editor && !dataName?.startsWith("BOUNDING_BOX")) {
        dispatch(selectScreenElement({ id: undefined }));
      }
    },
    [editor, dispatch]
  );

  let children: React.ReactNode;

  if (editor) {
    children = (
      <>
        {state.engagementMode === EngagementMode.Actual &&
          state.activeEngagement && <StageActiveEngagement event={event} />}
        {state.engagementMode === EngagementMode.Guide && (
          <StageGuideEngagement />
        )}
        {savedConfig.elementOrder.map((elementId) => (
          <StageElement key={elementId} elementId={elementId} editor={editor} />
        ))}
      </>
    );
  } else {
    children = (
      <>
        {savedConfig.elementOrder.map((elementId) => (
          <StageElement key={elementId} elementId={elementId} editor={editor} />
        ))}
        {/* in non-editor, show actual engagement above elements */}
        {event.activeEngagement && <StageActiveEngagement event={event} />}
      </>
    );
  }

  return (
    <div
      data-name="STAGE_ROOT"
      className={`
      relative flex h-screen w-screen flex-col gap-4 overflow-hidden
    `}
      style={rootStyles}
      onClick={handleDeselectAll}
    >
      {CustomEventPage ? (
        <CustomEventPage />
      ) : (
        <StageChrome name="STAGE_CHROME" event={event}>
          {children}
        </StageChrome>
      )}
    </div>
  );
}
