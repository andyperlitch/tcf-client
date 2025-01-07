import { useActiveClassNamesAndStyles } from "@/hooks/useActiveClassNamesAndStyles";
import {
  EventScreenAction,
  selectScreenElement,
  updateScreenElement,
} from "@/providers/sharedActions";
import { pick } from "lodash";
import { Dispatch, useCallback, useRef } from "react";
import { ScreenElementBoundingBox } from "./ScreenElementBoundingBox";
import { SharedFanState } from "@/types/screen";
import { SharedStageState } from "@/types/screen";

export function ImageStageElement({
  elementId,
  editor,
  state,
  dispatch,
}: {
  elementId: string;
  editor: boolean;
  state: SharedStageState | SharedFanState;
  dispatch: Dispatch<EventScreenAction>;
}) {
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

  const handleClick = useCallback(() => {
    if (editor) {
      if (!selected) {
        dispatch(selectScreenElement({ id: elementId }));
      }
    } else if (element.linkHref) {
      window.open(element.linkHref, "_blank");
    }
  }, [editor, selected, elementId, dispatch, element.linkHref]);
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
        onClick={handleClick}
      />
      {editor && (
        <ScreenElementBoundingBox
          box={box}
          selected={selected}
          onSelect={() => dispatch(selectScreenElement({ id: elementId }))}
          ref={ref}
          element={element}
          activeEngagement={state.activeEngagement}
          onUpdate={(element) => dispatch(updateScreenElement({ element }))}
        />
      )}
    </>
  );
}
