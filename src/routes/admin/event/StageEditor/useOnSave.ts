import {
  UpdateEventStageConfigInput,
  useAdminUpdateEventStageConfigMutation,
} from "@/gql/graphql";
import { createLogger } from "@/utils/createLogger";
import { useCallback } from "react";

const logger = createLogger("useOnSave");

/**
 * @param eventId - The ID of the event to update
 * @returns A function that updates the event stage config in the database
 */
export function useOnSave(eventId: number) {
  const [updateEventStageConfig] = useAdminUpdateEventStageConfigMutation();

  return useCallback(
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
}
