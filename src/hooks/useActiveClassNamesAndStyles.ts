import { ScreenElementFragment } from "@/gql/graphql";
import { useMemo } from "react";

export function useActiveClassNamesAndStyles(
  element: ScreenElementFragment,
  hasActiveEngagement: boolean
) {
  return useMemo(() => {
    const className = `
      absolute

      ${
        hasActiveEngagement
          ? element.engagementClassNames || ""
          : element.defaultClassNames || ""
      }
    `;
    const styles = hasActiveEngagement
      ? element.engagementStyles
      : element.defaultStyles;
    return { className, styles };
  }, [
    element.engagementClassNames,
    element.defaultClassNames,
    element.engagementStyles,
    element.defaultStyles,
    hasActiveEngagement,
  ]);
}
