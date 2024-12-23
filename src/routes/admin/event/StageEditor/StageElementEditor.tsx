import { EditableText } from "@/components/EditableText";
import { StageElementFragment } from "@/gql/graphql";
import { TextElementEditor } from "./TextElementEditor";
import { ImageIcon, TextIcon, TrashIcon } from "@radix-ui/react-icons";
import { ImageElementEditor } from "./ImageElementEditor";
import { InlineConfirmButton } from "@/components/InlineConfirmButton";

const TYPE_META: Record<
  string,
  {
    Icon: React.ElementType;
    Editor: React.ElementType;
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
}: {
  element: StageElementFragment;
  onUpdate: (element: StageElementFragment) => void;
  onDelete: (element: StageElementFragment) => void;
  selected: boolean;
  onSelect: (id: string | undefined) => void;
}) {
  const { type } = element;
  const { Icon } = TYPE_META[type];
  return (
    <div
      data-name="STAGE_ELEMENT_EDITOR"
      className={`
        rounded-sm border p-2

        ${selected ? "border-white" : "border-white/20"}
      `}
      onClick={() => onSelect(element.id)}
    >
      <div className="flex items-center justify-between gap-2">
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
        <InlineConfirmButton
          size="sm"
          variant="destructive"
          onConfirm={() => Promise.resolve(onDelete(element))}
        >
          <TrashIcon />
        </InlineConfirmButton>
      </div>
    </div>
  );
}
