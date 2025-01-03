import { SharedStageState } from "@/types/stage";
import { createContext, Dispatch, useReducer } from "react";
import { stageStateReducer } from "./reducer";
import { ActionType } from "./actions";

const defaultInitialState: SharedStageState = {
  savedConfig: { elements: [] },
  draftConfig: {},
  selectedElementId: undefined,
};
export const stageStateContext = createContext<{
  dispatch: Dispatch<ActionType>;
  state: SharedStageState;
}>({
  dispatch: () => {},
  state: defaultInitialState,
});

export function StageStateProvider({
  children,
  initialSavedConfig,
}: {
  children: React.ReactNode;
  initialSavedConfig?: SharedStageState["savedConfig"] | null;
}) {
  const [state, dispatch] = useReducer(stageStateReducer, {
    ...defaultInitialState,
    savedConfig: initialSavedConfig ?? defaultInitialState.savedConfig,
  });
  return (
    <stageStateContext.Provider value={{ state, dispatch }}>
      {children}
    </stageStateContext.Provider>
  );
}
