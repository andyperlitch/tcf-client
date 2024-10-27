import { Theme } from "@/types/theme";
import { createContext } from "react";

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  bgImage: string | null;
  setBgImage: (bgImage: string | null) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  bgImage: "/logo.svg",
  setBgImage: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export { ThemeProviderContext };
