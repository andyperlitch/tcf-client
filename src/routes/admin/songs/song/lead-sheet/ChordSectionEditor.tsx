import { LeadSheetDetailFragment } from "@/gql/graphql";
import { useLeadSheetSection } from "./LeadSheetSectionProvider/context";
import { useCallback, useMemo, useState } from "react";
import { updateDetail } from "./LeadSheetSectionProvider/reducer";
import { RemoveDetailButton } from "./RemoveDetailButton";
import { Input } from "@/components/ui/input";
import {
  ChordParseFailure,
  chordParserFactory,
  chordRendererFactory,
  MaybeChord,
} from "chord-symbol";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

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

const DEFAULT_CHORD_DETAIL = [[""]];

function ChordEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (newValue: string) => void;
  autoFocus?: boolean;
}) {
  const [measures, setMeasures] = useMemo(() => {
    const serialized = value.trim() || JSON.stringify(DEFAULT_CHORD_DETAIL);
    const parsed = JSON.parse(serialized) as string[][];

    return [
      parsed,
      (newValue: string[][] | ((prev: string[][]) => string[][])) => {
        const serialized = JSON.stringify(
          typeof newValue === "function" ? newValue(parsed) : newValue
        );
        onChange(serialized);
      },
    ] as const;
  }, [value, onChange]);

  const [currentMeasureIndex, setCurrentMeasureIndex] = useState<number | null>(
    null
  );
  const [currentChordIndex, setCurrentChordIndex] = useState<number | null>(
    null
  );

  return (
    <div className="flex w-full flex-wrap">
      {measures.map((measure, measureIndex) => (
        <div
          data-name={`MEASURE_${measureIndex + 1}`}
          key={measureIndex}
          className={`
            mb-2 flex min-h-[2rem] w-1/4 items-center gap-2 border-r-2
            border-foreground px-2

            ${measureIndex % 4 === 0 ? "border-l-2" : ""}
          `}
        >
          {measure.map((chord, chordIndex) => (
            <ChordSymbol
              className={`
                ${measures[measureIndex].length > 2 ? "w-1/4" : "w-1/2"}
              `}
              chord={chord}
              key={chordIndex}
              editing={
                measureIndex === currentMeasureIndex &&
                chordIndex === currentChordIndex
              }
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
                    const newCurrentChordIndex = Math.max(0, chordIndex - 1);
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
          ))}
        </div>
      ))}
    </div>
  );
}

function ChordSymbol({
  chord,
  editing,
  onPreviousChord,
  onNextChord,
  onNextMeasure,
  onChange,
  onDelete,
  onBlur,
  onClick,
  className,
}: {
  chord: string;
  editing: boolean;
  autoFocus?: boolean;
  onNextChord?: () => void;
  onNextMeasure?: () => void;
  onPreviousChord?: () => void;
  onChange: (newChord: string) => void;
  onDelete?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
  className?: string;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      onNextChord?.();
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        onPreviousChord?.();
      } else {
        onNextMeasure?.();
      }
    } else if ((e.key === "Delete" || e.key === "Backspace") && chord === "") {
      e.preventDefault();
      onDelete?.();
    } else if (e.key === "Escape" || e.key === "Enter") {
      e.preventDefault();
      onBlur?.();
    }
  };

  return (
    <div data-name="CHORD_SYMBOL" className={className}>
      {editing ? (
        <Input
          selectOnFocus
          autoFocus
          value={chord}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
        />
      ) : (
        <RenderedChord chord={chord} onClick={onClick} />
      )}
    </div>
  );
}

const chordParser = chordParserFactory();
const chordRenderer = chordRendererFactory({
  useShortNamings: true,
  transposeValue: 0,
});

function RenderedChord({
  chord,
  onClick,
}: {
  chord: string;
  onClick?: () => void;
}) {
  if (chord === "%") {
    return (
      <div
        data-name="REPEAT"
        onClick={onClick}
        className={`w-full text-white/20`}
      >
        %
      </div>
    );
  }
  const parsedChord = chordParser(chord);
  if (isChordParseFailure(parsedChord)) {
    return (
      <div
        onClick={onClick}
        className={`flex w-full items-center gap-2 text-red-300`}
      >
        <ExclamationTriangleIcon className="h-4 w-4" /> <span>{chord}</span>
      </div>
    );
  }
  return (
    <div className="w-full" onClick={onClick}>
      {chordRenderer(parsedChord)}
    </div>
  );
}

function isChordParseFailure(chord: MaybeChord): chord is ChordParseFailure {
  return "error" in chord;
}
