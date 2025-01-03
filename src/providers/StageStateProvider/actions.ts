import { StageElementFragment } from "@/gql/graphql";

// Text Element Actions
export const TEXT_ELEMENT_ADDED = "TEXT_ELEMENT_ADDED";
interface AddTextElementAction {
  type: typeof TEXT_ELEMENT_ADDED;
  payload: {
    element: {
      id: string;
      name: string;
      type: "text";
      text: string;
      fontFamily?: string[];
      defaultClassNames: string;
      engagementClassNames: string;
      defaultStyles: {
        color: string;
        fontSize: string;
        width: string;
        height: string;
      };
      engagementStyles: {
        color: string;
        fontSize: string;
        width: string;
        height: string;
      };
    };
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
interface AddImageElementAction {
  type: typeof IMAGE_ELEMENT_ADDED;
  payload: {
    element: {
      id: string;
      type: "image";
      name: string;
      imageUrl: string;
      defaultStyles: {
        width: string;
        height: string;
        backgroundSize: string;
        backgroundPosition: string;
        backgroundRepeat: string;
      };
      engagementStyles: {
        width: string;
        height: string;
        backgroundSize: string;
        backgroundPosition: string;
        backgroundRepeat: string;
      };
    };
  };
}
export const addImageElement = (
  payload: AddImageElementAction["payload"]
): AddImageElementAction => ({
  type: IMAGE_ELEMENT_ADDED,
  payload,
});

// Stage Element Update Actions
export const STAGE_ELEMENT_UPDATED = "STAGE_ELEMENT_UPDATED";
interface UpdateStageElementAction {
  type: typeof STAGE_ELEMENT_UPDATED;
  payload: {
    element: StageElementFragment;
  };
}
export const updateStageElement = (
  payload: UpdateStageElementAction["payload"]
): UpdateStageElementAction => ({
  type: STAGE_ELEMENT_UPDATED,
  payload,
});

// Stage Element Delete Actions
export const STAGE_ELEMENT_DELETED = "STAGE_ELEMENT_DELETED";
interface DeleteStageElementAction {
  type: typeof STAGE_ELEMENT_DELETED;
  payload: {
    id: string;
  };
}
export const deleteStageElement = (
  payload: DeleteStageElementAction["payload"]
): DeleteStageElementAction => ({
  type: STAGE_ELEMENT_DELETED,
  payload,
});

// Background Preview Actions
export const BACKGROUND_PREVIEW_SET = "BACKGROUND_PREVIEW_SET";
interface SetBackgroundPreviewAction {
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
interface SaveBackgroundImageAction {
  type: typeof BACKGROUND_IMAGE_SAVED;
  payload: {
    backgroundImage: string;
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
interface ChangeDefaultFontAction {
  type: typeof DEFAULT_FONT_CHANGED;
  payload: {
    fontFamily: string[];
  };
}
export const changeDefaultFont = (
  payload: ChangeDefaultFontAction["payload"]
): ChangeDefaultFontAction => ({
  type: DEFAULT_FONT_CHANGED,
  payload,
});

// Stage Element Select Actions
export const STAGE_ELEMENT_SELECTED = "STAGE_ELEMENT_SELECTED";
interface SelectStageElementAction {
  type: typeof STAGE_ELEMENT_SELECTED;
  payload: {
    id: string | undefined | null;
  };
}
export const selectStageElement = (
  payload: SelectStageElementAction["payload"]
): SelectStageElementAction => ({
  type: STAGE_ELEMENT_SELECTED,
  payload,
});

// Create the union type for all actions
export type ActionType =
  | AddTextElementAction
  | AddImageElementAction
  | UpdateStageElementAction
  | DeleteStageElementAction
  | SetBackgroundPreviewAction
  | SaveBackgroundImageAction
  | ChangeDefaultFontAction
  | SelectStageElementAction;
