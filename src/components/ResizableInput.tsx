import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Input, InputProps } from "./ui/input";
import { cn } from "@/lib/utils";

interface ResizableInputProps
  extends Omit<InputProps, "ref" | "value" | "onChange" | "className"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

export const ResizableInput = forwardRef<HTMLInputElement, ResizableInputProps>(
  (
    {
      value,
      onChange,
      className,
      containerClassName,
      children = null,
      ...inputProps
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const mirrorRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    // Update the input's width based on the content's width
    useEffect(() => {
      if (mirrorRef.current && inputRef.current) {
        inputRef.current.style.width = `${
          mirrorRef.current.offsetWidth + 10
        }px`; // Add padding
      }
    }, [value]);

    return (
      <div className={cn("inline-flex items-center", containerClassName)}>
        <Input
          ref={inputRef}
          replaceClassName
          value={value}
          onChange={onChange}
          className={cn("w-auto min-w-0 p-2", className)}
          {...inputProps}
        />
        <span
          ref={mirrorRef}
          className={`
            invisible absolute inherit text-inherit

            text-[length:inherit]
          `}
          aria-hidden="true"
        >
          {value || " "}
        </span>
        {children}
      </div>
    );
  }
);
