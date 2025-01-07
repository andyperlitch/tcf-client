import { useEventFanState } from "@/providers/FanStateProvider/EventFanStateContext";
import { TextScreenElement } from "../../components/ScreenTextElement";
import { ImageStageElement } from "../../components/ScreenImageElement";

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
      <TextScreenElement
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
      <ImageStageElement
        elementId={elementId}
        editor={editor}
        state={state}
        dispatch={dispatch}
      />
    );
  }

  return null;
}
