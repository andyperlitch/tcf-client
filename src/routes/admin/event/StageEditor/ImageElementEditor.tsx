import { BackgroundImageInput } from "./BackgroundImageInput";
import {
  updateStageElement,
  updateStageElementDraft,
} from "@/providers/StageStateProvider/actions";
import { useAdminStageState } from "@/providers/StageStateProvider/AdminStageStateContext";

export function ImageElementEditor({ elementId }: { elementId: string }) {
  const { state, dispatch } = useAdminStageState();
  const element = state.savedConfig.elements[elementId];
  return (
    <div data-name="IMAGE_ELEMENT_EDITOR" className="rounded-sm border p-2">
      <BackgroundImageInput
        imageUrl={element.imageUrl}
        onPreview={(imageUri) => {
          dispatch(
            updateStageElementDraft({
              element: { id: elementId, imageUrl: imageUri },
            })
          );
        }}
        onSave={(url) => {
          dispatch(
            updateStageElement({ element: { ...element, imageUrl: url } })
          );
        }}
        label="Image Source"
      />
    </div>
  );
}
