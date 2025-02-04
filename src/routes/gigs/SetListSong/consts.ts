export enum SongView {
  Leadsheet = "leadsheet",
  Lyrics = "lyrics",
  Info = "info",
}

export interface SetBreak {
  lastSetId: number;
  nextSetId: number;
  __typename: "SetBreak";
}
