import { EditableText } from "@/components/EditableText";
import { StageElementFragment } from "@/gql/graphql";
import { ImageIcon } from "@radix-ui/react-icons";

export function ImageElementEditor({
  element,
}: {
  element: StageElementFragment;
}) {
  return (
    <div data-name="IMAGE_ELEMENT_EDITOR" className="rounded-sm border p-2">
      <div className="flex items-center gap-2">
        <div className="mr-2" title="Image element">
          <ImageIcon />
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
