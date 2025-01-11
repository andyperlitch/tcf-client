import { ActionType } from "./actions";
import { Dispatch, useContext } from "react";
import { SharedStageState } from "@/types/screen";
import { createContext } from "react";

export const defaultInitialState: SharedStageState = {
  savedConfig: { elements: {}, elementOrder: [] },
  draftConfig: {},
  selectedElementId: undefined,
  engagementMode: "actual",
};
export interface StageStateContextType {
  dispatch: Dispatch<ActionType>;
  state: SharedStageState;
}
export const stageStateContext = createContext<StageStateContextType>({
  dispatch: () => {},
  state: defaultInitialState,
});
export function useStageState() {
  return useContext(stageStateContext);
}
