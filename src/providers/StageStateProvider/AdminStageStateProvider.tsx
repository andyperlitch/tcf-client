import { useMemo, useRef, useEffect, RefObject } from "react";
import { isEqual } from "lodash";
import {
  AdminEventFragment,
  UpdateEventStageConfigInput,
  useAdminUpdateEventStageConfigMutation,
} from "@/gql/graphql";
import { adminStageStateContext } from "./AdminStageStateContext";
import { stripTypename } from "@/utils/stripTypename";
import { useCallback } from "react";
import { StageSavedConfig } from "@/types/screen";
import { useStageState } from "./StageStateContext";
import { createLogger } from "@/utils/createLogger";
import { debounce } from "lodash";
import { ActionType } from "./actions";
import { useIframe } from "@/hooks/use-iframe";
import { changeDefaultFont } from "../sharedActions";

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
  event: AdminEventFragment;
  iframeRef?: RefObject<HTMLIFrameElement> | null;
}) {
  const [updateEventStageConfig] = useAdminUpdateEventStageConfigMutation();

  // Create debounced version of onSave
  const debouncedOnSave = useMemo(
    () =>
      debounce((config: StageSavedConfig) => {
        logger.log("debouncedOnSave: ", {
          config,
        });
        updateEventStageConfig({
          variables: {
            id: event.id,
            data: configToInput(config),
          },
        });
      }, 500),
    [event.id, updateEventStageConfig]
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

  // in the case where there is a font set for the stage but not for the fan (or the other way around),
  // we want to set that same font on the other one
  useEffect(() => {
    if (event.stageConfig?.fontFamily && !event.fanConfig?.fontFamily) {
      dispatch(changeDefaultFont({ fontFamily: event.stageConfig.fontFamily }));
    } else if (!event.stageConfig?.fontFamily && event.fanConfig?.fontFamily) {
      dispatch(changeDefaultFont({ fontFamily: event.fanConfig.fontFamily }));
    }
  }, [event?.stageConfig?.fontFamily, event?.fanConfig?.fontFamily, dispatch]);

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
