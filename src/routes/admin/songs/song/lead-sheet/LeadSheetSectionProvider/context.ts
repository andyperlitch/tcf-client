import { LeadSheetSectionFragment } from "@/gql/graphql";
import { createContext, Dispatch, useContext } from "react";
import { ActionType } from "./reducer";

export type LeadSheetSectionState = LeadSheetSectionFragment & {
  lastAddedDetailId?: string | null;
};

type LeadSheetSectionContextType = {
  state: LeadSheetSectionState;
  dispatch: Dispatch<ActionType>;
};

export const LeadSheetSectionContext =
  createContext<LeadSheetSectionContextType>({} as LeadSheetSectionContextType);

export function useLeadSheetSection() {
  return useContext(LeadSheetSectionContext);
}
