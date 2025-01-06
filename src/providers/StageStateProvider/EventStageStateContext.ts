import {
  defaultInitialState,
  StageStateContextType,
} from "./StageStateContext";

import { createContext, useContext } from "react";

export const eventStageStateContext = createContext<StageStateContextType>({
  dispatch: () => {},
  state: defaultInitialState,
});

export function useEventStageState() {
  return useContext(eventStageStateContext);
}
