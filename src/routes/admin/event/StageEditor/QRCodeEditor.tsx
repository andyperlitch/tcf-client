import { ColorPicker } from "@/components/ColorPicker";
import { Label } from "@/components/ui/label";
import {
  changeQRCodeForegroundColor,
  changeQRCodeBackgroundColor,
  changeQRCodeWrapperBackgroundColor,
} from "@/providers/StageStateProvider/actions";
import { useAdminStageState } from "@/providers/StageStateProvider/AdminStageStateContext";

export function QRCodeEditor() {
  const { state, dispatch } = useAdminStageState();

  return (
    <div data-name="QR_CODE_EDITOR" className="flex flex-col gap-2">
      <Label>QR Code</Label>
      {/* qrForegroundColor */}
      <div
        data-name="QR_CODE_FOREGROUND_COLOR"
        className={`flex items-center gap-2`}
      >
        <ColorPicker
          showAlpha
          trigger="square"
          picker="chrome"
          value={state.savedConfig?.qrForegroundColor || "rgba(0,0,0,1)"}
          onChange={(value) =>
            dispatch(changeQRCodeForegroundColor({ qrForegroundColor: value }))
          }
        />
        <Label>Foreground Color</Label>
      </div>
      {/* qrBackgroundColor */}
      <div
        data-name="QR_CODE_BACKGROUND_COLOR"
        className={`flex items-center gap-2`}
      >
        <ColorPicker
          trigger="square"
          picker="chrome"
          showAlpha
          value={state.savedConfig?.qrBackgroundColor || "rgba(255,255,255,1)"}
          onChange={(value) =>
            dispatch(changeQRCodeBackgroundColor({ qrBackgroundColor: value }))
          }
        />
        <Label>Background Color</Label>
      </div>
      {/* qrWrapperBackgroundColor */}
      <div
        data-name="QR_CODE_WRAPPER_BACKGROUND_COLOR"
        className={`flex items-center gap-2`}
      >
        <ColorPicker
          showAlpha
          trigger="square"
          picker="chrome"
          value={
            state.savedConfig?.qrWrapperBackgroundColor || "rgba(255,255,255,1)"
          }
          onChange={(value) =>
            dispatch(
              changeQRCodeWrapperBackgroundColor({
                qrWrapperBackgroundColor: value,
              })
            )
          }
        />
        <Label>Wrapper Background Color</Label>
      </div>
    </div>
  );
}
