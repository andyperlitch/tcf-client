import { useCallback, useEffect } from "react";
import { EventStageConfig } from "@/gql/graphql";
import { useIframeSharedState } from "@/hooks/use-iframe";
import { SharedStageState } from "@/types/stage";

/**
 * This hook is used to manage the stage config. It is used to update the stage config and to listen for updates from the iframe parent.
 */
export function useStageState({
  initialConfig,
}: {
  initialConfig: EventStageConfig;
}) {
  const [stageConfigs, setStageConfigs] =
    useIframeSharedState<SharedStageState>({
      savedConfig: initialConfig,
      draftConfig: {},
      selectedElementId: undefined,
    });

  useEffect(() => {
    console.log("👨‍🎤 STAGE SAVED CONFIG", stageConfigs.savedConfig);
  }, [stageConfigs.savedConfig]);

  const setSavedConfig = useCallback(
    (
      config: EventStageConfig | ((prev: EventStageConfig) => EventStageConfig)
    ) => {
      setStageConfigs((prev) => ({
        ...prev,
        savedConfig:
          typeof config === "function" ? config(prev.savedConfig) : config,
      }));
    },
    [setStageConfigs]
  );

  const setDraftConfig = useCallback(
    (
      config:
        | Partial<EventStageConfig>
        | ((prev: Partial<EventStageConfig>) => Partial<EventStageConfig>)
    ) => {
      setStageConfigs((prev) => ({
        ...prev,
        draftConfig:
          typeof config === "function" ? config(prev.draftConfig) : config,
      }));
    },
    [setStageConfigs]
  );

  const setSelectedElementId = useCallback(
    (id: string | undefined) => {
      setStageConfigs((prev) => ({ ...prev, selectedElementId: id }));
    },
    [setStageConfigs]
  );

  return {
    stageConfig: stageConfigs.savedConfig,
    draftConfig: stageConfigs.draftConfig,
    selectedElementId: stageConfigs.selectedElementId,
    setSavedConfig,
    setDraftConfig,
    setSelectedElementId,
  };
}

export type StageState = ReturnType<typeof useStageState>;
