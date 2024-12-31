import { ColorPicker } from "@/components/ColorPicker";
import { TextAlignPicker } from "@/components/TextAlignPicker";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";
import { StageElementFragment, StageEngagementFragment } from "@/gql/graphql";
import { FontSizeIcon } from "@radix-ui/react-icons";
import { useMemo, useCallback } from "react";

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
      const stylesKey = activeEngagement ? "engagementStyles" : "defaultStyles";
      onUpdate({
        ...element,
        [stylesKey]: {
          ...element[stylesKey],
          color: value,
        },
      });
    },
    [element, activeEngagement, onUpdate]
  );

  const setFontSize = useCallback(
    (newValue: string) => {
      const stylesKey = activeEngagement ? "engagementStyles" : "defaultStyles";
      onUpdate({
        ...element,
        [stylesKey]: { ...element[stylesKey], fontSize: newValue },
      });
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
