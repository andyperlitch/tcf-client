import { ScreenElementFragment } from "@/gql/graphql";

/**
 * In many cases, if a style is set to the same value on an engagement as default,
 * then updating the default style should also update the engagement style.
 */
export function createStyleUpdate(
  styleField: string,
  updatedValue: string,
  element: ScreenElementFragment,
  engagement: boolean
) {
  if (engagement) {
    return {
      ...element,
      engagementStyles: {
        ...element.engagementStyles,
        [styleField]: updatedValue,
      },
    };
  }

  const updates = {
    ...element,
    defaultStyles: {
      ...element.defaultStyles,
      [styleField]: updatedValue,
    },
  };

  if (
    element.engagementStyles?.[styleField] ===
    element.defaultStyles?.[styleField]
  ) {
    updates.engagementStyles[styleField] = updatedValue;
  }

  return updates;
}
