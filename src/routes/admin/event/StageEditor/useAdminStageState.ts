import {
  EventStageConfig,
  UpdateEventStageConfigInput,
  useAdminUpdateEventStageConfigMutation,
} from "@/gql/graphql";
import { debounce, isEqual } from "lodash";
import { stripTypename } from "@/utils/stripTypename";
import { useMemo, useCallback, RefObject, useEffect, useRef } from "react";
import { createLogger } from "@/utils/createLogger";
import { useStageState } from "@/providers/StageStateProvider/useStageState";
import { useIframe } from "@/hooks/use-iframe";
import { ActionType } from "@/providers/StageStateProvider/actions";

const logger = createLogger("🧑‍💼 useAdminStageState");

/**
 * This hook is used to manage the stage config from the admin side.
 */
export function useAdminStageState({
  initialConfig,
  eventId,
  iframeRef,
}: {
  initialConfig: EventStageConfig;
  eventId: number;
  iframeRef?: RefObject<HTMLIFrameElement>;
}) {
  const [updateEventStageConfig] = useAdminUpdateEventStageConfigMutation();

  const onSave = useCallback(
    (input: UpdateEventStageConfigInput) => {
      logger.info("useOnSave", input);
      updateEventStageConfig({
        variables: {
          id: eventId,
          data: input,
        },
      });
    },
    [eventId, updateEventStageConfig]
  );

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

  const { state, dispatch } = useStageState();

  const handler = useCallback(
    (message: ActionType) => {
      dispatch(message);
    },
    [dispatch]
  );

  const [dispatchIframe] = useIframe(handler, { ref: iframeRef });

  const wrappedDispatch = useCallback(
    (message: ActionType) => {
      dispatch(message);
      dispatchIframe(message);
    },
    [dispatch, dispatchIframe]
  );

  const lastSavedConfig = useRef(initialConfig);

  useEffect(() => {
    if (!isEqual(lastSavedConfig.current, state.savedConfig)) {
      logger.log("Saving config", state.savedConfig);
      debouncedOnSave(state.savedConfig);
      lastSavedConfig.current = state.savedConfig;
    } else {
      logger.log("No config change, not saving", state.savedConfig);
    }
  }, [debouncedOnSave, state.savedConfig, initialConfig]);

  return {
    state,
    dispatch: wrappedDispatch,
  };
}

export type AdminStageState = ReturnType<typeof useAdminStageState>;
