import { defaultInitialState, FanStateContextType } from "./FanStateContext";

import { createContext, useContext } from "react";

export const eventFanStateContext = createContext<FanStateContextType>({
  dispatch: () => {},
  state: defaultInitialState,
});

export function useEventFanState() {
  return useContext(eventFanStateContext);
}
