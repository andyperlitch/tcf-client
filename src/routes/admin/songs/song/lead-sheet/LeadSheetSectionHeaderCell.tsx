import { Input } from "@/components/ui/input";
import { changeFields } from "./LeadSheetSectionProvider/reducer";
import { useLeadSheetSection } from "./LeadSheetSectionProvider/context";

export function LeadSheetSectionHeaderCell() {
  const { state, dispatch } = useLeadSheetSection();

  return (
    <div
      data-name="LEAD_SHEET_SECTION_HEADER_CELL"
      className={`flex flex-col gap-2`}
    >
      <div data-name="NAME_AND_TIME_CODE" className="flex gap-2">
        <Input
          value={state.name}
          onChange={(e) => {
            dispatch(changeFields({ name: e.target.value }));
          }}
          className={`text-3xl font-bold`}
        />
        <Input
          value={state.timeCode ?? ""}
          onChange={(e) => {
            dispatch(changeFields({ timeCode: e.target.value }));
          }}
          placeholder="1:23"
        />
      </div>
      <Input
        className="italic"
        value={state.lyricHint ?? ""}
        onChange={(e) => {
          dispatch(changeFields({ lyricHint: e.target.value }));
        }}
        placeholder="I'm a little teapot"
      />
    </div>
  );
}
