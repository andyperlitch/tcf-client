import { Badge } from "./ui/badge";

export function SongFeelBadge({
  songFeel,
}: {
  songFeel: string | null | undefined;
}) {
  return (
    <Badge variant="outline" size="lg" className="whitespace-nowrap">
      {songFeel || "?"}
    </Badge>
  );
}
