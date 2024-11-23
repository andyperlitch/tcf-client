import { useContext } from "react";
import { masterSongListContext } from "../contexts/MasterSongListContext";

export function useMasterSongList() {
  return useContext(masterSongListContext);
}
