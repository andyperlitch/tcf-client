import { EditableText } from "@/components/EditableText";
import { TextElementEditor } from "./TextElementEditor";
import { ImageIcon, TextIcon, TrashIcon } from "@radix-ui/react-icons";
import { ImageElementEditor } from "./ImageElementEditor";
import { Button } from "@/components/ui/button";
import { useAdminStageState } from "@/providers/StageStateProvider/AdminStageStateContext";
import {
  deleteStageElement,
  selectStageElement,
  updateStageElement,
} from "@/providers/StageStateProvider/actions";

const TYPE_META: Record<
  string,
  {
    Icon: React.ElementType;
    Editor: React.ElementType<{
      elementId: string;
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
  elementId,
}: {
  elementId: string;
}) {
  const { state, dispatch } = useAdminStageState();
  const element = state.savedConfig.elements[elementId];
  const selected = state.selectedElementId === elementId;
  const { type } = element;
  const { Icon, Editor } = TYPE_META[type];
  return (
    <div
      data-name="STAGE_ELEMENT_EDITOR"
      className={`
        rounded-sm border p-2

        ${selected ? "border-white" : "border-white/20"}
      `}
      onClick={() => dispatch(selectStageElement({ id: elementId }))}
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
              dispatch(
                updateStageElement({
                  element: {
                    ...element,
                    name: value,
                  },
                })
              );
            }}
            element="div"
          />
        </div>
        <Button
          size="sm"
          type="button"
          variant="destructive"
          onClick={() => dispatch(deleteStageElement({ id: elementId }))}
        >
          <TrashIcon />
        </Button>
      </div>
      {selected && <Editor elementId={elementId} />}
    </div>
  );
}
