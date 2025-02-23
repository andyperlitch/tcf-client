import { ChordSymbol } from "./ChordSymbol";
import { ResizableInput } from "./ResizableInput";

const TEXT_SIZE_CLASSES = `
  text-sm

  lg:text-lg

  md:text-md

  p-0
`;
export function EditableChordSymbol({
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
    if (e.key === " " || e.key === "ArrowRight") {
      e.preventDefault();
      onNextMeasure?.();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onPreviousChord?.();
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        onPreviousChord?.();
      } else {
        onNextChord?.();
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
        <ResizableInput
          selectOnFocus
          autoFocus
          value={chord}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          className={TEXT_SIZE_CLASSES}
        />
      ) : (
        <ChordSymbol
          chord={chord}
          onClick={onClick}
          className={TEXT_SIZE_CLASSES}
        />
      )}
    </div>
  );
}
