import { defaultInitialState, FanStateContextType } from "./FanStateContext";

import { createContext, useContext } from "react";

export const adminFanStateContext = createContext<FanStateContextType>({
  dispatch: () => {},
  state: defaultInitialState,
});

export function useAdminFanState() {
  return useContext(adminFanStateContext);
}
