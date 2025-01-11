import { SharedFanState, SharedStageState } from "@/types/screen";
import { combineReducers } from "@/utils/combineReducers";
import {
  ActionType,
  QR_CODE_FOREGROUND_COLOR_CHANGED,
  QR_CODE_BACKGROUND_COLOR_CHANGED,
  QR_CODE_WRAPPER_BACKGROUND_COLOR_CHANGED,
} from "./actions";
import {
  BACKGROUND_PREVIEW_SET,
  TEXT_ELEMENT_ADDED,
  DEFAULT_FONT_CHANGED,
  SCREEN_ELEMENT_DELETED,
  SCREEN_ELEMENT_UPDATED,
  IMAGE_ELEMENT_ADDED,
  SCREEN_ELEMENT_SELECTED,
  BACKGROUND_IMAGE_SAVED,
  SET_ACTIVE_ENGAGEMENT,
  SCREEN_ELEMENT_DRAFT_UPDATED,
  SET_ENGAGEMENT_MODE,
} from "../sharedActions";
import { omit } from "lodash";

export const stageStateReducer = combineReducers<SharedStageState, ActionType>({
  savedConfig: savedConfigReducer,
  draftConfig: draftConfigReducer,
  selectedElementId: selectedElementIdReducer,
  activeEngagement: activeEngagementReducer,
  engagementMode: engagementModeReducer,
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
    case SCREEN_ELEMENT_DELETED: {
      const newSavedConfig = {
        ...state,
        elements: omit(state.elements, action.payload.id),
        elementOrder: state.elementOrder.filter(
          (id) => id !== action.payload.id
        ),
      };
      return newSavedConfig;
    }
    case SCREEN_ELEMENT_UPDATED: {
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
        fontFamily: action.payload.fontFamily ?? [],
      };
    }
    case BACKGROUND_IMAGE_SAVED: {
      return {
        ...state,
        backgroundImage: action.payload.backgroundImage,
      };
    }
    case QR_CODE_FOREGROUND_COLOR_CHANGED: {
      return {
        ...state,
        qrForegroundColor: action.payload.qrForegroundColor,
      };
    }
    case QR_CODE_BACKGROUND_COLOR_CHANGED: {
      return {
        ...state,
        qrBackgroundColor: action.payload.qrBackgroundColor,
      };
    }
    case QR_CODE_WRAPPER_BACKGROUND_COLOR_CHANGED: {
      return {
        ...state,
        qrWrapperBackgroundColor: action.payload.qrWrapperBackgroundColor,
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
    case SCREEN_ELEMENT_DRAFT_UPDATED: {
      const { element } = action.payload;
      return {
        ...state,
        elements: {
          ...state.elements,
          [element.id]: {
            ...state.elements?.[element.id],
            ...element,
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
    case SCREEN_ELEMENT_SELECTED: {
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
function engagementModeReducer(
  state: SharedFanState["engagementMode"],
  action: ActionType
) {
  switch (action.type) {
    case SET_ENGAGEMENT_MODE: {
      return action.payload.mode;
    }
    default:
      return state;
  }
}
