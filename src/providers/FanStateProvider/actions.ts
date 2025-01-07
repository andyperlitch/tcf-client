import {
  AddTextElementAction,
  AddImageElementAction,
  UpdateScreenElementAction,
  DeleteScreenElementAction,
  SetBackgroundPreviewAction,
  SaveBackgroundImageAction,
  ChangeDefaultFontAction,
  SelectScreenElementAction,
  SetActiveEngagementAction,
  UpdateScreenElementDraftAction,
} from "../sharedActions";

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
  | UpdateScreenElementDraftAction;
