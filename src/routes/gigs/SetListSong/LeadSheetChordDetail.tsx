import { ChordSymbol } from "@/components/ChordSymbol";
import { LeadSheetDetailFragment } from "@/gql/graphql";
import { useChordDetail } from "@/hooks/useLeadsheetDetail";

export function LeadSheetChordDetail({
  detail,
}: {
  detail: LeadSheetDetailFragment;
}) {
  const [measures] = useChordDetail({
    value: detail.content,
  });

  return (
    <div data-name="CHORD_DETAIL" className="flex flex-wrap">
      {measures.map((measure, measureIndex) => (
        <div
          data-name="CHORD_MEASURE"
          className={`
            mb-2 flex min-h-[2rem] w-1/4 items-center gap-2 border-r-2
            border-foreground px-2

            ${measureIndex % 4 === 0 ? "border-l-2" : ""}
          `}
          key={measureIndex}
        >
          {measure.map((chord, chordIndex) => (
            <ChordSymbol
              key={chordIndex}
              chord={chord}
              className={`
                ${measures[measureIndex].length > 2 ? "w-1/4" : "w-1/2"}
              `}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
