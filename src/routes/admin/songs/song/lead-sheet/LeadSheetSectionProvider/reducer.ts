import {
  LeadSheetDetailType,
  UpdateLeadSheetSectionInput,
} from "@/gql/graphql";
import { filterNulls } from "@/utils/filterNulls";
import { LeadSheetSectionState } from "./context";

const FIELDS_CHANGED = "FIELDS_CHANGED";
interface FieldsChangedAction {
  type: typeof FIELDS_CHANGED;
  payload: UpdateLeadSheetSectionInput;
}
export const changeFields = (
  payload: FieldsChangedAction["payload"]
): FieldsChangedAction => ({
  type: FIELDS_CHANGED,
  payload,
});

const DETAIL_ADDED = "DETAIL_ADDED";
interface DetailAddedAction {
  type: typeof DETAIL_ADDED;
  payload: {
    id: string;
    type: LeadSheetDetailType;
    content: string;
  };
}
export const addDetail = (
  payload: DetailAddedAction["payload"]
): DetailAddedAction => ({
  type: DETAIL_ADDED,
  payload,
});

const DETAIL_REMOVED = "DETAIL_REMOVED";
interface DetailRemovedAction {
  type: typeof DETAIL_REMOVED;
  payload: {
    id: string;
  };
}
export const removeDetail = (
  payload: DetailRemovedAction["payload"]
): DetailRemovedAction => ({
  type: DETAIL_REMOVED,
  payload,
});

const DETAIL_UPDATED = "DETAIL_UPDATED";
interface DetailUpdatedAction {
  type: typeof DETAIL_UPDATED;
  payload: {
    id: string;
    content: string;
  };
}
export const updateDetail = (
  payload: DetailUpdatedAction["payload"]
): DetailUpdatedAction => ({
  type: DETAIL_UPDATED,
  payload,
});

export type ActionType =
  | FieldsChangedAction
  | DetailAddedAction
  | DetailRemovedAction
  | DetailUpdatedAction;

export const reducer = (
  state: LeadSheetSectionState,
  action: ActionType
): LeadSheetSectionState => {
  switch (action.type) {
    case FIELDS_CHANGED:
      return { ...state, ...filterNulls(action.payload) };
    case DETAIL_ADDED:
      return {
        ...state,
        details: [...state.details, action.payload],
        lastAddedDetailId: action.payload.id,
      };
    case DETAIL_REMOVED:
      return {
        ...state,
        details: state.details.filter((d) => d.id !== action.payload.id),
      };
    case DETAIL_UPDATED:
      return {
        ...state,
        details: state.details.map((d) =>
          d.id === action.payload.id
            ? { ...d, content: action.payload.content }
            : d
        ),
      };
    default:
      return state;
  }
};
