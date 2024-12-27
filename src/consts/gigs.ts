import { SetListSongNumericField } from "@/types/songlist";
import { keyBy } from "@/utils/keyBy";

export interface GigMeta {
  date: string;
  label: string;
  slug: string;
  fieldName: SetListSongNumericField;
  spotifyPlaylistLink?: string;
}

export const GIGS = [
  {
    slug: "funks-giving",
    date: "2024-11-23",
    label: "Funks-Giving",
    fieldName: "FunksGivingSet",
    spotifyPlaylistLink:
      "https://open.spotify.com/playlist/7alEBU9nFYBIq1BMjI54Ij?si=f8f12a7e30ff4a99",
  },
  // myfunkyvalentine
  {
    slug: "my-funky-valentine",
    date: "2025-02-14",
    label: "My Funky Valentine",
    fieldName: "MyFunkyValentine",
  },
] as const;

export type GigSlug = (typeof GIGS)[number]["slug"];
export type GigField = (typeof GIGS)[number]["fieldName"];

export const GIGS_BY_SLUG = keyBy(GIGS as unknown as GigMeta[], "slug");
