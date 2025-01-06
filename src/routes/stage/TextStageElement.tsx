import { useEventStageState } from "@/providers/StageStateProvider/EventStageStateContext";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { ContentEditableDiv } from "@/components/ContentEditableDiv";
import { StageElementBoundingBox } from "./StageElementBoundingBox";
import {
  selectStageElement,
  updateStageElement,
} from "@/providers/StageStateProvider/actions";
import { StageElementFragment } from "@/gql/graphql";
import { useActiveClassNamesAndStyles } from "@/hooks/useActiveClassNamesAndStyles";
import { pick } from "lodash";

export function TextStageElement({
  elementId,
  editor,
}: {
  elementId: string;
  editor: boolean;
}) {
  const { state, dispatch } = useEventStageState();
  const element = state.savedConfig.elements[elementId];
  const { className, styles: activeStyles } = useActiveClassNamesAndStyles(
    element,
    state.activeEngagement
  );
  const ref = useRef<HTMLDivElement>(null);
  const box = pick(activeStyles, ["width", "height", "top", "left"]);
  const [editing, setEditing] = useState(false);
  const [internalText, setInternalText] = useState(element.text || "");
  const selected = state.selectedElementId === elementId;

  useEffect(() => {
    if (!editing && internalText !== element.text) {
      dispatch(
        updateStageElement({ element: { ...element, text: internalText } })
      );
    }
  }, [editing, internalText, element, dispatch]);

  const handleSelect = useCallback(() => {
    if (editor && !selected) {
      dispatch(selectStageElement({ id: elementId }));
    }
  }, [editor, selected, elementId, dispatch]);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" && event.shiftKey) {
        event.preventDefault();
        setEditing(false);
      } else if (event.key === "Escape") {
        setEditing(false);
      }
    },
    [setEditing]
  );

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLDivElement>) =>
      setInternalText((event.target as HTMLDivElement).innerText),
    [setInternalText]
  );

  const onUpdate = useCallback(
    (element: StageElementFragment) =>
      dispatch(updateStageElement({ element })),
    [dispatch]
  );

  const styles = useMemo(() => {
    if (element.fontFamily) {
      return {
        ...activeStyles,
        fontFamily: element.fontFamily.join(","),
      };
    }
    return {
      ...activeStyles,
    };
  }, [activeStyles, element.fontFamily]);

  return (
    <>
      <ContentEditableDiv
        editable={editing}
        ref={ref}
        data-name="TEXT_STAGE_ELEMENT"
        data-id={elementId}
        className={`
          ${className}
          ${editing ? "z-20" : ""}
          ${editor ? "" : "transition-all duration-1000"}

          font-stage
        `}
        style={styles}
        onClick={handleSelect}
        text={editing ? internalText : element.text}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={() => setEditing(false)}
      />
      {editor && (
        <StageElementBoundingBox
          box={box}
          selected={selected}
          onSelect={handleSelect}
          ref={ref}
          element={element}
          activeEngagement={state.activeEngagement}
          onUpdate={onUpdate}
          onDoubleClick={() => setEditing(true)}
        />
      )}
    </>
  );
}
