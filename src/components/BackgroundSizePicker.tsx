import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Label } from "./ui/label";

export interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function BackgroundSizePicker({ value, onChange }: Props) {
  return (
    <div
      data-name="BACKGROUND_SIZE_PICKER"
      className={`relative flex flex-col items-start gap-2`}
    >
      <Label>Background Size</Label>

      <ToggleGroup type="single" value={value} onValueChange={onChange}>
        <ToggleGroupItem value="contain" aria-label="Contain">
          contain
        </ToggleGroupItem>
        <ToggleGroupItem value="cover" aria-label="Cover">
          cover
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
