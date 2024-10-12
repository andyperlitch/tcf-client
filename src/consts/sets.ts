import { SetListSongNumericField } from "@/types/setlist";
import { keyBy } from "@/utils/keyBy";

interface SetMeta {
  date: string;
  label: string;
  slug: string;
  fieldName: SetListSongNumericField;
}

export const SETS = [
  {
    slug: "funks-giving",
    date: "2024-11-23",
    label: "Funks-Giving",
    fieldName: "FunksGivingSet",
  },
] as const;

export type SetSlug = (typeof SETS)[number]["slug"];
export type SetField = (typeof SETS)[number]["fieldName"];

export const SETS_BY_SLUG = keyBy(SETS as unknown as SetMeta[], "slug");
