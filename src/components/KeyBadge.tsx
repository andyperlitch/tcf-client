import { Badge } from "./ui/badge";

export function KeyBadge({ songKey }: { songKey: string | null | undefined }) {
  return (
    <Badge
      data-name="SONG_KEY"
      size="lg"
      variant="outline"
      className={`font-bold`}
    >
      {songKey || "?"}
    </Badge>
  );
}
