import {
  FanEngagementFragment,
  ScreenElementFragment,
  StageEngagementFragment,
} from "@/gql/graphql";
import { EngagementMode, ScreenDraftElement } from "@/types/screen";

// Text Element Actions
export const TEXT_ELEMENT_ADDED = "TEXT_ELEMENT_ADDED";
export interface AddTextElementAction {
  type: typeof TEXT_ELEMENT_ADDED;
  payload: {
    element: ScreenElementFragment;
  };
}
export const addTextElement = (
  payload: AddTextElementAction["payload"]
): AddTextElementAction => ({
  type: TEXT_ELEMENT_ADDED,
  payload,
});

// Image Element Actions
export const IMAGE_ELEMENT_ADDED = "IMAGE_ELEMENT_ADDED";
export interface AddImageElementAction {
  type: typeof IMAGE_ELEMENT_ADDED;
  payload: {
    element: ScreenElementFragment;
  };
}
export const addImageElement = (
  payload: AddImageElementAction["payload"]
): AddImageElementAction => ({
  type: IMAGE_ELEMENT_ADDED,
  payload,
});

// Stage Element Update Actions
export const SCREEN_ELEMENT_UPDATED = "SCREEN_ELEMENT_UPDATED";
export interface UpdateScreenElementAction {
  type: typeof SCREEN_ELEMENT_UPDATED;
  payload: {
    element: ScreenElementFragment;
  };
}
export const updateScreenElement = (
  payload: UpdateScreenElementAction["payload"]
): UpdateScreenElementAction => ({
  type: SCREEN_ELEMENT_UPDATED,
  payload,
});

export const SCREEN_ELEMENT_DRAFT_UPDATED = "SCREEN_ELEMENT_DRAFT_UPDATED";
export interface UpdateScreenElementDraftAction {
  type: typeof SCREEN_ELEMENT_DRAFT_UPDATED;
  payload: {
    element: ScreenDraftElement;
  };
}
export const updateScreenElementDraft = (
  payload: UpdateScreenElementDraftAction["payload"]
): UpdateScreenElementDraftAction => ({
  type: SCREEN_ELEMENT_DRAFT_UPDATED,
  payload,
});

export const SCREEN_ELEMENT_DELETED = "SCREEN_ELEMENT_DELETED";
export interface DeleteScreenElementAction {
  type: typeof SCREEN_ELEMENT_DELETED;
  payload: {
    id: string;
  };
}
export const deleteScreenElement = (
  payload: DeleteScreenElementAction["payload"]
): DeleteScreenElementAction => ({
  type: SCREEN_ELEMENT_DELETED,
  payload,
});

// Screen Element Select Actions
export const SCREEN_ELEMENT_SELECTED = "SCREEN_ELEMENT_SELECTED";
export interface SelectScreenElementAction {
  type: typeof SCREEN_ELEMENT_SELECTED;
  payload: {
    id: string | undefined | null;
  };
}
export const selectScreenElement = (
  payload: SelectScreenElementAction["payload"]
): SelectScreenElementAction => ({
  type: SCREEN_ELEMENT_SELECTED,
  payload,
});

// Background Preview Actions
export const BACKGROUND_PREVIEW_SET = "BACKGROUND_PREVIEW_SET";
export interface SetBackgroundPreviewAction {
  type: typeof BACKGROUND_PREVIEW_SET;
  payload: {
    backgroundImage: string | null;
  };
}
export const setBackgroundPreview = (
  payload: SetBackgroundPreviewAction["payload"]
): SetBackgroundPreviewAction => ({
  type: BACKGROUND_PREVIEW_SET,
  payload,
});

// Background Image Save Actions
export const BACKGROUND_IMAGE_SAVED = "BACKGROUND_IMAGE_SAVED";
export interface SaveBackgroundImageAction {
  type: typeof BACKGROUND_IMAGE_SAVED;
  payload: {
    backgroundImage: string | null;
  };
}
export const saveBackgroundImage = (
  payload: SaveBackgroundImageAction["payload"]
): SaveBackgroundImageAction => ({
  type: BACKGROUND_IMAGE_SAVED,
  payload,
});

// Default Font Actions
export const DEFAULT_FONT_CHANGED = "DEFAULT_FONT_CHANGED";
export interface ChangeDefaultFontAction {
  type: typeof DEFAULT_FONT_CHANGED;
  payload: {
    fontFamily: string[] | null | undefined;
  };
}
export const changeDefaultFont = (
  payload: ChangeDefaultFontAction["payload"]
): ChangeDefaultFontAction => ({
  type: DEFAULT_FONT_CHANGED,
  payload,
});

// Active Engagement Actions
export const SET_ACTIVE_ENGAGEMENT = "SET_ACTIVE_ENGAGEMENT";
export interface SetActiveEngagementAction {
  type: typeof SET_ACTIVE_ENGAGEMENT;
  payload: {
    engagement:
      | StageEngagementFragment
      | FanEngagementFragment
      | null
      | undefined;
  };
}
export const setActiveEngagement = (
  payload: SetActiveEngagementAction["payload"]
): SetActiveEngagementAction => ({
  type: SET_ACTIVE_ENGAGEMENT,
  payload,
});

// Engagement Mode Actions
export const SET_ENGAGEMENT_MODE = "SET_ENGAGEMENT_MODE";
export interface SetEngagementModeAction {
  type: typeof SET_ENGAGEMENT_MODE;
  payload: {
    mode: EngagementMode;
  };
}
export const setEngagementMode = (
  payload: SetEngagementModeAction["payload"]
): SetEngagementModeAction => ({
  type: SET_ENGAGEMENT_MODE,
  payload,
});

export type EventScreenAction =
  | AddTextElementAction
  | AddImageElementAction
  | UpdateScreenElementAction
  | UpdateScreenElementDraftAction
  | DeleteScreenElementAction
  | SelectScreenElementAction
  | SetActiveEngagementAction
  | SetBackgroundPreviewAction
  | SaveBackgroundImageAction
  | ChangeDefaultFontAction
  | SetEngagementModeAction;
