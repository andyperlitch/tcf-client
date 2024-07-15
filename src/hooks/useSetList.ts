import { useContext } from "react";
import { setListContext } from "../contexts/setListContext";

export function useSetList() {
  return useContext(setListContext);
}
