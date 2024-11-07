import React from "react";
import { COLORS } from "@/consts/colors";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import styles from "./ColorPicker.module.css";

export const ColorPicker = React.forwardRef<
  HTMLInputElement,
  {
    value?: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    disabled?: boolean;
    name: string;
    className?: string;
  }
>(({ value, onChange, onBlur, disabled, name, className }, ref) => {
  return (
    <div className={className}>
      <input type="hidden" name={name} value={value} ref={ref} />
      <Popover>
        <PopoverTrigger disabled={disabled} onBlur={onBlur} asChild>
          <ColorCircle value={value} />
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex flex-row flex-wrap">
            {COLORS.map((c) => (
              <ColorCircle
                key={c}
                className={c === value ? styles.selected : ""}
                value={c}
                onClick={() => onChange(c)}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

ColorPicker.displayName = "ColorPicker";
const ColorCircle = React.forwardRef<
  HTMLDivElement,
  {
    value?: string;
    onClick?: () => void;
    className?: string;
  }
>(({ value, onClick, className }, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{ backgroundColor: value || "transparent" }}
      className={`
        ${styles.colorCircle}
        ${className || ""}
        ${onClick ? "cursor-pointer" : ""}
      `}
    />
  );
});

ColorCircle.displayName = "ColorCircle";
