import { useMemo } from "react";
import { eventStageStateContext } from "./EventStageStateContext";
import { useCallback } from "react";
import { ActionType } from "./actions";
import { useIframe } from "@/hooks/use-iframe";
import { useStageState } from "./useStageState";

export function EventStageStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
      console.log("[SCREEN] dispatching message", message);
      dispatch(message);
      dispatchIframe(message);
    },
    [dispatch, dispatchIframe]
  );

  const value = useMemo(
    () => ({
      state,
      dispatch: wrappedDispatch,
    }),
    [state, wrappedDispatch]
  );

  return (
    <eventStageStateContext.Provider value={value}>
      {children}
    </eventStageStateContext.Provider>
  );
}
