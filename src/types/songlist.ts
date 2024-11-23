import type { GigField } from "@/consts/gigs";
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

export type SetListSong = SetListSongStatic & Record<GigField, string>;
export type SetListSongField = keyof SetListSong | GigField;
export type SetListSongNumericField = SetListSongStaticNumericField | GigField;

export interface MasterSongListContextType {
  songs: SetListSong[];
  loading: boolean;
}
