import {
  EventStageConfig,
  StageElementFragment,
  StageEngagementFragment,
} from "@/gql/graphql";

export type StageSavedConfig = Partial<Omit<EventStageConfig, "elements">> & {
  elements: Record<string, StageElementFragment>;
  elementOrder: string[];
};

export type StageDraftElement = Partial<StageElementFragment> & {
  id: string;
};

export type StageDraftConfig = Partial<Omit<EventStageConfig, "elements">> & {
  elements?: Record<string, StageDraftElement>;
  elementOrder?: string[];
};

export interface SharedStageState {
  savedConfig: StageSavedConfig;
  draftConfig: StageDraftConfig;
  selectedElementId?: string | null;
  activeEngagement?: StageEngagementFragment | null;
}

export type TextAlign = "left" | "center" | "right";
