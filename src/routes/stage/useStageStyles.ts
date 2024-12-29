import { useEffect, useMemo } from "react";
import { EventStageConfig } from "@/gql/graphql";

const DEFAULT_FONT_FAMILY = ["sans-serif"];

export function useStageStyles({
  stageConfig,
  draftConfig,
}: {
  stageConfig: EventStageConfig | null | undefined;
  draftConfig: Partial<EventStageConfig> | null | undefined;
}) {
  // Styles to apply to the root element
  const rootStyles = useMemo(() => {
    const fontFamily =
      draftConfig?.fontFamily || stageConfig?.fontFamily || DEFAULT_FONT_FAMILY;

    const backgroundImageUrl =
      draftConfig?.backgroundImage || stageConfig?.backgroundImage || null;

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
    stageConfig?.backgroundImage,
    stageConfig?.fontFamily,
  ]);

  useEffect(() => {}, []);

  return { rootStyles };
}
