import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useState } from "react";
import { DatePicker } from "./ui/datepicker";
import { InlineConfirmCancel } from "./InlineConfirmCancel";

export interface EditableDateProps {
  value: string;
  setValue: (value: string) => void | Promise<any>;
  locked: boolean;
  className?: string;
  name?: string;
}

export function EditableDate({
  name = "date",
  value,
  setValue,
  locked,
  className,
}: EditableDateProps) {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const { toast } = useToast();

  return (
    <div
      data-name="EDITABLE-DATE"
      onClick={() => {
        if (!locked && !editing) {
          setEditing(true);
        }
      }}
      onDoubleClick={() => {
        if (locked) {
          toast({
            title: "Locked",
            description: "Cannot be edited.",
          });
        }
      }}
      className={`
        relative

        ${className}
      `}
    >
      {editing ? (
        <>
          <DatePicker
            name={name}
            value={localValue}
            onChange={(v) => setLocalValue(v.toISOString())}
            // TODO: this doesn't actually work, but the type requires it...
            onBlur={() => {
              // setEditing(false);
              // setValue(localValue);
            }}
          />
          <InlineConfirmCancel
            confirm={() => {
              setEditing(false);
              setValue(localValue);
            }}
            cancel={() => setEditing(false)}
          />
        </>
      ) : (
        <>📅 {format(value, "PPP")}</>
      )}
    </div>
  );
}
