import { useContext } from "react";
import { stageStateContext } from "./StageStateContext";

export function useStageState() {
  return useContext(stageStateContext);
}
