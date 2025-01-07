import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useMemo, useCallback } from "react";
import { TextAlign } from "@/types/screen";

export interface Props {
  /**
   * A class list (as a string) to update the text alignment for
   */
  value: string;
  onChange: (value: string) => void;
}

/**
 * Given a class list (value), this control will update the class list
 * to include the appropriate text alignment class.
 */
export function TextAlignPicker({ value, onChange }: Props) {
  const textAlign = useMemo(() => {
    let textAlign: string;
    if (value.includes("text-center")) {
      textAlign = "center";
    } else if (value.includes("text-right")) {
      textAlign = "right";
    } else if (value.includes("text-left")) {
      textAlign = "left";
    } else {
      textAlign = "";
    }
    return textAlign;
  }, [value]);

  const handleChange = useCallback(
    (newTextAlign: TextAlign) => {
      onChange(updateTextAlignClass(value, newTextAlign));
    },
    [onChange, value]
  );

  return (
    <ToggleGroup type="single" value={textAlign} onValueChange={handleChange}>
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
  );
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
