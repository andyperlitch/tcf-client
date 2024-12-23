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
        onSave({
          ...stripTypename(config),
          elements: config.elements?.map((element) => stripTypename(element)),
        });
      }, 500),
    [onSave]
  );

  const [stageState, setStageState] = useIframeSharedState<SharedStageState>(
    {
      savedConfig: initialConfig,
      draftConfig: {},
      selectedElementId: undefined,
    },
    { ref: iframeRef }
  );

  const setSelectedElementId = useCallback(
    (id: string | undefined) => {
      if (id === stageState.selectedElementId) {
        return;
      }
      setStageState((prev) =>
        prev.selectedElementId !== id
          ? { ...prev, selectedElementId: id }
          : prev
      );
    },
    [setStageState, stageState.selectedElementId]
  );

  const setSavedConfig = useCallback(
    (
      config: EventStageConfig | ((prev: EventStageConfig) => EventStageConfig)
    ) => {
      setStageState((prev) => {
        const savedConfig =
          typeof config === "function" ? config(prev.savedConfig) : config;
        const newStageState = {
          ...prev,
          savedConfig: {
            ...prev.savedConfig,
            ...savedConfig,
          },
        };
        logger.log("setStageState: ", { newStageState });
        return newStageState;
      });
    },
    [setStageState]
  );

  const setDraftConfig = useCallback(
    (
      config:
        | Partial<EventStageConfig>
        | ((prev: Partial<EventStageConfig>) => Partial<EventStageConfig>)
    ) => {
      setStageState((prev) => {
        const newDraftConfig =
          typeof config === "function" ? config(prev.draftConfig) : config;

        console.log("Previous draft config:", prev.draftConfig);
        console.log("New draft config:", newDraftConfig);

        return {
          ...prev,
          draftConfig: newDraftConfig,
        };
      });
    },
    [setStageState]
  );

  const lastSavedConfig = useRef(initialConfig);

  useEffect(() => {
    if (!isEqual(lastSavedConfig.current, stageState.savedConfig)) {
      debouncedOnSave(stageState.savedConfig);
      lastSavedConfig.current = stageState.savedConfig;
    }
  }, [debouncedOnSave, stageState.savedConfig, initialConfig]);

  return {
    stageConfig: stageState.savedConfig,
    draftConfig: stageState.draftConfig,
    selectedElementId: stageState.selectedElementId,
    setSavedConfig,
    setDraftConfig,
    setSelectedElementId,
  };
}

export type AdminStageConfig = ReturnType<typeof useAdminStageState>;
