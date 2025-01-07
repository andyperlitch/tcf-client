import { ScreenElementFragment, StageEngagementFragment } from "@/gql/graphql";
import { useMemo } from "react";

export function useActiveClassNamesAndStyles(
  element: ScreenElementFragment,
  activeEngagement: StageEngagementFragment | null | undefined
) {
  return useMemo(() => {
    const className = `
      absolute

      ${
        activeEngagement
          ? element.engagementClassNames || ""
          : element.defaultClassNames || ""
      }
    `;
    const styles = activeEngagement
      ? element.engagementStyles
      : element.defaultStyles;
    return { className, styles };
  }, [element, activeEngagement]);
}
