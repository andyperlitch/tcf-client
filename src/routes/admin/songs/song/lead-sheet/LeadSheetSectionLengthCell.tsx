import { Input } from "@/components/ui/input";
import { useLeadSheetSection } from "./LeadSheetSectionProvider/context";
import { changeFields } from "./LeadSheetSectionProvider/reducer";

export function LeadSheetSectionLengthCell() {
  const { state, dispatch } = useLeadSheetSection();

  return (
    <Input
      value={state.barLength ?? ""}
      onChange={(e) => {
        dispatch(changeFields({ barLength: e.target.value }));
      }}
      placeholder="e.g. 4 bars"
    />
  );
}
