import { useMemo } from "react";
import { EventStageConfig } from "@/gql/graphql";

export function useStageStyles({
  stageConfig,
  draftConfig,
}: {
  stageConfig: EventStageConfig | null | undefined;
  draftConfig: Partial<EventStageConfig> | null | undefined;
}) {
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
