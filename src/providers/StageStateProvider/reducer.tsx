import { SharedStageState } from "@/types/stage";
import { combineReducers } from "@/utils/combineReducers";
import {
  ActionType,
  BACKGROUND_PREVIEW_SET,
  TEXT_ELEMENT_ADDED,
  DEFAULT_FONT_CHANGED,
  STAGE_ELEMENT_DELETED,
  STAGE_ELEMENT_UPDATED,
  IMAGE_ELEMENT_ADDED,
  STAGE_ELEMENT_SELECTED,
  BACKGROUND_IMAGE_SAVED,
} from "./actions";

export const stageStateReducer = combineReducers<SharedStageState, ActionType>({
  savedConfig: savedConfigReducer,
  draftConfig: draftConfigReducer,
  selectedElementId: selectedElementIdReducer,
});

function savedConfigReducer(
  state: SharedStageState["savedConfig"],
  action: ActionType
) {
  switch (action.type) {
    case TEXT_ELEMENT_ADDED: {
      const newSavedConfig = {
        ...state,
        elements: [...(state.elements || []), action.payload.element],
      };
      return newSavedConfig;
    }
    case STAGE_ELEMENT_DELETED: {
      const newSavedConfig = {
        ...state,
        elements: state.elements?.filter((e) => e.id !== action.payload.id),
      };
      return newSavedConfig;
    }
    case STAGE_ELEMENT_UPDATED: {
      const newSavedConfig = {
        ...state,
        elements: state.elements?.map((e) =>
          e.id === action.payload.element.id ? action.payload.element : e
        ),
      };
      return newSavedConfig;
    }
    case DEFAULT_FONT_CHANGED: {
      return {
        ...state,
        fontFamily: action.payload.fontFamily,
      };
    }
    case BACKGROUND_IMAGE_SAVED: {
      return {
        ...state,
        backgroundImage: action.payload.backgroundImage,
      };
    }

    default:
      return state;
  }
}

function draftConfigReducer(
  state: SharedStageState["draftConfig"],
  action: ActionType
) {
  switch (action.type) {
    case BACKGROUND_PREVIEW_SET: {
      return {
        ...state,
        backgroundImage: action.payload.backgroundImage,
      };
    }
    case BACKGROUND_IMAGE_SAVED: {
      return {
        ...state,
        backgroundImage: undefined,
      };
    }
    default:
      return state;
  }
}

function selectedElementIdReducer(
  state: SharedStageState["selectedElementId"],
  action: ActionType
) {
  switch (action.type) {
    case TEXT_ELEMENT_ADDED: {
      return action.payload.element.id;
    }
    case IMAGE_ELEMENT_ADDED: {
      return action.payload.element.id;
    }
    case STAGE_ELEMENT_SELECTED: {
      return action.payload.id;
    }
    default:
      return state;
  }
}
