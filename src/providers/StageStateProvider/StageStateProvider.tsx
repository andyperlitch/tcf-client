import { StageEventFragment } from "@/gql/graphql";
import { keyBy } from "lodash";
import { useEffect, useReducer } from "react";
import { stageStateContext } from "./StageStateContext";
import { defaultInitialState } from "./StageStateContext";
import { stageStateReducer } from "./reducer";
import { setActiveEngagement } from "../sharedActions";
import { EngagementMode } from "@/types/screen";

export function StageStateProvider({
  children,
  event,
  engagementMode,
  setEngagementMode,
}: {
  children: React.ReactNode;
  event: StageEventFragment;
  engagementMode?: EngagementMode;
  setEngagementMode?: (mode: EngagementMode) => void;
}) {
  const initialState = {
    ...defaultInitialState,
    engagementMode: engagementMode || EngagementMode.Actual,
    savedConfig: getInitialSavedConfig(event),
  };
  const [state, dispatch] = useReducer(stageStateReducer, initialState);

  useEffect(() => {
    dispatch(setActiveEngagement({ engagement: event.activeEngagement }));
  }, [event.activeEngagement]);

  useEffect(() => {
    setEngagementMode?.(state.engagementMode);
  }, [setEngagementMode, state.engagementMode]);

  return (
    <stageStateContext.Provider value={{ state, dispatch }}>
      {children}
    </stageStateContext.Provider>
  );
}

function getInitialSavedConfig(event: StageEventFragment) {
  console.log(`andy event.stageConfig`, event.stageConfig);
  return {
    ...event.stageConfig,
    elements: keyBy(event.stageConfig?.elements || [], "id"),
    elementOrder: event.stageConfig?.elements?.map((e) => e.id) || [],
  };
}
