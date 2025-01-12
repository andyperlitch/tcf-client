import {
  EngagementMode,
  SharedFanState,
  SharedStageState,
} from "@/types/screen";

/**
 * Takes into account that engagement mode can be guide or actual, and that
 * active engagement can be null.
 */
export function isEngagementActive(state: SharedFanState | SharedStageState) {
  return (
    state.engagementMode === EngagementMode.Guide ||
    (state.engagementMode === EngagementMode.Actual &&
      Boolean(state.activeEngagement))
  );
}
