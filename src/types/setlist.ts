export interface SetListSong {
  ID: string;
  Title: string;
  Tempo: number;
  Writer: string;
  FirstGigSet: string;
  Lyrics: string;
  Feel: string;
  FirstGigOrder: number;
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

export interface SetListContextType {
  songs: SetListSong[];
  loading: boolean;
}
