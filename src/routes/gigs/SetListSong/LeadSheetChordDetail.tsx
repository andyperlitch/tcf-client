import { ChordSymbol } from "@/components/ChordSymbol";
import { LeadSheetDetailFragment } from "@/gql/graphql";
import { useChordDetail } from "@/hooks/useLeadsheetDetail";
import styles from "./LeadSheetChordDetail.module.css";

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
            mb-2 flex min-h-[2rem] min-w-[25%] items-center gap-2

            ${styles.measure}
          `}
          key={measureIndex}
        >
          {measure.map((chord, chordIndex) => (
            <ChordSymbol
              key={chordIndex}
              chord={chord}
              className={`
                text-sm

                lg:text-lg

                md:text-md

                xl:text-xl
              `}
              showErrors={false}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
