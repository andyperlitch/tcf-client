import { useState } from "react";
import { Badge } from "../ui/badge";
import styles from "./TempoBadge.module.css";

export function TempoBadge({ tempo }: { tempo: number | null | undefined }) {
  const [isPaused, setIsPaused] = useState(true);

  return (
    <Badge
      onClick={() => setIsPaused(!isPaused)}
      size="lg"
      className={`
        flex cursor-pointer items-baseline gap-1

        ${tempo ? (isPaused ? "" : styles.tempoPulse) : ""}
      `}
      variant="info"
      style={{
        animationDuration: tempo ? `${60 / tempo}s` : "0s",
      }}
    >
      <span className="font-bold">{tempo || "???"}</span>
      <span className="text-xs">bpm</span>
    </Badge>
  );
}
