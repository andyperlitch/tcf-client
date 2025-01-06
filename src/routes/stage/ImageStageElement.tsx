import { useActiveClassNamesAndStyles } from "@/hooks/useActiveClassNamesAndStyles";
import {
  selectStageElement,
  updateStageElement,
} from "@/providers/StageStateProvider/actions";
import { useEventStageState } from "@/providers/StageStateProvider/EventStageStateContext";
import { pick } from "lodash";
import { useRef } from "react";
import { StageElementBoundingBox } from "./StageElementBoundingBox";

export function ImageStageElement({
  elementId,
  editor,
}: {
  elementId: string;
  editor: boolean;
}) {
  const { state, dispatch } = useEventStageState();
  const element = state.savedConfig.elements[elementId];
  const draftElement = state.draftConfig?.elements?.[elementId];
  const { className, styles: activeStyles } = useActiveClassNamesAndStyles(
    element,
    state.activeEngagement
  );
  const ref = useRef<HTMLDivElement>(null);
  const box = pick(activeStyles, ["width", "height", "top", "left"]);
  const draftImageUrl = draftElement?.imageUrl;
  const selected = state.selectedElementId === elementId;
  return (
    <>
      <div
        ref={ref}
        data-name="IMAGE_STAGE_ELEMENT"
        data-id={elementId}
        className={`
          ${className}
          ${editor ? "" : "transition-all duration-1000"}
        `}
        style={{
          ...activeStyles,
          backgroundImage: `url(${draftImageUrl || element.imageUrl || ""})`,
        }}
        onClick={
          editor
            ? () => dispatch(selectStageElement({ id: elementId }))
            : undefined
        }
      />
      {editor && (
        <StageElementBoundingBox
          box={box}
          selected={selected}
          onSelect={() => dispatch(selectStageElement({ id: elementId }))}
          ref={ref}
          element={element}
          activeEngagement={state.activeEngagement}
          onUpdate={(element) => dispatch(updateStageElement({ element }))}
        />
      )}
    </>
  );
}
