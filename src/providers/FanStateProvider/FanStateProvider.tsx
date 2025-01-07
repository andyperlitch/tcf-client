import { FanEventFragment } from "@/gql/graphql";
import { keyBy } from "lodash";
import { useEffect, useReducer } from "react";
import { fanStateContext } from "./FanStateContext";
import { defaultInitialState } from "./FanStateContext";
import { fanStateReducer } from "./reducer";
import { setActiveEngagement } from "../sharedActions";

export function FanStateProvider({
  children,
  event,
}: {
  children: React.ReactNode;
  event: FanEventFragment;
}) {
  const initialState = {
    ...defaultInitialState,
    savedConfig: getInitialSavedConfig(event),
  };
  const [state, dispatch] = useReducer(fanStateReducer, initialState);

  useEffect(() => {
    dispatch(setActiveEngagement({ engagement: event.activeEngagement }));
  }, [event.activeEngagement]);

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
