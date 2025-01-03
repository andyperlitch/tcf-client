import { AdminEventFragment, EventStageConfig } from "@/gql/graphql";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { ImageIcon, TextIcon } from "@radix-ui/react-icons";
import { useAdminStageState } from "./useAdminStageState";
import { BackgroundImageInput } from "./BackgroundImageInput";
import StageElementEditor from "./StageElementEditor";
import { useStageElementHandlers } from "./useStageElementHandlers";
import { FontPicker } from "@/components/FontPicker";

const defaultConfig: EventStageConfig = {
  elements: [],
};

export function StageEditor({ event }: { event: AdminEventFragment }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { state, dispatch } = useAdminStageState({
    initialConfig: event.stageConfig || defaultConfig,
    eventId: event.id,
    iframeRef,
  });

  const handlers = useStageElementHandlers({ dispatch });

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
        {/* font picker */}
        <FontPicker
          label="Default Font"
          title="Default Font"
          description={[
            `Select the fonts you want to use by default.`,
            `You can browse Google Fonts or add your own custom fonts.`,
            `You may override this on a per-element basis.`,
          ].join(" ")}
          value={state.savedConfig?.fontFamily}
          onChange={handlers.handleFontChange}
        />

        <BackgroundImageInput
          imageUrl={event.stageConfig?.backgroundImage}
          onPreview={handlers.handleBackgroundPreview}
          onSave={handlers.handleBackgroundSave}
        />

        <div data-name="STAGE_ELEMENTS_LIST">
          <Label>Stage elements</Label>
          <div className="mb-2 flex flex-col gap-2">
            {state.savedConfig?.elements?.map((element) => (
              <StageElementEditor
                key={element.id}
                element={element}
                onUpdate={handlers.handleUpdateElement}
                onDelete={handlers.handleDeleteElement}
                selected={state.selectedElementId === element.id}
                onSelect={handlers.handleSelectElement}
                activeEngagement={event.activeEngagement}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handlers.handleNewTextElement}
              variant="advisory"
            >
              <TextIcon className="mr-2" /> Add text element
            </Button>
            <Button
              size="sm"
              onClick={handlers.handleNewImageElement}
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
