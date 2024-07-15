export interface SetListSong {
  ID: string;
  Title: string;
  Tempo: string;
  Writer: string;
  FirstGigSet: string;
  FirstGigOrder: number;
  SongLink: string;
  Duration: string;
  Key: string;
  PracticePriority: string;
  Chart: string;
  LeadSheet: string;
  AndyNotes: string;
  AndyVocal: string;
  FemaleVocal: string;
  MarkKeys: string;
}

export interface SetListContextType {
  songs: SetListSong[];
  loading: boolean;
}
