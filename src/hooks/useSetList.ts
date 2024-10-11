import { useContext } from "react";
import { setListContext } from "../contexts/SetListContext";

export function useSetList() {
  return useContext(setListContext);
}
