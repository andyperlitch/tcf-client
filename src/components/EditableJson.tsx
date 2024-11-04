import { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { InlineConfirmCancel } from "./InlineConfirmCancel";
import { useToast } from "@/hooks/use-toast";

export function EditableJson({
  value,
  setValue,
}: {
  value: any;
  setValue: (value: any) => void;
}) {
  const { toast } = useToast();
  const ref = useRef<HTMLPreElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState(200);
  const [editing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(
    JSON.stringify(value, null, 2)
  );

  const onConfirm = () => {
    let parsedValue: any;
    try {
      parsedValue = JSON.parse(editedValue);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Invalid JSON",
        description: "Please check your JSON and try again.",
      });
    }
    if (parsedValue) {
      setValue(parsedValue);
      setEditing(false);
    }
  };

  const onCancel = () => {
    setEditedValue(JSON.stringify(value, null, 2));
    setEditing(false);
  };

  const switchToEditMode = () => {
    if (ref.current) {
      // get height of pre
      const height = ref.current.clientHeight;
      // set textarea height to that
      setTextareaHeight(height);
      setEditedValue(JSON.stringify(value, null, 2));
      setEditing(true);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  const checkForCmdEnterOrEscape = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      onConfirm();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  if (!editing) {
    return (
      <pre
        ref={ref}
        onClick={switchToEditMode}
        className={`
          w-full whitespace-pre-wrap rounded bg-black p-4 font-mono text-lg
        `}
      >
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }

  return (
    <div className="relative">
      <Textarea
        className="w-full bg-slate-200 font-mono text-lg text-muted"
        ref={textareaRef}
        value={editedValue}
        onChange={(e) => setEditedValue(e.target.value)}
        onKeyDown={checkForCmdEnterOrEscape}
        style={{ height: textareaHeight }}
      />
      <InlineConfirmCancel confirm={onConfirm} cancel={onCancel} />
    </div>
  );
}
