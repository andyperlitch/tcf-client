import { EditableText } from "@/components/EditableText";
import { StageElementFragment } from "@/gql/graphql";
import { TextIcon } from "@radix-ui/react-icons";

export function TextElementEditor({
  element,
}: {
  element: StageElementFragment;
}) {
  return (
    <div data-name="TEXT_ELEMENT_EDITOR" className="rounded-sm border p-2">
      <div className="flex items-center gap-2">
        <div className="mr-2" title="Text element">
          <TextIcon />
        </div>
        <EditableText
          showConfirmCancel={false}
          className="text-sm"
          placeholder="(unnamed)"
          value={element.name || ""}
          setValue={(value) => {
            console.log(value);
          }}
          element="div"
        />
      </div>
    </div>
  );
}
