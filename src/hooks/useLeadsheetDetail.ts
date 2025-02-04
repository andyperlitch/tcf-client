import { useMemo } from "react";

const DEFAULT_CHORD_DETAIL = [[""]];

export function useChordDetail({
  value,
  onChange,
}: {
  /**
   * The serialized multi-dimensional array of chords.
   */
  value: string;
  /**
   * The function to call when the value changes (optional for readonly use-cases)
   */
  onChange?: (newValue: string) => void;
}) {
  return useMemo(() => {
    const serialized = value.trim() || JSON.stringify(DEFAULT_CHORD_DETAIL);
    const parsed = JSON.parse(serialized) as string[][];

    return [
      parsed,
      (newValue: string[][] | ((prev: string[][]) => string[][])) => {
        const serialized = JSON.stringify(
          typeof newValue === "function" ? newValue(parsed) : newValue
        );
        onChange?.(serialized);
      },
    ] as const;
  }, [value, onChange]);
}
