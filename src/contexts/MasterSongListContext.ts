import { createContext } from "react";
import { MasterSongListContextType } from "@/types/songlist";

export const masterSongListContext = createContext<MasterSongListContextType>(
  {} as MasterSongListContextType
);
