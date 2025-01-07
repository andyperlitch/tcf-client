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
import { pick } from "lodash";
import { SharedStageState, SharedFanState } from "@/types/screen";

export function TextScreenElement({
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
        updateScreenElement({ element: { ...element, text: internalText } })
      );
    }
  }, [editing, internalText, element, dispatch]);

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
          ${otherClassName}
          ${editing ? "z-20" : ""}
          ${editor ? "" : "transition-all duration-1000"}
        `}
        style={styles}
        onClick={handleClick}
        text={editing ? internalText : element.text}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={() => setEditing(false)}
      />
      {editor && (
        <ScreenElementBoundingBox
          box={box}
          selected={selected}
          onSelect={handleClick}
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
