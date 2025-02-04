import { ChordSymbol } from "./ChordSymbol";
import { Input } from "./ui/input";

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
        <ChordSymbol chord={chord} onClick={onClick} />
      )}
    </div>
  );
}
