import { useMemo } from "react";
import { useSetList } from "./useSetList";
import { SETS_BY_SLUG } from "@/consts/sets";

export function useGigSet(setSlug: string | undefined) {
  const { songs } = useSetList();
  const setMeta = useMemo(
    () => (setSlug ? SETS_BY_SLUG[setSlug] : undefined),
    [setSlug]
  );
  return useMemo(() => {
    if (!setMeta) {
      return [];
    }
    return (
      songs
        .filter((song) => Boolean(song[setMeta.fieldName]))
        /* @ts-expect-error dunno sdfsadf */
        .sort((a, b) => a[setMeta.fieldName] - b[setMeta.fieldName])
    );
  }, [songs, setMeta]);
}
