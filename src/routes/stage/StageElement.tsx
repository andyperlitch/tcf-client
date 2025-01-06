import { useEventStageState } from "@/providers/StageStateProvider/EventStageStateContext";
import { TextStageElement } from "./TextStageElement";
import { ImageStageElement } from "./ImageStageElement";

export function StageElement({
  elementId,
  editor,
}: {
  elementId: string;
  editor: boolean;
}) {
  const { state } = useEventStageState();
  const { type } = state.savedConfig.elements[elementId];

  if (type === "text") {
    return <TextStageElement elementId={elementId} editor={editor} />;
  }

  if (type === "image") {
    return <ImageStageElement elementId={elementId} editor={editor} />;
  }

  return null;
}
