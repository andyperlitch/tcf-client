import React, { useEffect, useRef, useState } from "react";
import { InlineConfirmCancel } from "./InlineConfirmCancel";
import { Textarea } from "./ui/textarea";

// EditableTextProps interface
interface EditableTextareaProps<T extends keyof JSX.IntrinsicElements> {
  value: string;
  setValue: (value: string) => void | Promise<any>;
  element: T; // The HTML tag (key of JSX Intrinsic Elements)
  showConfirmCancel?: boolean;
  elementProps?: Omit<JSX.IntrinsicElements[T], "onClick">; // Props for the element, except onClick
  locked?: boolean;
  className?: string;
  textareaClassName?: string;
  placeholder?: string;
  editing?: boolean;
  setEditing?: (editing: boolean) => void;
}

export function EditableTextarea<T extends keyof JSX.IntrinsicElements>({
  value,
  setValue,
  editing: editingProp,
  showConfirmCancel = true,
  setEditing: setEditingProp,
  element: Element,
  elementProps = {} as JSX.IntrinsicElements[T],
  locked = false,
  className,
  textareaClassName,
  placeholder,
}: EditableTextareaProps<T>) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [internalEditing, setInternalEditing] = useState(false);
  const editing = editingProp ?? internalEditing;
  const setEditing = setEditingProp ?? setInternalEditing;
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
      <div className={`relative inherit bg-transparent`}>
        <Textarea
          disabled={loading}
          value={localValue}
          className={`
            ${textareaClassName}

            text-inherit text-align-inherit font-size-inherit
          `}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={checkForEnterOrEscape}
          ref={inputRef}
          data-p1-ignore
        />
        {showConfirmCancel && (
          <InlineConfirmCancel confirm={onConfirm} cancel={onCancel} />
        )}
      </div>
    ) : (
      value || (
        <span className="italic text-muted-foreground">{placeholder}</span>
      )
    )
  );
}
