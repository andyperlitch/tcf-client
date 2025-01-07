import { Link1Icon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";

export function LinkInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div data-name="LINK_INPUT" className="flex items-center gap-2">
      <Link1Icon className="h-4 w-4" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
