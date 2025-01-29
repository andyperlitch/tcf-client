import { useLeadSheetSection } from "./LeadSheetSectionProvider/context";
import { changeFields } from "./LeadSheetSectionProvider/reducer";
import { Textarea } from "@/components/ui/textarea";

export function LeadSheetSectionLengthCell() {
  const { state, dispatch } = useLeadSheetSection();

  return (
    <Textarea
      className="border-none outline-none"
      value={state.barLength ?? ""}
      onChange={(e) => {
        dispatch(changeFields({ barLength: e.target.value }));
      }}
      placeholder="e.g. 4 bars"
    />
  );
}
