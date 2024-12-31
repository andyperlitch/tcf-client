import React from "react";
import { COLORS } from "@/consts/colors";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import styles from "./ColorPicker.module.css";
import { ChromePicker, SketchPicker } from "react-color";
import { ThemeOverride } from "@/providers/ThemeOverride";

export const ColorPicker = React.forwardRef<
  HTMLInputElement,
  {
    value?: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    disabled?: boolean;
    name?: string;
    className?: string;
    picker?: "simple" | "chrome" | "sketch";
    trigger?: "circle" | "square";
  }
>(
  (
    {
      value,
      onChange,
      onBlur,
      disabled,
      name,
      className,
      picker = "simple",
      trigger = "circle",
    },
    ref
  ) => {
    return (
      <div className={className}>
        <input type="hidden" name={name} value={value} ref={ref} />
        <Popover>
          <PopoverTrigger disabled={disabled} onBlur={onBlur} asChild>
            <ColorTrigger trigger={trigger} value={value} />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            {picker === "simple" && (
              <div className="flex flex-row flex-wrap">
                {COLORS.map((c) => (
                  <ColorTrigger
                    key={c}
                    className={c === value ? styles.selected : ""}
                    value={c}
                    onClick={() => onChange(c)}
                  />
                ))}
              </div>
            )}
            {picker === "chrome" && (
              <ThemeOverride theme="light">
                <ChromePicker
                  color={value}
                  onChangeComplete={(color) => onChange(color.hex)}
                  disableAlpha={true}
                />
              </ThemeOverride>
            )}
            {picker === "sketch" && (
              <ThemeOverride theme="light">
                <SketchPicker
                  color={value}
                  onChangeComplete={(color) => onChange(color.hex)}
                />
              </ThemeOverride>
            )}
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";
const ColorTrigger = React.forwardRef<
  HTMLDivElement,
  {
    trigger?: "circle" | "square";
    value?: string;
    onClick?: () => void;
    className?: string;
  }
>(({ trigger, value, onClick, className }, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{ backgroundColor: value || "transparent" }}
      className={`
        ${trigger === "square" ? styles.colorSquare : styles.colorCircle}
        ${className || ""}
        ${onClick ? "cursor-pointer" : ""}
      `}
    />
  );
});

ColorTrigger.displayName = "ColorCircle";
