import { Badge } from "./ui/badge";

export function SongFeelBadge({
  songFeel,
}: {
  songFeel: string | null | undefined;
}) {
  return <Badge size="lg">{songFeel || "?"}</Badge>;
}
