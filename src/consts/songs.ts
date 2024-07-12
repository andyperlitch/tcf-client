import rawSetList from "../songlist.json";

export const SONGS = rawSetList.filter((s) => s.Title !== "TOTALS");
export type Song = (typeof SONGS)[0];
