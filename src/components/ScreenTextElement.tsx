import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  Dispatch,
} from "react";
import { ContentEditableDiv } from "@/components/ContentEditableDiv";
import { ScreenElementBoundingBox } from "./ScreenElementBoundingBox";
import {
  EventScreenAction,
  selectScreenElement,
  updateScreenElement,
} from "@/providers/sharedActions";
import { ScreenElementFragment } from "@/gql/graphql";
import { useActiveClassNamesAndStyles } from "@/hooks/useActiveClassNamesAndStyles";
import {
  SharedStageState,
  SharedFanState,
  EngagementMode,
} from "@/types/screen";
import { useGoogleFonts } from "@/hooks/useGoogleFonts";

export function ScreenTextElement({
  elementId,
  editor,
  state,
  dispatch,
  className: otherClassName,
}: {
  elementId: string;
  editor: boolean;
  state: SharedStageState | SharedFanState;
  dispatch: Dispatch<EventScreenAction>;
  className?: string;
}) {
  const element = state.savedConfig.elements[elementId];
  const hasActiveEngagement =
    state.engagementMode === EngagementMode.Guide ||
    Boolean(
      state.activeEngagement && state.engagementMode === EngagementMode.Actual
    );

  const { className, styles: activeStyles } = useActiveClassNamesAndStyles(
    element,
    hasActiveEngagement
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);
  const [internalText, setInternalText] = useState(element.text || "");
  const selected = state.selectedElementId === elementId;

  useEffect(() => {
    if (!editing && internalText !== element.text) {
      dispatch(
        updateScreenElement({ element: { ...element, text: internalText } })
      );
    }
  }, [editing, internalText, element, dispatch]);

  useGoogleFonts({ fontFamily: element.fontFamily });

  const handleClick = useCallback(() => {
    if (editor) {
      if (!selected) {
        dispatch(selectScreenElement({ id: elementId }));
      }
    } else if (element.linkHref) {
      window.open(element.linkHref, "_blank");
    }
  }, [editor, selected, elementId, dispatch, element.linkHref]);

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
    (element: ScreenElementFragment) =>
      dispatch(updateScreenElement({ element })),
    [dispatch]
  );

  const { wrapperStyles, contentStyles } = useMemo(() => {
    const { width, height, top, left, ...rest } = activeStyles;
    const wrapperStyles = { width, height, top, left };
    const contentStyles = rest;
    if (element.fontFamily) {
      contentStyles.fontFamily = element.fontFamily;
    }
    return {
      wrapperStyles,
      contentStyles,
    };
  }, [activeStyles, element.fontFamily]);

  return (
    <div
      data-name="TEXT_STAGE_ELEMENT_WRAPPER"
      data-id={elementId}
      ref={wrapperRef}
      className={`
        absolute

        ${editor ? "" : "transition-all duration-1000"}
      `}
      style={wrapperStyles}
    >
      <ContentEditableDiv
        editable={editing}
        data-name="TEXT_STAGE_ELEMENT"
        data-id={elementId}
        className={`
          h-full w-full

          ${className}
          ${otherClassName}
          ${editing ? "z-20" : ""}
          ${editor ? "" : "transition-all duration-1000"}
        `}
        style={contentStyles}
        onClick={handleClick}
        text={editing ? internalText : element.text}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={() => setEditing(false)}
      />
      {editor && (
        <ScreenElementBoundingBox
          selected={selected}
          onSelect={handleClick}
          ref={wrapperRef}
          element={element}
          activeEngagement={hasActiveEngagement}
          onUpdate={onUpdate}
          onDoubleClick={() => setEditing(true)}
        />
      )}
    </div>
  );
}
