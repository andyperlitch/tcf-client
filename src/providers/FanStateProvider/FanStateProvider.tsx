import { FanEventFragment } from "@/gql/graphql";
import { keyBy } from "lodash";
import { useEffect, useReducer } from "react";
import { fanStateContext } from "./FanStateContext";
import { defaultInitialState } from "./FanStateContext";
import { fanStateReducer } from "./reducer";
import { setActiveEngagement } from "../sharedActions";
import { EngagementMode } from "@/types/screen";

export function FanStateProvider({
  children,
  event,
  engagementMode,
  setEngagementMode,
}: {
  children: React.ReactNode;
  event: FanEventFragment;
  engagementMode?: EngagementMode;
  setEngagementMode?: (mode: EngagementMode) => void;
}) {
  const initialState = {
    ...defaultInitialState,
    engagementMode: engagementMode || EngagementMode.Actual,
    savedConfig: getInitialSavedConfig(event),
  };
  const [state, dispatch] = useReducer(fanStateReducer, initialState);

  useEffect(() => {
    dispatch(setActiveEngagement({ engagement: event.activeEngagement }));
  }, [event.activeEngagement]);

  useEffect(() => {
    setEngagementMode?.(state.engagementMode);
  }, [setEngagementMode, state.engagementMode]);

  return (
    <fanStateContext.Provider value={{ state, dispatch }}>
      {children}
    </fanStateContext.Provider>
  );
}

function getInitialSavedConfig(event: FanEventFragment) {
  return {
    ...event.fanConfig,
    elements: keyBy(event.fanConfig?.elements || [], "id"),
    elementOrder: event.fanConfig?.elements?.map((e) => e.id) || [],
  };
}
