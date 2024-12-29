import { StageElementFragment, StageEngagementFragment } from "@/gql/graphql";
import { useCallback, useEffect, useRef, useState } from "react";
import { StageElementBoundingBox } from "./StageElementBoundingBox";
import { StageState } from "./useStageState";
import { ContentEditableDiv } from "@/components/ContentEditableDiv";
import { pick } from "lodash";

export function StageElement({
  element,
  element: {
    engagementClassNames,
    defaultClassNames,
    engagementStyles,
    defaultStyles,
  },
  activeEngagement,
  editor,
  onUpdate,
  onSelect,
  selected,
}: {
  element: StageElementFragment;
  activeEngagement: StageEngagementFragment | null | undefined;
  editor: boolean;
  onUpdate: (element: StageElementFragment) => void;
  onSelect: StageState["setSelectedElementId"];
  selected: boolean;
}) {
  const className = `
    absolute

    ${activeEngagement ? engagementClassNames || "" : defaultClassNames || ""}
  `;
  const styles = activeEngagement ? engagementStyles : defaultStyles;

  if (element.type === "text") {
    return (
      <TextStageElement
        onSelect={onSelect}
        selected={selected}
        element={element}
        className={className}
        styles={styles}
        activeEngagement={activeEngagement}
        editor={editor}
        onUpdate={onUpdate}
      />
    );
  }

  if (element.type === "image") {
    return (
      <ImageStageElement
        onSelect={onSelect}
        selected={selected}
        element={element}
        className={className}
        styles={styles}
        activeEngagement={activeEngagement}
        editor={editor}
        onUpdate={onUpdate}
      />
    );
  }

  return null;
}

function TextStageElement({
  element: { id, text },
  styles,
  className,
  element,
  activeEngagement,
  editor,
  onUpdate,
  onSelect,
  selected,
}: {
  element: StageElementFragment;
  activeEngagement: StageEngagementFragment | null | undefined;
  editor: boolean;
  onUpdate: (element: StageElementFragment) => void;
  onSelect: StageState["setSelectedElementId"];
  selected: boolean;
  className: string;
  styles: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const box = pick(styles, ["width", "height", "top", "left"]);
  const [editing, setEditing] = useState(false);
  const [internalText, setInternalText] = useState(text || "");

  useEffect(() => {
    if (!editing && internalText !== text) {
      onUpdate({ ...element, text: internalText });
    }
  }, [editing, internalText, text, onUpdate, element]);

  const handleSelect = useCallback(() => {
    if (editor && !selected) {
      onSelect(id);
    }
  }, [editor, selected, id, onSelect]);

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

  return (
    <>
      <ContentEditableDiv
        editable={editing}
        ref={ref}
        data-name="TEXT_STAGE_ELEMENT"
        data-id={id}
        className={`
          ${className}
          ${editing ? "z-20" : ""}
          ${editor ? "" : "transition-all duration-1000"}

          font-stage
        `}
        style={styles}
        onClick={handleSelect}
        text={editing ? internalText : text}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={() => setEditing(false)}
      />
      {editor && (
        <StageElementBoundingBox
          box={box}
          selected={selected}
          onSelect={onSelect}
          ref={ref}
          element={element}
          activeEngagement={activeEngagement}
          onUpdate={onUpdate}
          onDoubleClick={() => setEditing(true)}
        />
      )}
    </>
  );
}

function ImageStageElement({
  element: { id, imageUrl },
  className,
  styles,
  element,
  activeEngagement,
  editor,
  onUpdate,
  onSelect,
  selected,
}: {
  element: StageElementFragment;
  activeEngagement: StageEngagementFragment | null | undefined;
  editor: boolean;
  onUpdate: (element: StageElementFragment) => void;
  onSelect: StageState["setSelectedElementId"];
  selected: boolean;
  className: string;
  styles: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const box = pick(styles, ["width", "height", "top", "left"]);

  return (
    <>
      <div
        ref={ref}
        data-name="IMAGE_STAGE_ELEMENT"
        data-id={id}
        className={`
          ${className}
          ${editor ? "" : "transition-all duration-1000"}
        `}
        style={{
          ...styles,
          backgroundImage: `url(${imageUrl || ""})`,
        }}
        onClick={editor ? () => onSelect(id) : undefined}
      />
      {editor && (
        <StageElementBoundingBox
          box={box}
          selected={selected}
          onSelect={onSelect}
          ref={ref}
          element={element}
          activeEngagement={activeEngagement}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}
