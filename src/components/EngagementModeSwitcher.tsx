import { EngagementMode } from "@/types/screen";
import { Label } from "./ui/label";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export function EngagementModeSwitcher({
  value,
  onChange,
}: {
  value: EngagementMode;
  onChange: (mode: EngagementMode) => void;
}) {
  return (
    <div>
      <Label>Engagement Mode</Label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={onChange}
        className={`justify-start`}
      >
        <ToggleGroupItem value={EngagementMode.None} aria-label="None">
          none
        </ToggleGroupItem>
        <ToggleGroupItem value={EngagementMode.Guide} aria-label="Guide">
          guide
        </ToggleGroupItem>
        <ToggleGroupItem value={EngagementMode.Actual} aria-label="Actual">
          actual
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
