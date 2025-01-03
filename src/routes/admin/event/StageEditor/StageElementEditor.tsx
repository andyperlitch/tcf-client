import { EditableText } from "@/components/EditableText";
import { StageElementFragment, StageEngagementFragment } from "@/gql/graphql";
import { TextElementEditor } from "./TextElementEditor";
import { ImageIcon, TextIcon, TrashIcon } from "@radix-ui/react-icons";
import { ImageElementEditor } from "./ImageElementEditor";
import { Button } from "@/components/ui/button";

const TYPE_META: Record<
  string,
  {
    Icon: React.ElementType;
    Editor: React.ElementType<{
      element: StageElementFragment;
      onUpdate: (element: StageElementFragment) => void;
      activeEngagement: StageEngagementFragment | null | undefined;
    }>;
  }
> = {
  text: {
    Icon: TextIcon,
    Editor: TextElementEditor,
  },
  image: {
    Icon: ImageIcon,
    Editor: ImageElementEditor,
  },
};

export default function StageElementEditor({
  element,
  onUpdate,
  onDelete,
  selected,
  onSelect,
  activeEngagement,
}: {
  element: StageElementFragment;
  onUpdate: (element: StageElementFragment) => void;
  onDelete: (id: string) => void;
  selected: boolean;
  onSelect: (id: string | undefined) => void;
  activeEngagement: StageEngagementFragment | null | undefined;
}) {
  const { type } = element;
  const { Icon, Editor } = TYPE_META[type];
  return (
    <div
      data-name="STAGE_ELEMENT_EDITOR"
      className={`
        rounded-sm border p-2

        ${selected ? "border-white" : "border-white/20"}
      `}
      onClick={() => onSelect(element.id)}
    >
      <div
        data-name="STAGE_ELEMENT_EDITOR_HEADER"
        className={`
          flex items-center justify-between gap-2

          ${selected ? `border-b pb-2` : ""}
        `}
      >
        <div className="flex items-center gap-2">
          <div className="mr-2" title="Text element">
            <Icon />
          </div>
          <EditableText
            locked={!selected}
            showConfirmCancel={false}
            cancelOnBlur
            className="text-sm"
            placeholder="(unnamed)"
            value={element.name || ""}
            setValue={(value) => {
              onUpdate({
                ...element,
                name: value,
              });
            }}
            element="div"
          />
        </div>
        <Button
          size="sm"
          type="button"
          variant="destructive"
          onClick={() => onDelete(element.id)}
        >
          <TrashIcon />
        </Button>
      </div>
      {selected && (
        <Editor
          element={element}
          onUpdate={onUpdate}
          activeEngagement={activeEngagement}
        />
      )}
    </div>
  );
}
