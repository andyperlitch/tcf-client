import { EventStageConfig, UpdateEventStageConfigInput } from "@/gql/graphql";
import { debounce, isEqual } from "lodash";
import { stripTypename } from "@/utils/stripTypename";
import { useMemo, useCallback, RefObject, useEffect, useRef } from "react";
import { useIframeSharedState } from "@/hooks/use-iframe";
import { SharedStageState } from "@/types/stage";
import { createLogger } from "@/utils/createLogger";

const logger = createLogger("🧑‍💼 useAdminStageState");

export function useAdminStageState({
  initialConfig,
  onSave,
  iframeRef,
}: {
  initialConfig: EventStageConfig;
  onSave: (input: UpdateEventStageConfigInput) => void;
  iframeRef?: RefObject<HTMLIFrameElement>;
}) {
  // Create debounced version of onSave
  const debouncedOnSave = useMemo(
    () =>
      debounce((config: EventStageConfig) => {
        logger.log("debouncedOnSave: ", {
          config,
        });
        onSave({
          ...stripTypename(config),
          elements: config.elements?.map((element) => stripTypename(element)),
        });
      }, 500),
    [onSave]
  );

  const [stageConfigs, setStageConfigs] =
    useIframeSharedState<SharedStageState>(
      {
        savedConfig: initialConfig,
        draftConfig: {},
        selectedElementId: undefined,
      },
      { ref: iframeRef, id: "ADMIN" }
    );

  const setSelectedElementId = useCallback(
    (id: string | undefined) => {
      if (id === stageConfigs.selectedElementId) {
        return;
      }
      setStageConfigs((prev) =>
        prev.selectedElementId !== id
          ? { ...prev, selectedElementId: id }
          : prev
      );
    },
    [setStageConfigs, stageConfigs.selectedElementId]
  );

  const setSavedConfig = useCallback(
    (
      config: EventStageConfig | ((prev: EventStageConfig) => EventStageConfig)
    ) => {
      setStageConfigs((prev) => {
        const savedConfig =
          typeof config === "function" ? config(prev.savedConfig) : config;
        const newStageState = {
          ...prev,
          savedConfig: {
            ...prev.savedConfig,
            ...savedConfig,
          },
        };
        logger.log("setSavedConfig: ", { newStageState });
        return newStageState;
      });
    },
    [setStageConfigs]
  );

  const setDraftConfig = useCallback(
    (
      config:
        | Partial<EventStageConfig>
        | ((prev: Partial<EventStageConfig>) => Partial<EventStageConfig>)
    ) => {
      setStageConfigs((prev) => {
        const newDraftConfig =
          typeof config === "function" ? config(prev.draftConfig) : config;

        logger.log("setDraftConfig: ", {
          prevDraftConfig: prev.draftConfig,
          newDraftConfig,
        });

        return {
          ...prev,
          draftConfig: newDraftConfig,
        };
      });
    },
    [setStageConfigs]
  );

  const lastSavedConfig = useRef(initialConfig);

  useEffect(() => {
    if (!isEqual(lastSavedConfig.current, stageConfigs.savedConfig)) {
      logger.log("Saving config", stageConfigs.savedConfig);
      debouncedOnSave(stageConfigs.savedConfig);
      lastSavedConfig.current = stageConfigs.savedConfig;
    } else {
      logger.log("No config change, not saving", stageConfigs.savedConfig);
    }
  }, [debouncedOnSave, stageConfigs.savedConfig, initialConfig]);

  return {
    stageConfig: stageConfigs.savedConfig,
    draftConfig: stageConfigs.draftConfig,
    selectedElementId: stageConfigs.selectedElementId,
    setSavedConfig,
    setDraftConfig,
    setSelectedElementId,
  };
}

export type AdminStageConfig = ReturnType<typeof useAdminStageState>;
