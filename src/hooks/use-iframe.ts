import {
  RefObject,
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useMemo,
} from "react";

interface Options {
  ref?: RefObject<HTMLIFrameElement>;
}

type MessageDispatcher<Message> = (message: Message) => void;

type UseIframeResult<Message> = [MessageDispatcher<Message>];

export type MessageHandler<Message> = (
  message: Message,
  dispatch: MessageDispatcher<Message>
) => void;

interface PrivateMessage {
  __private: true;
  type: "mounted";
  id: string;
}

const packetId = "__fromUseIframeHook";

function encodeMessage<Message>(message: Message, fromId?: string) {
  return JSON.stringify({
    fromId,
    payload: JSON.stringify(message),
    [packetId]: true,
  });
}

function decodeMessage<Message>(
  raw: any
): [Message, string | undefined] | undefined {
  try {
    const decoded = JSON.parse(raw);
    if (packetId in decoded && decoded[packetId] === true) {
      const message = JSON.parse(decoded.payload) as Message;
      return [message, decoded.fromId];
    }
  } catch (e) {
    return undefined;
  }
  return undefined;
}

function isPrivateMessage(message: any): message is PrivateMessage {
  return (
    // eslint-disable-next-line no-prototype-builtins
    message.hasOwnProperty("__private") &&
    "__private" in message &&
    message.__private === true
  );
}

export function useIframe<Message = any>(
  handleMessage: MessageHandler<Message>,
  options?: Options
): UseIframeResult<Message> {
  const ref = options?.ref;

  const isParent = useMemo(() => ref !== undefined, [ref]);
  const isChild = !isParent && window !== window.top;

  /** Scope: Parent */
  const [iframeId, setIframeId] = useState<string>();
  useEffect(() => {
    setIframeId(ref?.current?.id);
  }, [ref]);

  const [queue, setQueue] = useState<(Message | PrivateMessage)[]>([]);

  const [childId, setChildId] = useState<string>();

  /** Scope Parent */
  const isChildMounted = childId !== undefined;

  const dispatch = useCallback(
    (message: Message) => {
      if (isParent || isChild) {
        setQueue((q) => [...q, message]);
      }
    },
    [isParent, isChild]
  );

  const dispatchPrivate = useCallback(
    (message: PrivateMessage) => {
      if (isParent || isChild) {
        setQueue((q) => [...q, message]);
      }
    },
    [isParent, isChild]
  );

  const handlePrivateMessage = useCallback(
    (message: PrivateMessage) => {
      switch (message.type) {
        case "mounted":
          if (message.id === iframeId) {
            return setChildId(message.id);
          }
      }
    },
    [iframeId]
  );

  const postMessage = useCallback(
    (message: Message | PrivateMessage) => {
      if (isParent && ref?.current) {
        ref.current.contentWindow?.postMessage(encodeMessage(message), "*");
      } else if (isParent === false) {
        window.parent.postMessage(encodeMessage(message, childId), "*");
      }
    },
    [isParent, childId, ref]
  );

  useEffect(() => {
    const message = queue[0];
    if (isParent) {
      if (message && isChildMounted) {
        setQueue((q) => {
          const popped = q.shift();
          if (popped) {
            postMessage(popped);
          }
          return q.slice();
        });
      }
    } else {
      if (message) {
        setQueue((q) => {
          const popped = q.shift();
          if (popped) {
            postMessage(popped);
          }
          return q.slice();
        });
      }
    }
  }, [isParent, isChildMounted, postMessage, queue]);

  const eventListener = useCallback(
    (event: MessageEvent) => {
      const [message, fromId] =
        decodeMessage<Message | PrivateMessage>(event.data) || [];
      if (message) {
        if (isPrivateMessage(message)) {
          handlePrivateMessage(message);
        } else {
          if (isParent) {
            if (iframeId === fromId) {
              handleMessage(message, dispatch);
            }
          } else {
            handleMessage(message, dispatch);
          }
        }
      }
    },
    [handlePrivateMessage, isParent, iframeId, handleMessage, dispatch]
  );

  useEventListener(eventListener);

  useEffect(() => {
    if (!isParent) {
      const iframes = Array.from(
        window.parent.document.getElementsByTagName("iframe")
      );
      const iframe = iframes.find((iframe) => iframe.contentWindow === window);
      if (iframe) {
        dispatchPrivate({ type: "mounted", id: iframe.id, __private: true });
        setChildId(iframe.id);
      }
    }
  }, [dispatchPrivate, isParent]);

  if (isParent && ref?.current && !iframeId) {
    throw new Error("iframes must have an ID set");
  }

  return [dispatch];
}

