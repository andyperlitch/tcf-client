import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { StageElementFragment, StageEngagementFragment } from "@/gql/graphql";
import { TextAlign } from "@/types/stage";
import {
  FontSizeIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import { useMemo } from "react";

export function TextElementEditor({
  element,
  onUpdate,
  activeEngagement,
}: {
  element: StageElementFragment;
  onUpdate: (element: StageElementFragment) => void;
  activeEngagement: StageEngagementFragment | null | undefined;
}) {
  const { fontSize, textAlign } = useMemo(() => {
    let fontSize: string;
    if (activeEngagement) {
      fontSize =
        element.engagementStyles?.fontSize ??
        element.defaultStyles?.fontSize ??
        "1.5vw";
    } else {
      fontSize = element.defaultStyles?.fontSize ?? "1.5vw";
    }

    let textAlign: string;
    if (element.defaultClassNames?.includes("text-center")) {
      textAlign = "center";
    } else if (element.defaultClassNames?.includes("text-right")) {
      textAlign = "right";
    } else {
      textAlign = "left";
    }

    return { fontSize, textAlign };
  }, [
    activeEngagement,
    element.defaultClassNames,
    element.defaultStyles?.fontSize,
    element.engagementStyles?.fontSize,
  ]);
  const setTextAlign = (value: TextAlign) => {
    onUpdate({
      ...element,
      defaultClassNames: updateTextAlignClass(
        element.defaultClassNames || "",
        value
      ),
    });
  };

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
            onChange={(newValue) => {
              const stylesKey = activeEngagement
                ? "engagementStyles"
                : "defaultStyles";
              onUpdate({
                ...element,
                [stylesKey]: { ...element[stylesKey], fontSize: newValue },
              });
            }}
          />
        </div>
        <div data-name="TEXT_ALIGN_EDITOR">
          <ToggleGroup
            type="single"
            value={textAlign}
            onValueChange={setTextAlign}
          >
            <ToggleGroupItem value="left" aria-label="Left Align">
              <TextAlignLeftIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Center Align">
              <TextAlignCenterIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Right Align">
              <TextAlignRightIcon className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
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

/**
 * Removes all the text-align-related classes and adds the specified one.
 */
function updateTextAlignClass(classes: string, value: TextAlign) {
  const currentClassNames = (classes || "").split(/\s/);
  const newClassNames = currentClassNames.filter(
    (className) =>
      !["text-center", "text-right", "text-left"].includes(className)
  );
  newClassNames.push(`text-${value}`);
  return newClassNames.join(" ");
}
