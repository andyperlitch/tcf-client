import { combineReducers } from "@/utils/combineReducers";
import { ActionType } from "./actions";
import { SharedFanState } from "@/types/screen";
import {
  BACKGROUND_IMAGE_SAVED,
  BACKGROUND_PREVIEW_SET,
  DEFAULT_FONT_CHANGED,
  IMAGE_ELEMENT_ADDED,
  SCREEN_ELEMENT_DELETED,
  SCREEN_ELEMENT_DRAFT_UPDATED,
  SCREEN_ELEMENT_SELECTED,
  SCREEN_ELEMENT_UPDATED,
  SET_ACTIVE_ENGAGEMENT,
  TEXT_ELEMENT_ADDED,
} from "../sharedActions";
import { omit } from "lodash";

export const fanStateReducer = combineReducers<SharedFanState, ActionType>({
  savedConfig: savedConfigReducer,
  draftConfig: draftConfigReducer,
  selectedElementId: selectedElementIdReducer,
  activeEngagement: activeEngagementReducer,
});

function savedConfigReducer(
  state: SharedFanState["savedConfig"],
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
    default: {
      return state;
    }
  }
}

function draftConfigReducer(
  state: SharedFanState["draftConfig"],
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
    default: {
      return state;
    }
  }
}

function selectedElementIdReducer(
  state: SharedFanState["selectedElementId"],
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
  state: SharedFanState["activeEngagement"],
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
