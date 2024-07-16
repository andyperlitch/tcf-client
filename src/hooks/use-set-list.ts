import { useContext } from "react";
import { setListContext } from "../contexts/set-list-context";

export function useSetList() {
  return useContext(setListContext);
}
