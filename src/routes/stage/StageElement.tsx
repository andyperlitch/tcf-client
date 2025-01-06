import { StageElementFragment, StageEngagementFragment } from "@/gql/graphql";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StageElementBoundingBox } from "./StageElementBoundingBox";
import { ContentEditableDiv } from "@/components/ContentEditableDiv";
import { pick } from "lodash";
import {
  selectStageElement,
  updateStageElement,
} from "@/providers/StageStateProvider/actions";
import { useEventStageState } from "@/providers/StageStateProvider/EventStageStateContext";

function useActiveClassNamesAndStyles(
  element: StageElementFragment,
  activeEngagement: StageEngagementFragment | null | undefined
) {
  return useMemo(() => {
    const className = `
      absolute

      ${
        activeEngagement
          ? element.engagementClassNames || ""
          : element.defaultClassNames || ""
      }
    `;
    const styles = activeEngagement
      ? element.engagementStyles
      : element.defaultStyles;
    return { className, styles };
  }, [element, activeEngagement]);
}

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

function TextStageElement({
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

function ImageStageElement({
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
