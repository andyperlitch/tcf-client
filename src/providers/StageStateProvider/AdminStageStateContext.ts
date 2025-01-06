import {
  defaultInitialState,
  StageStateContextType,
} from "./StageStateContext";

import { createContext, useContext } from "react";

export const adminStageStateContext = createContext<StageStateContextType>({
  dispatch: () => {},
  state: defaultInitialState,
});

export function useAdminStageState() {
  return useContext(adminStageStateContext);
}
