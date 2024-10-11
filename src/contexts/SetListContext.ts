import { createContext } from "react";
import { SetListContextType } from "@/types/setlist";

export const setListContext = createContext<SetListContextType>(
  {} as SetListContextType
);
