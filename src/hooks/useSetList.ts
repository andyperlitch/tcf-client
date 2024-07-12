import { useEffect, useState } from "react";
import { SetListSong } from "../types/setlist";
import { SETLIST_CSV_URL } from "../consts/songs";

/**
 * Fetches the set list from the google sheet
 */
export function useSetList() {
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
              song[header as keyof SetListSong] = fields[i].replace(/\\r/g, "");
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

  return { songs, loading };
}
