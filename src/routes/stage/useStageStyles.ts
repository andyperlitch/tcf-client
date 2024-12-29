import { useMemo } from "react";
import { EventStageConfig } from "@/gql/graphql";

const DEFAULT_FONT_FAMILY = ["sans-serif"];

export function useStageStyles({
  stageConfig,
  draftConfig,
}: {
  stageConfig: EventStageConfig | null | undefined;
  draftConfig: Partial<EventStageConfig> | null | undefined;
}) {
  // font families
  const fontFamily = stageConfig?.fontFamily || DEFAULT_FONT_FAMILY;

  // Styles to apply to the root element
  const rootStyles = useMemo(() => {
    const backgroundImageUrl =
      draftConfig?.backgroundImage || stageConfig?.backgroundImage || null;

    return {
      backgroundImage: backgroundImageUrl
        ? `url(${backgroundImageUrl})`
        : undefined,
      backgroundSize: "cover",
    };
  }, [draftConfig?.backgroundImage, stageConfig?.backgroundImage]);

  return { rootStyles };
}
