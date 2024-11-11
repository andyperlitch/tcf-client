import React, { useEffect, useRef, useState } from "react";
import { ResizableInput } from "./ResizableInput";
import { InlineConfirmCancel } from "./InlineConfirmCancel";
import { useToast } from "@/hooks/use-toast";

// EditableTextProps interface
interface EditableTextProps<T extends keyof JSX.IntrinsicElements> {
  value: string;
  setValue: (value: string) => void | Promise<any>;
  element: T; // The HTML tag (key of JSX Intrinsic Elements)
  elementProps?: Omit<JSX.IntrinsicElements[T], "onClick">; // Props for the element, except onClick
  locked?: boolean;
  className?: string;
}

export function EditableText<T extends keyof JSX.IntrinsicElements>({
  value,
  setValue,
  element: Element,
  elementProps = {} as JSX.IntrinsicElements[T],
  locked = false,
  className,
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
      setEditing(false);
    }
  };

  const checkForEnterOrEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
      onDoubleClick: () =>
        locked &&
        toast({
          variant: "destructive",
          title: "Event locked",
          description: "You cannot edit this field",
        }),
      onClick: () => !editing && !locked && setEditing(true), // Spread elementProps and handle click
    }, // Spread elementProps and handle click
    editing ? (
      <ResizableInput
        className={`
          inherit relative -left-[6px] -top-[2px] border-2 border-input
          bg-transparent pb-0 pl-[4px] pr-0 pt-0 text-inherit outline-1

          text-[length:inherit]
        `}
        disabled={loading}
        value={localValue}
        containerClassName="relative"
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={checkForEnterOrEscape}
        ref={inputRef}
        data-p1-ignore
      >
        <InlineConfirmCancel confirm={onConfirm} cancel={onCancel} />
      </ResizableInput>
    ) : (
      value
    )
  );
}
