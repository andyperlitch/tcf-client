import { ActionType } from "./actions";
import { Dispatch, useContext } from "react";
import { SharedFanState } from "@/types/screen";
import { createContext } from "react";

export const defaultInitialState: SharedFanState = {
  savedConfig: { elements: {}, elementOrder: [] },
  draftConfig: {},
  selectedElementId: undefined,
  engagementMode: "actual",
};
export interface FanStateContextType {
  dispatch: Dispatch<ActionType>;
  state: SharedFanState;
}
export const fanStateContext = createContext<FanStateContextType>({
  dispatch: () => {},
  state: defaultInitialState,
});
export function useFanState() {
  return useContext(fanStateContext);
}
