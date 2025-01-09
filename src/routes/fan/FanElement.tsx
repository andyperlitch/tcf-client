import { useEventFanState } from "@/providers/FanStateProvider/EventFanStateContext";
import { ScreenTextElement } from "../../components/ScreenTextElement";
import { ScreenImageElement } from "../../components/ScreenImageElement";

export function FanElement({
  elementId,
  editor,
}: {
  elementId: string;
  editor: boolean;
}) {
  const { state, dispatch } = useEventFanState();
  const { type } = state.savedConfig.elements[elementId];

  if (type === "text") {
    return (
      <ScreenTextElement
        className="font-fan"
        elementId={elementId}
        editor={editor}
        state={state}
        dispatch={dispatch}
      />
    );
  }

  if (type === "image") {
    return (
      <ScreenImageElement
        elementId={elementId}
        editor={editor}
        state={state}
        dispatch={dispatch}
      />
    );
  }

  return null;
}
