import { LeadSheetSectionFragment } from "@/gql/graphql";
import { createContext, Dispatch, useContext } from "react";
import { ActionType } from "./reducer";

type LeadSheetSectionContextType = {
  state: LeadSheetSectionFragment;
  dispatch: Dispatch<ActionType>;
};

export const LeadSheetSectionContext =
  createContext<LeadSheetSectionContextType>({} as LeadSheetSectionContextType);

export function useLeadSheetSection() {
  return useContext(LeadSheetSectionContext);
}
