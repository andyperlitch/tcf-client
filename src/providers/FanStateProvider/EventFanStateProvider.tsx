import { useMemo } from "react";
import { eventFanStateContext } from "./EventFanStateContext";
import { useCallback } from "react";
import { ActionType } from "./actions";
import { useIframe } from "@/hooks/use-iframe";
import { useFanState } from "./FanStateContext";

export function EventFanStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dispatch, state } = useFanState();

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

  const value = useMemo(
    () => ({
      state,
      dispatch: wrappedDispatch,
    }),
    [state, wrappedDispatch]
  );

  return (
    <eventFanStateContext.Provider value={value}>
      {children}
    </eventFanStateContext.Provider>
  );
}
