import { useFanEvent } from "@/hooks/useFanEvent";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import { FunksgivingFanScreen } from "./Funksgiving";
import { FC, useCallback } from "react";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { useAuth } from "@/hooks/useAuth";
import { ErrorScreen } from "@/components/ErrorScreen";
import { FullScreenLoader } from "@/components/Loader";
import { FanEventFragment } from "@/gql/graphql";
import { FanStateProvider } from "@/providers/FanStateProvider";
import { EventFanStateProvider } from "@/providers/FanStateProvider/EventFanStateProvider";
import { FanActiveEngagement } from "@/engagements/FanActiveEngagement";
import { useFanStyles } from "./useFanStyles";
import { useEventFanState } from "@/providers/FanStateProvider/EventFanStateContext";
import { useGoogleFonts } from "@/hooks/useGoogleFonts";
import { useHotkeys } from "@shelf/hotkeys";
import { FanElement } from "./FanElement";
import {
  deleteScreenElement,
  selectScreenElement,
} from "@/providers/sharedActions";

const CUSTOM_EVENT_PAGES: Record<string, FC<{ event: FanEventFragment }>> = {
  funksgiving: FunksgivingFanScreen,
};

export function EventFanScreen() {
  const { slug } = useParamsSafe("slug");
  const { pathname } = useLocation();
  const { user } = useAuth();

  const { data, loading, error } = useFanEvent(slug, {
    skip: !user,
  });

  if (!user) {
    return (
      <Navigate
        to={`/quick-signup?returnUrl=${encodeURIComponent(pathname)}`}
      />
    );
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  if (loading) {
    return <FullScreenLoader />;
  }

  if (!data?.event) {
    return <ErrorScreen error={error} />;
  }

  if (CUSTOM_EVENT_PAGES[slug]) {
    const CustomEventPage = CUSTOM_EVENT_PAGES[slug];
    return <CustomEventPage event={data.event} />;
  }

  return (
    <FanStateProvider event={data.event}>
      <EventFanStateProvider>
        <Screen event={data.event} />
      </EventFanStateProvider>
    </FanStateProvider>
  );
}

function Screen({ event }: { event: FanEventFragment }) {
  const [searchParams] = useSearchParams();
  const editor = searchParams.get("editor") === "true";
  const { state, dispatch } = useEventFanState();
  const CustomEventPage = CUSTOM_EVENT_PAGES[event.slug];

  const { rootStyles } = useFanStyles({
    state,
  });

  useGoogleFonts({
    fontFamily:
      state.draftConfig?.fontFamily || state.savedConfig?.fontFamily || [],
  });

  useHotkeys({
    Backspace: useCallback(() => {
      if (editor && state.selectedElementId) {
        dispatch(deleteScreenElement({ id: state.selectedElementId }));
      }
    }, [editor, state.selectedElementId, dispatch]),
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

  if (CustomEventPage) {
    return <CustomEventPage event={event} />;
  }

  return (
    <div
      data-name="FAN_ROOT"
      className={`
        relative flex h-screen w-screen flex-col gap-4 overflow-auto pt-16
      `}
      style={rootStyles}
      onClick={handleDeselectAll}
    >
      <div data-name="FAN_ENGAGEMENT" className="relative z-10">
        {state.activeEngagement && (
          <FanActiveEngagement engagement={state.activeEngagement} />
        )}
      </div>

      <div
        data-name="FAN_SCREEN_ELEMENTS"
        className={`
          absolute left-0 top-0 h-full w-full

          ${editor ? "z-20" : "z-0"}
        `}
      >
        {state.savedConfig.elementOrder.map((elementId) => (
          <FanElement key={elementId} elementId={elementId} editor={editor} />
        ))}
      </div>
    </div>
  );
}
