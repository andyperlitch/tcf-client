import { ChordParseFailure } from "chord-symbol";
import { MaybeChord } from "chord-symbol";
import { chordParserFactory } from "chord-symbol";
import { useMemo } from "react";
const chordParser = chordParserFactory();

export function ChordSymbol({
  chord,
  onClick,
  className,
  showErrors = true,
}: {
  chord: string;
  onClick?: () => void;
  className?: string;
  showErrors?: boolean;
}) {
  const chordRenderer = useChordRenderer();

  if (chord === "") {
    return (
      <div
        data-name="REPEAT"
        onClick={onClick}
        className={`w-full text-white/20`}
      >
        --
      </div>
    );
  }

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
        title="This chord is not valid"
        onClick={onClick}
        className={`
          flex w-full items-center gap-2 whitespace-nowrap

          ${showErrors ? "text-yellow-500" : ""}
          ${className}
        `}
      >
        <span>{chord}</span>
      </div>
    );
  }
  return (
    <div
      className={`
        w-full whitespace-nowrap

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

function useChordRenderer() {
  const chordRenderer = useMemo(() => {
    return (parsedChord: MaybeChord) => {
      if (isChordParseFailure(parsedChord)) {
        return parsedChord.toString();
      }

      const symbol = parsedChord.formatted.symbol;

      // replace all these things in symbol:
      // - mi with -
      // - ma with maj
      // - b with ♭
      // - # with ♯
      return symbol
        .replace("mi", "-")
        .replace("ma", "maj")
        .replace("b", "♭")
        .replace("#", "♯");
    };
  }, []);

  return chordRenderer;
}
