import { BackgroundImageInput } from "@/components/BackgroundImageInput";
import { FontPicker } from "@/components/FontPicker";
import { ScreenElementEditor } from "@/components/ScreenElementEditor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AdminEventFragment } from "@/gql/graphql";
import { useAdminFanState } from "@/providers/FanStateProvider/AdminFanStateContext";
import {
  addImageElement,
  addTextElement,
  changeDefaultFont,
  deleteScreenElement,
  saveBackgroundImage,
  setBackgroundPreview,
  setEngagementMode,
} from "@/providers/sharedActions";
import { ImageIcon } from "@radix-ui/react-icons";
import { TextIcon } from "@radix-ui/react-icons";
import { useHotkeys } from "@shelf/hotkeys";
import { forwardRef, useCallback } from "react";
import {
  createDefaultFanImageElement,
  createDefaultFanTextElement,
} from "./utils";
import { EngagementMode } from "@/types/screen";
import { EngagementModeSwitcher } from "@/components/EngagementModeSwitcher";

export const FanEditor = forwardRef<
  HTMLIFrameElement,
  { event: AdminEventFragment }
>(function FanEditor({ event }, ref) {
  const { state, dispatch } = useAdminFanState();

  useHotkeys({
    Backspace: useCallback(() => {
      if (state.selectedElementId) {
        dispatch(deleteScreenElement({ id: state.selectedElementId }));
      }
    }, [state.selectedElementId, dispatch]),
  });

  return (
    <div className="flex gap-2" data-name="FAN_EDITOR">
      <div
        data-name="IFRAME_WRAPPER"
        className={`flex flex-1 items-center justify-center`}
      >
        <iframe
          id="fan-preview"
          src={`/e/${event.slug}?editor=true`}
          className={`relative aspect-portrait h-[1080px]`}
          ref={ref}
        ></iframe>
      </div>
      <div
        data-name="STAGE_EDITOR_TOOLBAR"
        className="flex w-1/3 flex-col gap-4"
      >
        {/* active engagement */}
        <EngagementModeSwitcher
          value={state.engagementMode}
          onChange={useCallback(
            (mode: EngagementMode) => {
              dispatch(setEngagementMode({ mode }));
            },
            [dispatch]
          )}
        />
        <BackgroundImageInput
          imageUrl={event.fanConfig?.backgroundImage}
          onPreview={useCallback(
            (imageUrl) => {
              dispatch(setBackgroundPreview({ backgroundImage: imageUrl }));
            },
            [dispatch]
          )}
          onSave={useCallback(
            (imageUrl) => {
              dispatch(saveBackgroundImage({ backgroundImage: imageUrl }));
            },
            [dispatch]
          )}
        />
        <FontPicker
          label="Default Font"
          title="Default Font"
          description={[
            `Select the fonts you want to use by default.`,
            `You can browse Google Fonts or add your own custom fonts.`,
            `You may override this on a per-element basis.`,
          ].join(" ")}
          value={state.savedConfig?.fontFamily || event.stageConfig?.fontFamily}
          onChange={useCallback(
            (fontFamily) => {
              dispatch(changeDefaultFont({ fontFamily }));
            },
            [dispatch]
          )}
        />
        <div data-name="STAGE_ELEMENTS_LIST">
          <Label>Screen Elements</Label>
          <div className="mb-2 flex flex-col gap-2">
            {state.savedConfig?.elementOrder.map((elementId) => (
              <ScreenElementEditor
                key={elementId}
                elementId={elementId}
                state={state}
                dispatch={dispatch}
                enableLink
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={useCallback(() => {
                dispatch(
                  addTextElement({ element: createDefaultFanTextElement() })
                );
              }, [dispatch])}
              variant="advisory"
            >
              <TextIcon className="mr-2" /> Add text element
            </Button>
            <Button
              size="sm"
              onClick={useCallback(() => {
                dispatch(
                  addImageElement({
                    element: createDefaultFanImageElement(),
                  })
                );
              }, [dispatch])}
              variant="constructive"
            >
              <ImageIcon className="mr-2" /> Add image element
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
