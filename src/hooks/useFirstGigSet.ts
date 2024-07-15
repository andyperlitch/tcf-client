import { useMemo } from "react";
import { useSetList } from "./useSetList";

export function useFirstGigSet() {
  const { songs } = useSetList();
  return useMemo(() => {
    return songs
      .filter((song) => song.FirstGigSet === "X")
      .sort((a, b) => a.FirstGigOrder - b.FirstGigOrder);
  }, [songs]);
}
