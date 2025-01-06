import { useCallback, useMemo } from "react";
import { BackgroundSizePicker } from "@/components/BackgroundSizePicker";
import { BackgroundImageInput } from "./BackgroundImageInput";
import {
  updateStageElement,
  updateStageElementDraft,
} from "@/providers/StageStateProvider/actions";
import { useAdminStageState } from "@/providers/StageStateProvider/AdminStageStateContext";
import { createStyleUpdate } from "@/utils/createStyleUpdate";

export function ImageElementEditor({ elementId }: { elementId: string }) {
  const { state, dispatch } = useAdminStageState();
  const element = state.savedConfig.elements[elementId];

  const { backgroundSize } = useMemo(() => {
    const backgroundSize = state.activeEngagement
      ? element.engagementStyles.backgroundSize
      : element.defaultStyles.backgroundSize;
    return { backgroundSize };
  }, [state.activeEngagement, element]);

  const handleBackgroundSizeChange = useCallback(
    (size: string) => {
      const updates = createStyleUpdate(
        "backgroundSize",
        size,
        element,
        !!state.activeEngagement
      );
      dispatch(updateStageElement({ element: updates }));
    },
    [dispatch, element, state.activeEngagement]
  );

  return (
    <div
      data-name="IMAGE_ELEMENT_EDITOR"
      className={`flex flex-col gap-2 rounded-sm border p-2`}
    >
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
      <BackgroundSizePicker
        value={backgroundSize}
        onChange={handleBackgroundSizeChange}
      />
    </div>
  );
}
