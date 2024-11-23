import { useEffect, useMemo, useState } from "react";
import { useMasterSongList } from "./useMasterSongList";
import { GIGS_BY_SLUG } from "@/consts/gigs";
import { SetListSong } from "@/types/songlist";

// Songs with the title 'SET_BREAK' are used to indicate a break in the set
const SET_BREAK_TITLE = "SET_BREAK";

export function useGig(gigSlug: string | undefined) {
  const { songs, loading: songsLoading } = useMasterSongList();
  const [loading, setLoading] = useState(songsLoading);
  const [sets, setSets] = useState<SetListSong[][]>([]);
  const gigMeta = useMemo(
    () => (gigSlug ? GIGS_BY_SLUG[gigSlug] : undefined),
    [gigSlug]
  );
  useEffect(() => {
    if (!gigMeta || songsLoading || songs.length === 0) {
      return;
    }
    const allGigSongs = songs
      .filter((song) => Boolean(song[gigMeta.fieldName]))
      .sort(
        (a, b) => Number(a[gigMeta.fieldName]) - Number(b[gigMeta.fieldName])
      );

    const sets: SetListSong[][] = [];
    let currentSet: SetListSong[] = (sets[0] = []);

    for (const song of allGigSongs) {
      if (song.Title === SET_BREAK_TITLE) {
        currentSet = sets[sets.length] = [];
      } else {
        currentSet.push(song);
      }
    }
    setSets(sets);
    setLoading(false);
  }, [songs, gigMeta, songsLoading]);

  return { sets, loading, gigMeta };
}