export function useIframeEvent<EventName = string>(
  eventName: EventName,
  handleEvent?: () => void,
  options?: Options
): [() => void] {
  const handleMessage: MessageHandler<EventName> = useCallback(
    (event) => {
      if (handleEvent && event === eventName) {
        handleEvent();
      }
    },
    [handleEvent, eventName]
  );

  const [dispatch] = useIframe(handleMessage, options);

  const onEventHandler = useCallback(() => {
    dispatch(eventName);
  }, [eventName, dispatch]);

  return [onEventHandler];
}

type SharedStateMessageType<S> = {
  type: "__private_set-state";
  state: S;
  time: number;
};

export function useIframeSharedState<S>(
  initialState: S | (() => S),
  options?: Options
): [S, Dispatch<SetStateAction<S>>] {
  const stateAge = useRef({
    local: new Date().getTime(),
    remote: 0,
  });
  const [bothStates, setBothStates] = useState<{
    local: S;
    remote: S;
  }>(() => {
    const initialStateValue =
      typeof initialState === "function"
        ? (initialState as any)()
        : initialState;
    return {
      local: initialStateValue,
      remote: initialStateValue,
    };
  });
  const { local: internalState, remote: remoteState } = useMemo(
    () => bothStates,
    [bothStates]
  );
  const setInternalState = useCallback((state: S | ((prev: S) => S)) => {
    setBothStates((prev) => ({
      ...prev,
      local: (function () {
        const newState =
          typeof state === "function"
            ? (state as any)(
                stateAge.current.local > stateAge.current.remote
                  ? prev.local
                  : prev.remote
              )
            : state;
        stateAge.current.local = new Date().getTime();
        return newState;
      })(),
    }));
  }, []);

  const setRemoteState = useCallback((state: S | ((prev: S) => S)) => {
    setBothStates((prev) => ({
      ...prev,
      remote: (function () {
        const newState =
          typeof state === "function"
            ? (state as any)(
                stateAge.current.local > stateAge.current.remote
                  ? prev.local
                  : prev.remote
              )
            : state;

        stateAge.current.remote = new Date().getTime();
        return newState;
      })(),
    }));
  }, []);

  const handler: MessageHandler<SharedStateMessageType<S>> = useCallback(
    (message) => {
      switch (message.type) {
        case "__private_set-state":
          stateAge.current.remote = message.time;
          return setRemoteState(message.state);
      }
    },
    [setRemoteState]
  );

  const [dispatch] = useIframe(handler, options);

  useEffect(() => {
    const now = new Date().getTime();
    stateAge.current.local = now;
    dispatch({ type: "__private_set-state", state: internalState, time: now });
  }, [internalState, dispatch, options?.ref]);

  const state =
    stateAge.current.local > stateAge.current.remote
      ? internalState
      : remoteState;

  return [state, setInternalState];
}

type MessageEventListener = (event: MessageEvent) => void;

function useEventListener(
  handler: MessageEventListener,
  element: HTMLElement | Window = window
) {
  const savedHandler = useRef<MessageEventListener>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    const eventListener = (event: Event) =>
      savedHandler.current?.(event as MessageEvent);
    element.addEventListener("message", eventListener);
    return () => {
      element.removeEventListener("message", eventListener);
    };
  }, [element]);
}
