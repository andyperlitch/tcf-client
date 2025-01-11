import {
  EventStageConfig,
  EventFanConfig,
  ScreenElementFragment,
  StageEngagementFragment,
  FanEngagementFragment,
} from "@/gql/graphql";
import { EventScreenAction } from "@/providers/sharedActions";
import { Dispatch } from "react";

export type ScreenDraftElement = Partial<ScreenElementFragment> & {
  id: string;
};

export type StageSavedConfig = Partial<Omit<EventStageConfig, "elements">> & {
  elements: Record<string, ScreenElementFragment>;
  elementOrder: string[];
};

export type StageDraftConfig = Partial<Omit<EventStageConfig, "elements">> & {
  elements?: Record<string, ScreenDraftElement>;
  elementOrder?: string[];
};

export type EngagementMode = "none" | "guide" | "actual";

export interface SharedStageState {
  savedConfig: StageSavedConfig;
  draftConfig: StageDraftConfig;
  selectedElementId?: string | null;
  activeEngagement?: StageEngagementFragment | null;
  engagementMode: EngagementMode;
}

export type FanSavedConfig = Partial<Omit<EventFanConfig, "elements">> & {
  elements: Record<string, ScreenElementFragment>;
  elementOrder: string[];
};

export type FanDraftConfig = Partial<Omit<EventFanConfig, "elements">> & {
  elements?: Record<string, ScreenDraftElement>;
  elementOrder?: string[];
};

export interface SharedFanState {
  savedConfig: FanSavedConfig;
  draftConfig: FanDraftConfig;
  selectedElementId?: string | null;
  activeEngagement?: FanEngagementFragment | null;
  engagementMode: EngagementMode;
}

export type ScreenElementEditorProps = {
  elementId: string;
  dispatch: Dispatch<EventScreenAction>;
  state: SharedStageState | SharedFanState;
  enableLink?: boolean;
};

export type TextAlign = "left" | "center" | "right";
