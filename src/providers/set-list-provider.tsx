import { useEffect, useMemo, useState } from "react";
import { SetListSong } from "../types/setlist";
import { SETLIST_CSV_URL } from "../consts/songs";
import { setListContext } from "../contexts/set-list-context";

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
        // split on lines
        const lines = rawCsv.split("\n");
        if (!lines || lines.length === 0) {
          throw new Error("Sheet not in expected format");
        }

        // OK to assume at least one line (!)
        const headersLine = lines.shift()!;

        // get the headers, strip \r
        const headers = headersLine.replace(/\\r/g, "").split(",");

        // convert lines to songs
        const songs = lines
          .map((line) => {
            const fields = line.split(",");
            return headers.reduce((song, header, i) => {
              const typedHeader = header as keyof SetListSong;
              if (typedHeader === "FirstGigOrder") {
                song[typedHeader] = fields[i].length
                  ? parseInt(fields[i], 10)
                  : 999;
              } else {
                song[typedHeader] = fields[i].replace(/\\r/g, "");
              }
              return song;
            }, {} as SetListSong);
          })
          .filter((song) => song?.Title !== "TOTALS");

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
