import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface LiveSwitchProps {
  loading?: boolean;
  live: boolean;
  setLive: (live: boolean) => void;
}

export function LiveSwitch({ live, setLive, loading }: LiveSwitchProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="event-live"
        checked={live}
        onCheckedChange={setLive}
        disabled={loading}
      />
      <Label htmlFor="event-live">Live</Label>
    </div>
  );
}
