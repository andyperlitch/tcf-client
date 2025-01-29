import { Input } from "@/components/ui/input";
import { changeFields } from "./LeadSheetSectionProvider/reducer";
import { useLeadSheetSection } from "./LeadSheetSectionProvider/context";
import { useEffect, useRef } from "react";

export function LeadSheetSectionHeaderCell({
  showLyricHints,
  showTimeCodes,
  autoFocus,
}: {
  showLyricHints: boolean;
  showTimeCodes: boolean;
  autoFocus: boolean;
}) {
  const { state, dispatch } = useLeadSheetSection();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      ref.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div
      data-name="LEAD_SHEET_SECTION_HEADER_CELL"
      className={`flex flex-col gap-2`}
    >
      <div data-name="NAME_AND_TIME_CODE" className="flex gap-2">
        <Input
          ref={ref}
          value={state.name}
          onChange={(e) => {
            dispatch(changeFields({ name: e.target.value }));
          }}
          className={`border-none text-3xl font-bold`}
          autoFocus={autoFocus}
          selectOnFocus={autoFocus}
        />
        {showTimeCodes && (
          <Input
            value={state.timeCode ?? ""}
            onChange={(e) => {
              dispatch(changeFields({ timeCode: e.target.value }));
            }}
            placeholder="1:23"
            className={`border-none`}
          />
        )}
      </div>
      {showLyricHints && (
        <Input
          className="border-none italic"
          value={state.lyricHint ?? ""}
          onChange={(e) => {
            dispatch(changeFields({ lyricHint: e.target.value }));
          }}
          placeholder="I'm a little teapot"
        />
      )}
    </div>
  );
}
