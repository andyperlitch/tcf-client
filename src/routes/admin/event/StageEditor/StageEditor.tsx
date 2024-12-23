import { AdminEventFragment, EventStageConfig } from "@/gql/graphql";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCallback, useRef } from "react";
import { ImageIcon, TextIcon } from "@radix-ui/react-icons";
import { useAdminStageState } from "./useAdminStageState";
import { useOnSave } from "./useOnSave";
import { BackgroundImageInput } from "./BackgroundImageInput";
import StageElementEditor from "./StageElementEditor";
import { useStageElementHandlers } from "./useStageElementHandlers";

const defaultConfig: EventStageConfig = {
  elements: [],
};

export function StageEditor({ event }: { event: AdminEventFragment }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const {
    stageConfig,
    setSavedConfig,
    setDraftConfig,
    setSelectedElementId,
    selectedElementId,
  } = useAdminStageState({
    initialConfig: event.stageConfig || defaultConfig,
    onSave: useOnSave(event.id),
    iframeRef,
  });

  const {
    handleNewTextElement,
    handleNewImageElement,
    handleUpdateElement,
    handleDeleteElement,
  } = useStageElementHandlers({
    setSavedConfig,
    setSelectedElementId,
    selectedElementId,
  });

  const handleBackgroundPreview = useCallback(
    (uri: string | null) => {
      setDraftConfig((prev) => ({
        ...prev,
        backgroundImage: uri,
      }));
    },
    [setDraftConfig]
  );

  const handleBackgroundSave = useCallback(
    (url: string) => {
      setSavedConfig((prev) => ({
        ...prev,
        backgroundImage: url,
      }));
    },
    [setSavedConfig]
  );

  console.log(`andy stageConfig.elements`, stageConfig.elements);

  return (
    <div className="flex gap-2" data-name="STAGE_EDITOR">
      <iframe
        id="stage-preview"
        src={`/stage/${event.slug}?editor=true`}
        className={`
          relative aspect-video h-full max-h-[1080px] w-full max-w-[1920px]
        `}
        ref={iframeRef}
      ></iframe>
      <div
        data-name="STAGE_EDITOR_TOOLBAR"
        className="flex w-1/3 flex-col gap-4"
      >
        <BackgroundImageInput
          imageUrl={event.stageConfig?.backgroundImage}
          onPreview={handleBackgroundPreview}
          onSave={handleBackgroundSave}
        />

        <div data-name="STAGE_ELEMENTS_LIST">
          <Label>Stage elements</Label>
          <div className="mb-2 flex flex-col gap-2">
            {stageConfig.elements?.map((element) => (
              <StageElementEditor
                key={element.id}
                element={element}
                onUpdate={handleUpdateElement}
                onDelete={handleDeleteElement}
                selected={selectedElementId === element.id}
                onSelect={setSelectedElementId}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleNewTextElement} variant="advisory">
              <TextIcon className="mr-2" /> Add text element
            </Button>
            <Button
              size="sm"
              onClick={handleNewImageElement}
              variant="constructive"
            >
              <ImageIcon className="mr-2" /> Add image element
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
