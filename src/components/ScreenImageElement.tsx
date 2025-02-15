import { useActiveClassNamesAndStyles } from "@/hooks/useActiveClassNamesAndStyles";
import {
  EventScreenAction,
  selectScreenElement,
  updateScreenElement,
} from "@/providers/sharedActions";
import { Dispatch, useCallback, useMemo, useRef } from "react";
import { ScreenElementBoundingBox } from "./ScreenElementBoundingBox";
import { EngagementMode, SharedFanState } from "@/types/screen";
import { SharedStageState } from "@/types/screen";

export function ScreenImageElement({
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
  let hasActiveEngagement =
    state.engagementMode === EngagementMode.Guide ||
    Boolean(
      state.activeEngagement && state.engagementMode === EngagementMode.Actual
    );

  if (!editor) {
    hasActiveEngagement = Boolean(state.activeEngagement);
  }

  const { className, styles: activeStyles } = useActiveClassNamesAndStyles(
    element,
    hasActiveEngagement
  );
  const ref = useRef<HTMLDivElement>(null);
  const draftImageUrl = draftElement?.imageUrl;
  const selected = state.selectedElementId === elementId;

  const { wrapperStyles, contentStyles } = useMemo(() => {
    const { width, height, top, left, ...rest } = activeStyles;
    const wrapperStyles = { width, height, top, left };
    const contentStyles = {
      ...rest,
      backgroundImage: `url(${draftImageUrl || element.imageUrl || ""})`,
    };
    return { wrapperStyles, contentStyles };
  }, [activeStyles, draftImageUrl, element.imageUrl]);

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
    <div
      ref={ref}
      data-name="IMAGE_STAGE_ELEMENT_WRAPPER"
      data-id={elementId}
      className={`
        absolute

        ${editor ? "" : "transition-all duration-1000"}
      `}
      style={wrapperStyles}
    >
      <div
        data-name="IMAGE_STAGE_ELEMENT"
        data-id={elementId}
        className={`
          h-full w-full

          ${className}
          ${editor ? "" : "transition-all duration-1000"}
        `}
        style={contentStyles}
        onClick={handleClick}
      />
      {editor && (
        <ScreenElementBoundingBox
          selected={selected}
          onSelect={() => dispatch(selectScreenElement({ id: elementId }))}
          ref={ref}
          element={element}
          activeEngagement={hasActiveEngagement}
          onUpdate={(element) => dispatch(updateScreenElement({ element }))}
        />
      )}
    </div>
  );
}
