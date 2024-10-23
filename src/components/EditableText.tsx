import React, { useEffect, useRef, useState } from "react";
import { ResizableInput } from "./ResizableInput";
import { Button } from "./ui/button";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

// EditableTextProps interface
interface EditableTextProps<T extends keyof JSX.IntrinsicElements> {
  value: string;
  setValue: (value: string) => void | Promise<any>;
  element: T; // The HTML tag (key of JSX Intrinsic Elements)
  elementProps?: Omit<JSX.IntrinsicElements[T], "onClick">; // Props for the element, except onClick
}

export function EditableText<T extends keyof JSX.IntrinsicElements>({
  value,
  setValue,
  element: Element,
  elementProps = {} as JSX.IntrinsicElements[T],
}: EditableTextProps<T>) {
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
    { ...elementProps, onClick: () => !editing && setEditing(true) }, // Spread elementProps and handle click
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
        <div
          className={`
            absolute left-0 top-[100%] flex justify-center space-x-2
            bg-background p-2 align-middle
          `}
        >
          <Button size="sm" variant="constructive" onClick={onConfirm}>
            <CheckIcon className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={onCancel}>
            <Cross2Icon className="h-4 w-4" />
          </Button>
        </div>
      </ResizableInput>
    ) : (
      value
    )
  );
}
