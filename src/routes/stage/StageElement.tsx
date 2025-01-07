import { useEventStageState } from "@/providers/StageStateProvider/EventStageStateContext";
import { TextScreenElement } from "../../components/ScreenTextElement";
import { ImageStageElement } from "../../components/ScreenImageElement";

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
      <TextScreenElement
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
