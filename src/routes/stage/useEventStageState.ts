import { useCallback } from "react";
import { useIframe } from "@/hooks/use-iframe";
import { useStageState } from "@/providers/StageStateProvider/useStageState";
import { ActionType } from "@/providers/StageStateProvider/actions";

/**
 * This hook is used to manage the stage config from the user-facing side.
 */
export function useEventStageState() {
  const { dispatch, state } = useStageState();

  const handler = useCallback(
    (message: ActionType) => {
      dispatch(message);
    },
    [dispatch]
  );

  const [dispatchIframe] = useIframe(handler);

  const wrappedDispatch = useCallback(
    (message: ActionType) => {
      dispatch(message);
      dispatchIframe(message);
    },
    [dispatch, dispatchIframe]
  );

  return {
    state,
    dispatch: wrappedDispatch,
  };
}
