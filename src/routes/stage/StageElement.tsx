import { StageElementFragment, StageEngagementFragment } from "@/gql/graphql";
import { useRef, useState } from "react";
import { StageElementBoundingBox } from "./StageElementBoundingBox";
import { StageState } from "./useStageState";
import { EditableTextarea } from "@/components/EditableTextarea";

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

  let children: React.ReactNode = text;

  const [editing, setEditing] = useState(false);

  if (editor) {
    children = (
      <>
        <EditableTextarea
          value={text || ""}
          setValue={(value) => onUpdate({ ...element, text: value })}
          element="div"
          editing={editing}
          setEditing={setEditing}
          showConfirmCancel={false}
          textareaClassName="border-none outline-none"
        />
        <StageElementBoundingBox
          selected={selected}
          onSelect={onSelect}
          element={element}
          activeEngagement={activeEngagement}
          elementRef={ref}
          onUpdate={onUpdate}
          onDoubleClick={() => setEditing(true)}
        />
      </>
    );
  }

  return (
    <div
      ref={ref}
      data-name="TEXT_STAGE_ELEMENT"
      data-id={id}
      className={`
        ${className}

        font-stage
      `}
      style={styles}
      onClick={editor ? () => onSelect(id) : undefined}
    >
      {children}
    </div>
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

  return (
    <div
      ref={ref}
      data-name="IMAGE_STAGE_ELEMENT"
      data-id={id}
      className={className}
      style={{
        ...styles,
        backgroundImage: `url(${imageUrl || ""})`,
      }}
      onClick={editor ? () => onSelect(id) : undefined}
    >
      {editor && (
        <StageElementBoundingBox
          selected={selected}
          onSelect={onSelect}
          elementRef={ref}
          element={element}
          activeEngagement={activeEngagement}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}
