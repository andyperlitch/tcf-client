import { SongFragment, useBandUpdateSongMutation } from "@/gql/graphql";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button, ButtonProps } from "./ui/button";
import { CheckIcon } from "@radix-ui/react-icons";

export function TempoSetter({
  song,
  className,
}: {
  song: SongFragment;
  className?: string;
}) {
  const tempo = song.tempo;
  const [draftValue, setDraftValue] = useState(tempo || 120);
  const [editing, setEditing] = useState(false);
  const editTempo = useCallback(() => {
    setEditing(true);
  }, []);

  const [updateSong, { loading: updatingSong }] = useBandUpdateSongMutation();
  const saveTempo = useCallback(() => {
    updateSong({
      variables: { songId: song.id, data: { tempo: draftValue } },
    }).then(() => {
      setEditing(false);
    });
  }, [draftValue, song.id, updateSong]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === "Tab") {
        saveTempo();
      }
    },
    [saveTempo]
  );

  return (
    <div data-name="TEMPO_SETTER" className="flex items-center gap-2">
      {!editing && (
        <Button
          className={className}
          type="button"
          variant="link"
          onClick={editTempo}
          onFocus={editTempo}
        >
          {`${tempo} bpm` || "-"}
        </Button>
      )}
      {editing && (
        <>
          <Input
            autoFocus
            type="number"
            disabled={updatingSong}
            className={`w-20`}
            value={draftValue}
            onChange={(e) => setDraftValue(Number(e.target.value))}
            onKeyDown={handleKeyDown}
          />
          <TempoTapper
            disabled={updatingSong}
            size="sm"
            onNewTempo={(newTempo) => setDraftValue(newTempo)}
          />
          <Button
            disabled={updatingSong}
            onClick={saveTempo}
            size="icon"
            variant="constructive"
          >
            <CheckIcon />
          </Button>
        </>
      )}
    </div>
  );
}

const BUFFER_SIZE = 5;
function TempoTapper({
  onNewTempo,
  ...buttonProps
}: {
  onNewTempo: (newTempo: number) => void;
} & ButtonProps) {
  // Buffer of the time deltas of the last 5 taps
  const [buffer, setBuffer] = useState<number[]>([]);
  const lastTapRef = useRef<number | null>(null);

  const handleTap = useCallback(() => {
    const now = Date.now();
    if (lastTapRef.current) {
      const delta = now - lastTapRef.current;
      setBuffer((prev) => {
        const newBuffer = [...prev, delta];
        if (newBuffer.length > BUFFER_SIZE) {
          newBuffer.shift();
        }
        return newBuffer;
      });
    }
    lastTapRef.current = now;
  }, []);

  useEffect(() => {
    if (buffer.length) {
      const average =
        buffer.reduce((acc, curr) => acc + curr, 0) / buffer.length;
      onNewTempo(Math.round(60000 / average));
    }
  }, [buffer, onNewTempo]);

  return (
    <Button onClick={handleTap} {...buttonProps}>
      tap
    </Button>
  );
}
