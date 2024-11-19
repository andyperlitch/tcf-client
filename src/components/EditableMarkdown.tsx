import React, { useEffect, useRef, useState } from "react";
import { InlineConfirmCancel } from "./InlineConfirmCancel";
import { Textarea } from "./ui/textarea";
import { Markdown } from "./Markdown";

// EditableTextProps interface
interface EditableMarkdownProps {
  value: string;
  setValue: (value: string) => void | Promise<any>;
  locked?: boolean;
  className?: string;
}

export function EditableMarkdown({
  value,
  setValue,
  locked = false,
  className,
}: EditableMarkdownProps) {
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

  return editing ? (
    <div
      className={`
        relative

        ${className}
      `}
    >
      <Textarea
        rows={15}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={checkForEnterOrEscape}
      />
      <InlineConfirmCancel
        confirm={onConfirm}
        cancel={onCancel}
        loading={loading}
      />
    </div>
  ) : (
    <div
      className={`
        ${className}
      `}
      onClick={() => !editing && !locked && setEditing(true)}
    >
      <Markdown className={className}>{value}</Markdown>
    </div>
  );
}
