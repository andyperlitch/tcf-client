import { useMemo } from "react";
import { SharedStageState } from "@/types/screen";

const DEFAULT_FONT_FAMILY = ["sans-serif"];

export function useStageStyles({ state }: { state: SharedStageState }) {
  // Styles to apply to the root element
  const rootStyles = useMemo(() => {
    const fontFamily =
      state.draftConfig?.fontFamily ||
      state.savedConfig?.fontFamily ||
      DEFAULT_FONT_FAMILY;

    const backgroundImageUrl =
      state.draftConfig?.backgroundImage ||
      state.savedConfig?.backgroundImage ||
      null;

    return {
      "--stage-font-family": fontFamily.join(","),
      backgroundImage: backgroundImageUrl
        ? `url(${backgroundImageUrl})`
        : undefined,
      backgroundSize: "cover",
    };
  }, [state]);

  return { rootStyles };
}
