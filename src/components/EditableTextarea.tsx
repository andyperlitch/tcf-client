import React, { useEffect, useRef, useState } from "react";
import { InlineConfirmCancel } from "./InlineConfirmCancel";
import { Textarea } from "./ui/textarea";

// EditableTextProps interface
interface EditableTextareaProps<T extends keyof JSX.IntrinsicElements> {
  value: string;
  setValue: (value: string) => void | Promise<any>;
  element: T; // The HTML tag (key of JSX Intrinsic Elements)
  elementProps?: Omit<JSX.IntrinsicElements[T], "onClick">; // Props for the element, except onClick
  locked?: boolean;
  className?: string;
}

export function EditableTextarea<T extends keyof JSX.IntrinsicElements>({
  value,
  setValue,
  element: Element,
  elementProps = {} as JSX.IntrinsicElements[T],
  locked = false,
  className,
}: EditableTextareaProps<T>) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
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
      setEditing(false);
    }
  };

  const checkForEnterOrEscape = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && e.shiftKey) {
      onConfirm();
    }
    if (e.key === "Escape") {
      onCancel();
    }
  };

  useEffect(() => {
    if (!editing) {
      setLocalValue(value);
    }
  }, [value, editing]);

  // Select all text in the input when entering edit mode
  useEffect(() => {
    console.log(`andy inputRef.current`, inputRef.current);
    if (editing && inputRef.current) {
      inputRef.current.select();
    }
  }, [editing]);

  return React.createElement(
    Element,
    {
      className,
      ...elementProps,
      onClick: () => !editing && !locked && setEditing(true), // Spread elementProps and handle click
    }, // Spread elementProps and handle click
    editing ? (
      <div
        className={`
          inherit relative -left-[6px] -top-[2px] bg-transparent pb-0 pl-[4px]
          pr-0 pt-0 text-inherit outline-1

          text-[length:inherit]
        `}
      >
        <Textarea
          disabled={loading}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={checkForEnterOrEscape}
          ref={inputRef}
          data-p1-ignore
        />
        <InlineConfirmCancel confirm={onConfirm} cancel={onCancel} />
      </div>
    ) : (
      value
    )
  );
}
