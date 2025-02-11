import React, { useEffect, useRef, useState } from "react";
import { ResizableInput } from "./ResizableInput";
import { InlineConfirmCancel } from "./InlineConfirmCancel";
import { useToast } from "@/hooks/use-toast";

// Split into base props and the mutually exclusive ones
type BaseEditableTextProps<T extends keyof JSX.IntrinsicElements> = {
  /**
   * The name of the field, used for debugging
   */
  name?: string;
  value: string;
  setValue: (value: string) => void | Promise<any>;
  /**
   * The HTML tag to render when NOT an input (key of JSX Intrinsic Elements)
   */
  element: T;
  /**
   * Props for the element, except onClick
   */
  elementProps?: Omit<JSX.IntrinsicElements[T], "onClick">;
  locked?: boolean;
  className?: string;
  /**
   * Placeholder text to display when the value is empty
   */
  placeholder?: string;
  /**
   * Whether to show the confirm/cancel buttons
   */
  showConfirmCancel?: boolean;
  /**
   * Class name for the input
   */
  inputClassName?: string;
};

// Props when tabbable is true
type TabbableProps = {
  /**
   * Whether to allow a user to "tab into" editing this field
   */
  tabbable: true;
  /**
   * Whether to cancel on blur
   */
  cancelOnBlur?: false;
};

// Props when cancelOnBlur is true
type CancelOnBlurProps = {
  /**
   * Whether to cancel on blur
   */
  cancelOnBlur: true;
  /**
   * Whether to allow a user to "tab into" editing this field
   */
  tabbable?: false;
};

// Props when neither is true
type NeitherProps = {
  /**
   * Whether to allow a user to "tab into" editing this field
   */
  tabbable?: false;
  /**
   * Whether to cancel on blur
   */
  cancelOnBlur?: false;
};

// Combine into final interface
type EditableTextProps<T extends keyof JSX.IntrinsicElements> =
  BaseEditableTextProps<T> & (TabbableProps | CancelOnBlurProps | NeitherProps);

export function EditableText<T extends keyof JSX.IntrinsicElements>({
  value,
  setValue,
  element: Element,
  elementProps = {} as JSX.IntrinsicElements[T],
  placeholder = "-",
  showConfirmCancel = true,
  locked = false,
  className,
  cancelOnBlur = false,
  tabbable = false,
  name,
  inputClassName,
}: EditableTextProps<T>) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [loading, setLoading] = useState(false);

  const onCancel = () => {
    setEditing(false);
  };

  const onConfirm = () => {
    const maybePromise = setValue(localValue);
    if (maybePromise) {
      setLoading(true);
      maybePromise.finally(() => {
        setLoading(false);
        setEditing(false);
      });
    } else {
      // delay by a tick so that tab functionality works
      setTimeout(() => {
        setEditing(false);
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onConfirm();
    }
    if (e.key === "Escape") {
      onCancel();
    }
    if (e.key === "Tab") {
      if (cancelOnBlur) {
        onCancel();
      } else if (tabbable) {
        onConfirm();
      }
    }
  };

  useEffect(() => {
    if (!editing) {
      setLocalValue(value);
    }
  }, [value, editing]);

  // Select all text in the input when entering edit mode
  useEffect(() => {
    if (editing && inputRef.current) {
      console.log("selecting text");
      inputRef.current.select();
    }
  }, [editing]);

  return React.createElement(
    Element,
    {
      className,
      // Spread elementProps and handle click
      ...elementProps,
    },
    editing ? (
      <ResizableInput
        className={`
          inherit relative -left-[6px] -top-[2px] border-2 border-input
          bg-transparent pb-0 pl-[4px] pr-0 pt-0 text-inherit outline-1

          text-[length:inherit]

          ${inputClassName}
        `}
        disabled={loading}
        value={localValue}
        containerClassName="relative"
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={cancelOnBlur ? onCancel : tabbable ? onConfirm : undefined}
        ref={inputRef}
        data-p1-ignore
        name={name || "editabletext"}
      >
        {showConfirmCancel && !tabbable && (
          <InlineConfirmCancel confirm={onConfirm} cancel={onCancel} />
        )}
      </ResizableInput>
    ) : locked ? (
      <span
        onDoubleClick={() =>
          locked &&
          toast({
            variant: "destructive",
            title: "Event locked",
            description: "You cannot edit this field",
          })
        }
      >
        {value || placeholder}
      </span>
    ) : (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setEditing(true);
        }}
        onFocus={() => tabbable && setEditing(true)}
        className={`
          text-inherit

          ${value.trim() === "" ? "italic text-muted-foreground" : ""}
        `}
      >
        {value || placeholder}
      </a>
    )
  );
}
