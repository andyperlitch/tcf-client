import { ThemeProviderContext } from "@/contexts/ThemeProviderContext";
import { Theme } from "@/types/theme";

export function ThemeOverride({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme;
}) {
  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme: () => null }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
