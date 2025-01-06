import { ColorPicker } from "@/components/ColorPicker";
import { FontPicker } from "@/components/FontPicker";
import { TextAlignPicker } from "@/components/TextAlignPicker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";
import { updateStageElement } from "@/providers/StageStateProvider/actions";
import { useAdminStageState } from "@/providers/StageStateProvider/AdminStageStateContext";
import { FontSizeIcon } from "@radix-ui/react-icons";
import { useMemo, useCallback, useState } from "react";
import { createStyleUpdate } from "@/utils/createStyleUpdate";

export function TextElementEditor({ elementId }: { elementId: string }) {
  const { state, dispatch } = useAdminStageState();
  const element = state.savedConfig.elements[elementId];
  const activeEngagement = state.activeEngagement;

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
      dispatch(
        updateStageElement({
          element: {
            ...element,
            [activeEngagement ? "engagementClassNames" : "defaultClassNames"]:
              value,
          },
        })
      );
    },
    [dispatch, element, activeEngagement]
  );

  const setColor = useCallback(
    (value: string) => {
      const updates = createStyleUpdate(
        "color",
        value,
        element,
        !!activeEngagement
      );
      dispatch(updateStageElement({ element: updates }));
    },
    [dispatch, element, activeEngagement]
  );

  const setFontSize = useCallback(
    (newValue: string) => {
      const updates = createStyleUpdate(
        "fontSize",
        newValue,
        element,
        !!activeEngagement
      );
      dispatch(updateStageElement({ element: updates }));
    },
    [dispatch, element, activeEngagement]
  );

  const [overrideFontFamily, setOverrideFontFamily] = useState(
    Boolean(element.fontFamily && element.fontFamily.length > 0)
  );

  const setFontFamily = useCallback(
    (value: string[] | null | undefined) => {
      dispatch(
        updateStageElement({ element: { ...element, fontFamily: value } })
      );
    },
    [dispatch, element]
  );

  return (
    <div data-name="TEXT_ELEMENT_EDITOR" className="flex flex-col gap-2">
      {/* Basics: size, color, alignment */}
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

      {/* Font */}
      <div data-name="FONT_FAMILY">
        {overrideFontFamily && (
          <FontPicker
            value={element.fontFamily || state.savedConfig.fontFamily || []}
            onChange={setFontFamily}
          />
        )}
        {!overrideFontFamily && (
          <Button variant="link" onClick={() => setOverrideFontFamily(true)}>
            Override Font Family
          </Button>
        )}
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
