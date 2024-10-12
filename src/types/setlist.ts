import type { SetField } from "@/consts/sets";
import { NumericKeys } from "./common";

export interface SetListSongStatic {
  ID: string;
  Title: string;
  Tempo: number;
  Writer: string;
  FirstGigSet: string;
  Lyrics: string;
  Feel: string;
  SongLink: string;
  Duration: number;
  Key: string;
  PracticePriority: string;
  Chart: string;
  LeadSheet: string;
  LeadSheetEditLink: string;
  AndyNotes: string;
  AndyVocal: string;
  FemaleVocal: string;
  MarkKeys: string;
}

type SetListSongStaticNumericField = NumericKeys<SetListSongStatic>;

export type SetListSong = SetListSongStatic & Record<SetField, string>;
export type SetListSongField = keyof SetListSong | SetField;
export type SetListSongNumericField = SetListSongStaticNumericField | SetField;

export interface SetListContextType {
  songs: SetListSong[];
  loading: boolean;
}
