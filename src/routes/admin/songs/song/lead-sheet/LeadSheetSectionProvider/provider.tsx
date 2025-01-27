import {
  LeadSheetSectionFragment,
  UpdateLeadSheetSectionInput,
  useBandUpdateLeadSheetSectionMutation,
} from "@/gql/graphql";
import { useEffect, useMemo, useReducer, useRef } from "react";
import { reducer } from "./reducer";
import { debounce } from "lodash";
import { LeadSheetSectionContext } from "./context";

export function LeadSheetSectionProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: LeadSheetSectionFragment;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const lastSaveStateRef = useRef(JSON.stringify(state));
  const [updateLeadSheetSection] = useBandUpdateLeadSheetSectionMutation();

  const debouncedSave = useMemo(
    () =>
      debounce((section: LeadSheetSectionFragment) => {
        updateLeadSheetSection({
          variables: {
            leadSheetSectionId: section.id,
            data: sectionToInput(section),
          },
        });
      }, 500),
    [updateLeadSheetSection]
  );

  useEffect(() => {
    if (JSON.stringify(state) !== lastSaveStateRef.current) {
      debouncedSave(state);
      lastSaveStateRef.current = JSON.stringify(state);
    }
  }, [debouncedSave, state]);

  return (
    <LeadSheetSectionContext.Provider
      value={useMemo(() => ({ state, dispatch }), [state, dispatch])}
    >
      {children}
    </LeadSheetSectionContext.Provider>
  );
}

function sectionToInput(
  section: LeadSheetSectionFragment
): UpdateLeadSheetSectionInput {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, __typename, order, ...rest } = section;
  const input: UpdateLeadSheetSectionInput = {
    ...rest,
    details: section.details.map((d) => ({
      type: d.type,
      content: d.content,
      id: d.id,
    })),
  };

  return input;
}
