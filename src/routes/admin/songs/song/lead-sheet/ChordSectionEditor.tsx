import { LeadSheetDetailFragment } from "@/gql/graphql";
import { useLeadSheetSection } from "./LeadSheetSectionProvider/context";
import { useCallback, useState } from "react";
import { updateDetail } from "./LeadSheetSectionProvider/reducer";
import { RemoveDetailButton } from "./RemoveDetailButton";
import { EditableChordSymbol } from "@/components/EditableChordSymbol";
import { useChordDetail } from "@/hooks/useLeadsheetDetail";

export function ChordSectionEditor({
  detail,
}: {
  detail: LeadSheetDetailFragment;
}) {
  const { state, dispatch } = useLeadSheetSection();

  const isLastAddedDetail = state.lastAddedDetailId === detail.id;

  return (
    <div className="flex gap-2">
      <RemoveDetailButton id={detail.id} />
      <ChordEditor
        autoFocus={isLastAddedDetail}
        value={detail.content}
        onChange={useCallback(
          (newValue) =>
            dispatch(
              updateDetail({
                id: detail.id,
                content: newValue,
              })
            ),
          [detail.id, dispatch]
        )}
      />
    </div>
  );
}

function ChordEditor({
  value,
  onChange,
  autoFocus,
}: {
  value: string;
  onChange: (newValue: string) => void;
  autoFocus?: boolean;
}) {
  const [measures, setMeasures] = useChordDetail({ value, onChange });
  const [currentMeasureIndex, setCurrentMeasureIndex] = useState<number | null>(
    autoFocus ? 0 : null
  );
  const [currentChordIndex, setCurrentChordIndex] = useState<number | null>(
    autoFocus ? 0 : null
  );

  return (
    <div data-name="CHORD_EDITOR" className="flex w-full flex-col">
      <div data-name="MEASURES" className="flex w-full flex-wrap">
        {measures.map((measure, measureIndex) => (
          <div
            data-name={`MEASURE_${measureIndex + 1}`}
            key={measureIndex}
            className={`
              mb-2 flex min-h-[2rem] min-w-[25%] items-center gap-2 border-r-2
              border-foreground px-2

              ${measureIndex % 4 === 0 ? "border-l-2" : ""}
            `}
          >
            {measure.map((chord, chordIndex) => {
              const editing =
                measureIndex === currentMeasureIndex &&
                chordIndex === currentChordIndex;

              return (
                <EditableChordSymbol
                  className={`
                    text-sm

                    lg:text-xl
                  `}
                  chord={chord}
                  key={chordIndex}
                  editing={editing}
                  onPreviousChord={() => {
                    const previousChordIndex = chordIndex - 1;
                    if (previousChordIndex < 0) {
                      const previousMeasureIndex = measureIndex - 1;
                      if (previousMeasureIndex >= 0) {
                        setCurrentMeasureIndex(previousMeasureIndex);
                        setCurrentChordIndex(
                          measures[previousMeasureIndex].length - 1
                        );
                      }
                    } else {
                      setCurrentChordIndex(previousChordIndex);
                    }
                  }}
                  onNextChord={() => {
                    const nextChordIndex = chordIndex + 1;
                    if (nextChordIndex >= measures[measureIndex].length) {
                      // add a new chord
                      setMeasures((prev) => {
                        const newMeasures = [...prev];
                        newMeasures[measureIndex].push("");
                        return newMeasures;
                      });
                      setCurrentChordIndex(nextChordIndex);
                    } else {
                      setCurrentChordIndex(nextChordIndex);
                    }
                  }}
                  onNextMeasure={() => {
                    const nextMeasureIndex = measureIndex + 1;
                    if (nextMeasureIndex >= measures.length) {
                      // add a new measure
                      setMeasures((prev) => {
                        const newMeasures = [...prev, [""]];
                        setCurrentMeasureIndex(nextMeasureIndex);
                        setCurrentChordIndex(0);
                        return newMeasures;
                      });
                    } else {
                      setCurrentMeasureIndex(nextMeasureIndex);
                      setCurrentChordIndex(0);
                    }
                  }}
                  onDelete={() => {
                    if (measures[measureIndex].length === 1) {
                      if (measures.length > 1) {
                        // delete the measure
                        setMeasures((prev) => {
                          const newMeasures = [...prev];
                          newMeasures.splice(measureIndex, 1);
                          const newCurrentMeasureIndex = Math.max(
                            0,
                            measureIndex - 1
                          );
                          setCurrentMeasureIndex(newCurrentMeasureIndex);
                          setCurrentChordIndex(
                            newMeasures[newCurrentMeasureIndex].length - 1
                          );
                          return newMeasures;
                        });
                      }
                    } else {
                      // delete the chord
                      setMeasures((prev) => {
                        const newMeasures = [...prev];
                        newMeasures[measureIndex].splice(chordIndex, 1);
                        const newCurrentChordIndex = Math.max(
                          0,
                          chordIndex - 1
                        );
                        setCurrentChordIndex(newCurrentChordIndex);
                        return newMeasures;
                      });
                    }
                  }}
                  onChange={(newChord) => {
                    setMeasures((prev) => {
                      const newMeasures = [...prev];
                      newMeasures[measureIndex][chordIndex] = newChord;
                      return newMeasures;
                    });
                  }}
                  onBlur={() => {
                    setCurrentChordIndex(null);
                    setCurrentMeasureIndex(null);
                  }}
                  onClick={() => {
                    setCurrentChordIndex(chordIndex);
                    setCurrentMeasureIndex(measureIndex);
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
