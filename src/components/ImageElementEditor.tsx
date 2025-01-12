import { useCallback, useMemo, useState } from "react";
import { BackgroundSizePicker } from "@/components/BackgroundSizePicker";
import { BackgroundImageInput } from "./BackgroundImageInput";
import {
  updateScreenElement,
  updateScreenElementDraft,
} from "@/providers/sharedActions";
import { createStyleUpdate } from "@/utils/createStyleUpdate";
import { ScreenElementEditorProps } from "@/types/screen";
import { LinkInput } from "./LinkInput";
import { Button } from "./ui/button";
import { isEngagementActive } from "@/utils/isEngagementActive";

export function ImageElementEditor({
  elementId,
  dispatch,
  state,
  enableLink,
}: ScreenElementEditorProps) {
  const element = state.savedConfig.elements[elementId];
  const engagementIsActive = isEngagementActive(state);

  const [addLink, setAddLink] = useState(
    Boolean(element.linkHref && element.linkHref.length > 0)
  );

  const { backgroundSize } = useMemo(() => {
    const backgroundSize = engagementIsActive
      ? element.engagementStyles.backgroundSize
      : element.defaultStyles.backgroundSize;
    return { backgroundSize };
  }, [engagementIsActive, element]);

  const handleBackgroundSizeChange = useCallback(
    (size: string) => {
      const updates = createStyleUpdate(
        "backgroundSize",
        size,
        element,
        engagementIsActive
      );
      dispatch(updateScreenElement({ element: updates }));
    },
    [dispatch, element, engagementIsActive]
  );

  const setLinkHref = useCallback(
    (value: string) => {
      dispatch(
        updateScreenElement({ element: { ...element, linkHref: value } })
      );
    },
    [dispatch, element]
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
            updateScreenElementDraft({
              element: { id: elementId, imageUrl: imageUri },
            })
          );
        }}
        onSave={(url) => {
          dispatch(
            updateScreenElement({ element: { ...element, imageUrl: url } })
          );
        }}
        label="Image Source"
      />
      <BackgroundSizePicker
        value={backgroundSize}
        onChange={handleBackgroundSizeChange}
      />
      {enableLink && (
        <div data-name="LINK_EDITOR">
          {addLink ? (
            <LinkInput value={element.linkHref || ""} onChange={setLinkHref} />
          ) : (
            <Button variant="link" onClick={() => setAddLink(true)}>
              Add Link
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
