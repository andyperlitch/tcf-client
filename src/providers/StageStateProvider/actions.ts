import {
  AddImageElementAction,
  UpdateScreenElementDraftAction,
  SetActiveEngagementAction,
  SelectScreenElementAction,
  ChangeDefaultFontAction,
  SaveBackgroundImageAction,
  SetBackgroundPreviewAction,
  DeleteScreenElementAction,
  UpdateScreenElementAction,
  AddTextElementAction,
  SetEngagementModeAction,
} from "../sharedActions";

// QR Code Actions
export const QR_CODE_FOREGROUND_COLOR_CHANGED =
  "QR_CODE_FOREGROUND_COLOR_CHANGED";
interface ChangeQRCodeForegroundColorAction {
  type: typeof QR_CODE_FOREGROUND_COLOR_CHANGED;
  payload: {
    qrForegroundColor: string;
  };
}
export const changeQRCodeForegroundColor = (
  payload: ChangeQRCodeForegroundColorAction["payload"]
): ChangeQRCodeForegroundColorAction => ({
  type: QR_CODE_FOREGROUND_COLOR_CHANGED,
  payload,
});

// QR Code Background Color Actions
export const QR_CODE_BACKGROUND_COLOR_CHANGED =
  "QR_CODE_BACKGROUND_COLOR_CHANGED";
interface ChangeQRCodeBackgroundColorAction {
  type: typeof QR_CODE_BACKGROUND_COLOR_CHANGED;
  payload: {
    qrBackgroundColor: string;
  };
}
export const changeQRCodeBackgroundColor = (
  payload: ChangeQRCodeBackgroundColorAction["payload"]
): ChangeQRCodeBackgroundColorAction => ({
  type: QR_CODE_BACKGROUND_COLOR_CHANGED,
  payload,
});

// QR Code Wrapper Background Color Actions
export const QR_CODE_WRAPPER_BACKGROUND_COLOR_CHANGED =
  "QR_CODE_WRAPPER_BACKGROUND_COLOR_CHANGED";
interface ChangeQRCodeWrapperBackgroundColorAction {
  type: typeof QR_CODE_WRAPPER_BACKGROUND_COLOR_CHANGED;
  payload: {
    qrWrapperBackgroundColor: string;
  };
}
export const changeQRCodeWrapperBackgroundColor = (
  payload: ChangeQRCodeWrapperBackgroundColorAction["payload"]
): ChangeQRCodeWrapperBackgroundColorAction => ({
  type: QR_CODE_WRAPPER_BACKGROUND_COLOR_CHANGED,
  payload,
});

// Create the union type for all actions
export type ActionType =
  | AddTextElementAction
  | AddImageElementAction
  | UpdateScreenElementAction
  | DeleteScreenElementAction
  | SetBackgroundPreviewAction
  | SaveBackgroundImageAction
  | ChangeDefaultFontAction
  | SelectScreenElementAction
  | SetActiveEngagementAction
  | UpdateScreenElementDraftAction
  | ChangeQRCodeForegroundColorAction
  | ChangeQRCodeBackgroundColorAction
  | ChangeQRCodeWrapperBackgroundColorAction
  | SetEngagementModeAction;
