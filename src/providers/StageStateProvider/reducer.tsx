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
  IMAGE_ELEMENT_IMAGE_PREVIEW_SET,
  SET_ACTIVE_ENGAGEMENT,
} from "./actions";
import { omit } from "lodash";

export const stageStateReducer = combineReducers<SharedStageState, ActionType>({
  savedConfig: savedConfigReducer,
  draftConfig: draftConfigReducer,
  selectedElementId: selectedElementIdReducer,
  activeEngagement: activeEngagementReducer,
});

function savedConfigReducer(
  state: SharedStageState["savedConfig"],
  action: ActionType
) {
  switch (action.type) {
    case TEXT_ELEMENT_ADDED: {
      const newSavedConfig = {
        ...state,
        elements: {
          ...state.elements,
          [action.payload.element.id]: action.payload.element,
        },
        elementOrder: [...state.elementOrder, action.payload.element.id],
      };
      return newSavedConfig;
    }
    case IMAGE_ELEMENT_ADDED: {
      const newSavedConfig = {
        ...state,
        elements: {
          ...state.elements,
          [action.payload.element.id]: action.payload.element,
        },
        elementOrder: [...state.elementOrder, action.payload.element.id],
      };
      return newSavedConfig;
    }
    case STAGE_ELEMENT_DELETED: {
      const newSavedConfig = {
        ...state,
        elements: omit(state.elements, action.payload.id),
        elementOrder: state.elementOrder.filter(
          (id) => id !== action.payload.id
        ),
      };
      return newSavedConfig;
    }
    case STAGE_ELEMENT_UPDATED: {
      const newSavedConfig = {
        ...state,
        elements: {
          ...state.elements,
          [action.payload.element.id]: {
            ...state.elements[action.payload.element.id],
            ...action.payload.element,
          },
        },
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
    case IMAGE_ELEMENT_IMAGE_PREVIEW_SET: {
      const { elementId, imageUrl } = action.payload;
      return {
        ...state,
        elements: {
          ...state.elements,
          [elementId]: {
            ...state.elements?.[elementId],
            imageUrl,
            id: elementId,
          },
        },
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

function activeEngagementReducer(
  state: SharedStageState["activeEngagement"],
  action: ActionType
) {
  switch (action.type) {
    case SET_ACTIVE_ENGAGEMENT: {
      return action.payload.engagement;
    }
    default:
      return state;
  }
}
