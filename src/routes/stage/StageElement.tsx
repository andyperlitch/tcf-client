import { useEventStageState } from "@/providers/StageStateProvider/EventStageStateContext";
import { ScreenTextElement } from "../../components/ScreenTextElement";
import { ScreenImageElement } from "../../components/ScreenImageElement";

export function StageElement({
  elementId,
  editor,
}: {
  elementId: string;
  editor: boolean;
}) {
  const { state, dispatch } = useEventStageState();
  const { type } = state.savedConfig.elements[elementId];

  if (type === "text") {
    return (
      <ScreenTextElement
        className="font-stage"
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
