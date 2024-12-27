import { EventStageConfig } from "@/gql/graphql";

export interface SharedStageState {
  savedConfig: EventStageConfig;
  draftConfig: Partial<EventStageConfig>;
  selectedElementId?: string;
}

export type TextAlign = "left" | "center" | "right";
