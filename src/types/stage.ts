import { EventStageConfig } from "@/gql/graphql";

export interface SharedStageState {
  savedConfig: EventStageConfig;
  draftConfig: Partial<EventStageConfig>;
  selectedElementId?: string;
}
