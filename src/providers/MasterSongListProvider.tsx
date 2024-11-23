import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import { SetListSong, SetListSongNumericField } from "../types/songlist";
import { SETLIST_CSV_URL } from "../consts/songs";
import { masterSongListContext } from "../contexts/MasterSongListContext";
import { GIGS } from "@/consts/gigs";

type ParsedSong = Record<keyof SetListSong, string>;
const NUMERIC_FIELDS: SetListSongNumericField[] = [
  ...GIGS.map((s) => s.fieldName),
  "Tempo",
  "Duration",
];

export function MasterSongListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [songs, setSongs] = useState<SetListSong[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    setLoading(true);

    // fetch csv from drive
    fetch(SETLIST_CSV_URL, {
      signal: abortController.signal,
    })
      .then((result) => {
        // check status
        if (result.status === 200) {
          return result.text();
        }
        throw new Error("Could not fetch set list from google sheets");
      })
      .then((rawCsv) => {
        const parseResult = Papa.parse<ParsedSong>(rawCsv, { header: true });

        if (parseResult.errors.length) {
          throw new Error("Failed to parse CSV");
        }

        const songs = parseResult.data
          .filter((song) => song?.Title !== "TOTALS")
          .map((song) => {
            return {
              ...song,
              ...NUMERIC_FIELDS.reduce((acc, field) => {
                acc[field] = parseFloat(song[field]);
                return acc;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              }, {} as any),
            } as SetListSong;
          });

        // set the songs
        setSongs(songs);
      })
      .catch((e) => {
        if (abortController.signal.aborted) {
          return;
        }
        console.log(`Failed fetching set list. Error: ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  const value = useMemo(
    () => ({
      songs,
      loading,
    }),
    [songs, loading]
  );

  return (
    <masterSongListContext.Provider value={value}>
      {children}
    </masterSongListContext.Provider>
  );
}
