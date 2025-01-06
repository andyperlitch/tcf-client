import { ActionType } from "./actions";
import { Dispatch } from "react";
import { SharedStageState } from "@/types/stage";
import { createContext } from "react";

export const defaultInitialState: SharedStageState = {
  savedConfig: { elements: {}, elementOrder: [] },
  draftConfig: {},
  selectedElementId: undefined,
};
export interface StageStateContextType {
  dispatch: Dispatch<ActionType>;
  state: SharedStageState;
}
export const stageStateContext = createContext<StageStateContextType>({
  dispatch: () => {},
  state: defaultInitialState,
});
