import { ChordParseFailure } from "chord-symbol";
import { MaybeChord } from "chord-symbol";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { chordParserFactory, chordRendererFactory } from "chord-symbol";

const chordParser = chordParserFactory();
const chordRenderer = chordRendererFactory({
  useShortNamings: true,
  transposeValue: 0,
});

export function ChordSymbol({
  chord,
  onClick,
  className,
}: {
  chord: string;
  onClick?: () => void;
  className?: string;
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
        className={`
          flex w-full items-center gap-2 text-red-300

          ${className}
        `}
      >
        <ExclamationTriangleIcon className="h-4 w-4" /> <span>{chord}</span>
      </div>
    );
  }
  return (
    <div
      className={`
        w-full

        ${className}
      `}
      onClick={onClick}
    >
      {chordRenderer(parsedChord)}
    </div>
  );
}

function isChordParseFailure(chord: MaybeChord): chord is ChordParseFailure {
  return "error" in chord;
}
