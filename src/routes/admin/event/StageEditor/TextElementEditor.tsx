import { ColorPicker } from "@/components/ColorPicker";
import { TextAlignPicker } from "@/components/TextAlignPicker";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";
import { StageElementFragment, StageEngagementFragment } from "@/gql/graphql";
import { FontSizeIcon } from "@radix-ui/react-icons";
import { useMemo, useCallback } from "react";

/**
 * In many cases, if a style is set to the same value on an engagement as default,
 * then updating the default style should also update the engagement style.
 */
function createStyleUpdate(
  styleField: string,
  updatedValue: string,
  element: StageElementFragment,
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

export function TextElementEditor({
  element,
  onUpdate,
  activeEngagement,
}: {
  element: StageElementFragment;
  onUpdate: (element: StageElementFragment) => void;
  activeEngagement: StageEngagementFragment | null | undefined;
}) {
  const { fontSize, classNames, color } = useMemo(() => {
    let fontSize: string;
    if (activeEngagement) {
      fontSize =
        element.engagementStyles?.fontSize ??
        element.defaultStyles?.fontSize ??
        "1.5vw";
    } else {
      fontSize = element.defaultStyles?.fontSize ?? "1.5vw";
    }

    const classNames = activeEngagement
      ? element.engagementClassNames
      : element.defaultClassNames;

    let color: string;
    if (activeEngagement) {
      color =
        element.engagementStyles?.color ??
        element.defaultStyles?.color ??
        "white";
    } else {
      color = element.defaultStyles?.color ?? "white";
    }

    return { fontSize, classNames, color };
  }, [
    activeEngagement,
    element.defaultClassNames,
    element.defaultStyles?.fontSize,
    element.engagementClassNames,
    element.engagementStyles?.fontSize,
    element.engagementStyles?.color,
    element.defaultStyles?.color,
  ]);

  const setClassNames = useCallback(
    (value: string) => {
      onUpdate({
        ...element,
        [activeEngagement ? "engagementClassNames" : "defaultClassNames"]:
          value,
      });
    },
    [element, activeEngagement, onUpdate]
  );

  const setColor = useCallback(
    (value: string) => {
      const updates = createStyleUpdate(
        "color",
        value,
        element,
        !!activeEngagement
      );
      onUpdate(updates);
    },
    [element, activeEngagement, onUpdate]
  );

  const setFontSize = useCallback(
    (newValue: string) => {
      const updates = createStyleUpdate(
        "fontSize",
        newValue,
        element,
        !!activeEngagement
      );
      onUpdate(updates);
    },
    [element, activeEngagement, onUpdate]
  );

  return (
    <div data-name="TEXT_ELEMENT_EDITOR">
      {/* Font */}
      <div className="flex items-center gap-2 pt-2">
        <div data-name="FONT_SIZE_EDITOR" className="flex items-center gap-2">
          <Label className="" title="Font size, 1 = 0.1vw">
            <FontSizeIcon />
          </Label>
          <NumberInput
            className="w-20"
            fromValue={fromVWFontSize}
            toValue={toVWFontSize}
            value={fontSize}
            onChange={setFontSize}
          />
        </div>
        <div data-name="TEXT_ALIGN_EDITOR">
          <TextAlignPicker value={classNames || ""} onChange={setClassNames} />
        </div>
        <div data-name="TEXT_COLOR_EDITOR">
          <ColorPicker
            trigger="square"
            picker="chrome"
            value={color}
            onChange={setColor}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Strips the `vw` from the font size and returns the number, times 10.
 */
function fromVWFontSize(value: string) {
  return Number(value.replace("vw", "")) * 10;
}

/**
 * Converts a number to a `vw` font size.
 */
function toVWFontSize(value: number) {
  return `${value / 10}vw`;
}
