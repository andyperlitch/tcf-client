import { Textarea } from "@/components/ui/textarea";
import { useLeadSheetSection } from "./LeadSheetSectionProvider/context";
import { changeFields } from "./LeadSheetSectionProvider/reducer";

export function LeadSheetLyricsCell() {
  const { state, dispatch } = useLeadSheetSection();

  return (
    <Textarea
      rows={10}
      value={state.lyrics ?? ""}
      placeholder="lyrics"
      onChange={(e) => {
        dispatch(changeFields({ lyrics: e.target.value }));
      }}
    />
  );
}
