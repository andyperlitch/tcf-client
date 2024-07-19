import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import { SetListSong } from "../types/setlist";
import { SETLIST_CSV_URL } from "../consts/songs";
import { setListContext } from "../contexts/set-list-context";

type ParsedSong = Record<keyof SetListSong, string>;
const NUMERIC_FIELDS = ["FirstGigOrder", "Tempo", "Duration"] as const;

export function SetListProvider({ children }: { children: React.ReactNode }) {
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
                acc[field] = parseInt(song[field], 10);
                return acc;
              }, {} as SetListSong),
            };
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
    <setListContext.Provider value={value}>{children}</setListContext.Provider>
  );
}
