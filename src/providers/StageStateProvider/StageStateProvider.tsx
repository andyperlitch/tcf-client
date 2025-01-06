import { StageEventFragment } from "@/gql/graphql";
import { keyBy } from "lodash";
import { useEffect, useReducer } from "react";
import { stageStateContext } from "./StageStateContext";
import { defaultInitialState } from "./StageStateContext";
import { stageStateReducer } from "./reducer";
import { setActiveEngagement } from "./actions";

export function StageStateProvider({
  children,
  event,
}: {
  children: React.ReactNode;
  event: StageEventFragment;
}) {
  const [state, dispatch] = useReducer(stageStateReducer, {
    ...defaultInitialState,
    savedConfig: getInitialSavedConfig(event),
  });

  useEffect(() => {
    dispatch(setActiveEngagement({ engagement: event.activeEngagement }));
  }, [event.activeEngagement]);

  return (
    <stageStateContext.Provider value={{ state, dispatch }}>
      {children}
    </stageStateContext.Provider>
  );
}

function getInitialSavedConfig(event: StageEventFragment) {
  return {
    ...event.stageConfig,
    elements: keyBy(event.stageConfig?.elements || [], "id"),
    elementOrder: event.stageConfig?.elements?.map((e) => e.id) || [],
  };
}
