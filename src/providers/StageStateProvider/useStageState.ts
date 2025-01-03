import { useContext } from "react";
import { stageStateContext } from "./StageStateProvider";

export function useStageState() {
  return useContext(stageStateContext);
}
