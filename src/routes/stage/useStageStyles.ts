import { useMemo } from "react";
import { StageDraftConfig, StageSavedConfig } from "@/types/stage";

const DEFAULT_FONT_FAMILY = ["sans-serif"];

export function useStageStyles({
  savedConfig,
  draftConfig,
}: {
  savedConfig: StageSavedConfig;
  draftConfig: StageDraftConfig;
}) {
  // Styles to apply to the root element
  const rootStyles = useMemo(() => {
    const fontFamily =
      draftConfig?.fontFamily || savedConfig?.fontFamily || DEFAULT_FONT_FAMILY;

    const backgroundImageUrl =
      draftConfig?.backgroundImage || savedConfig?.backgroundImage || null;

    return {
      "--stage-font-family": fontFamily.join(","),
      backgroundImage: backgroundImageUrl
        ? `url(${backgroundImageUrl})`
        : undefined,
      backgroundSize: "cover",
    };
  }, [
    draftConfig?.backgroundImage,
    draftConfig?.fontFamily,
    savedConfig?.backgroundImage,
    savedConfig?.fontFamily,
  ]);

  return { rootStyles };
}
