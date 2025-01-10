import { AdminEventFragment } from "@/gql/graphql";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { forwardRef, useCallback } from "react";
import { ImageIcon, TextIcon } from "@radix-ui/react-icons";
import { BackgroundImageInput } from "../../../../components/BackgroundImageInput";
import { ScreenElementEditor } from "../../../../components/ScreenElementEditor";
import { FontPicker } from "@/components/FontPicker";
import { useHotkeys } from "@shelf/hotkeys";
import { useAdminStageState } from "@/providers/StageStateProvider/AdminStageStateContext";
import { QRCodeEditor } from "./QRCodeEditor";
import {
  changeDefaultFont,
  deleteScreenElement,
  saveBackgroundImage,
  setBackgroundPreview,
  addTextElement,
  addImageElement,
} from "@/providers/sharedActions";
import {
  createDefaultStageImageElement,
  createDefaultStageTextElement,
} from "./utils";

export const StageEditor = forwardRef<
  HTMLIFrameElement,
  { event: AdminEventFragment }
>(function StageEditor({ event }, ref) {
  const { state, dispatch } = useAdminStageState();

  useHotkeys({
    Backspace: useCallback(() => {
      if (state.selectedElementId) {
        dispatch(deleteScreenElement({ id: state.selectedElementId }));
      }
    }, [state.selectedElementId, dispatch]),
  });

  return (
    <div className="flex gap-2" data-name="STAGE_EDITOR">
      <iframe
        id="stage-preview"
        src={`/stage/${event.slug}?editor=true`}
        className={`
          relative aspect-video h-full max-h-[1080px] w-full max-w-[1920px]
        `}
        ref={ref}
      ></iframe>
      <div
        data-name="STAGE_EDITOR_TOOLBAR"
        className="flex w-1/3 flex-col gap-4"
      >
        {/* active engagement */}
        {/* <ActiveEngagementMode /> */}
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
          onChange={useCallback(
            (fontFamily) => {
              dispatch(changeDefaultFont({ fontFamily }));
            },
            [dispatch]
          )}
        />

        <BackgroundImageInput
          imageUrl={event.stageConfig?.backgroundImage}
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

        <QRCodeEditor />

        <div data-name="STAGE_ELEMENTS_LIST">
          <Label>Stage elements</Label>
          <div className="mb-2 flex flex-col gap-2">
            {state.savedConfig?.elementOrder.map((elementId) => (
              <ScreenElementEditor
                key={elementId}
                elementId={elementId}
                state={state}
                dispatch={dispatch}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={useCallback(() => {
                dispatch(
                  addTextElement({ element: createDefaultStageTextElement() })
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
                  addImageElement({ element: createDefaultStageImageElement() })
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
