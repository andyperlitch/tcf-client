import { useMemo, useRef, useEffect, RefObject } from "react";
import { isEqual } from "lodash";
import {
  StageEventFragment,
  UpdateEventStageConfigInput,
  useAdminUpdateEventStageConfigMutation,
} from "@/gql/graphql";
import { adminStageStateContext } from "./AdminStageStateContext";
import { stripTypename } from "@/utils/stripTypename";
import { useCallback } from "react";
import { StageSavedConfig } from "@/types/stage";
import { useStageState } from "./useStageState";
import { createLogger } from "@/utils/createLogger";
import { debounce } from "lodash";
import { ActionType } from "./actions";
import { useIframe } from "@/hooks/use-iframe";

const logger = createLogger("AdminStageStateProvider");

function configToInput(config: StageSavedConfig): UpdateEventStageConfigInput {
  const { elementOrder, elements: elementLookup, ...rest } = config;
  return {
    ...stripTypename(rest),
    elements: elementOrder.map((elementId) =>
      stripTypename(elementLookup[elementId])
    ),
  };
}

export function AdminStageStateProvider({
  children,
  event,
  iframeRef,
}: {
  children: React.ReactNode;
  event: StageEventFragment;
  iframeRef?: RefObject<HTMLIFrameElement> | null;
}) {
  const [updateEventStageConfig] = useAdminUpdateEventStageConfigMutation();

  const onSave = useCallback(
    (input: StageSavedConfig) => {
      logger.info("useOnSave", input);
      updateEventStageConfig({
        variables: {
          id: event.id,
          data: configToInput(input),
        },
      });
    },
    [event.id, updateEventStageConfig]
  );

  // Create debounced version of onSave
  const debouncedOnSave = useMemo(
    () =>
      debounce((config: StageSavedConfig) => {
        logger.log("debouncedOnSave: ", {
          config,
        });
        onSave(config);
      }, 500),
    [onSave]
  );

  const { state, dispatch } = useStageState();

  // iframe handling
  const handler = useCallback(
    (message: ActionType) => {
      dispatch(message);
    },
    [dispatch]
  );
  const [dispatchIframe] = useIframe(handler, { ref: iframeRef || undefined });

  // Also dispatch to the iframe
  const wrappedDispatch = useCallback(
    (message: ActionType) => {
      dispatch(message);
      dispatchIframe(message);
    },
    [dispatch, dispatchIframe]
  );

  const lastSavedConfig = useRef(state.savedConfig);

  useEffect(() => {
    if (!isEqual(lastSavedConfig.current, state.savedConfig)) {
      logger.log("Saving config", state.savedConfig);
      debouncedOnSave(state.savedConfig);
      lastSavedConfig.current = state.savedConfig;
    } else {
      logger.log("No config change, not saving", state.savedConfig);
    }
  }, [debouncedOnSave, state.savedConfig]);

  const value = useMemo(
    () => ({
      state,
      dispatch: wrappedDispatch,
    }),
    [state, wrappedDispatch]
  );

  return (
    <adminStageStateContext.Provider value={value}>
      {children}
    </adminStageStateContext.Provider>
  );
}
