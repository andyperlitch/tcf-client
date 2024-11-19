import { useCallback, useRef, useState } from "react";
import styles from "./FanReactionButtons.module.css";
export function FanReactionButtons({
  reactionTypes,
  onReaction,
}: {
  reactionTypes: string[];
  onReaction: (type: string) => void;
}) {
  const nextReactionId = useRef(1);
  const [reactions, setReactions] = useState<
    { id: number; type: string; rect: DOMRect }[]
  >([]);
  const handleReaction = useCallback(
    (event: React.MouseEvent, type: string) => {
      const id = nextReactionId.current++;
      const rect = event.currentTarget.getBoundingClientRect();
      setReactions((prev) => [
        ...prev,
        {
          type,
          id,
          rect,
        },
      ]);
      setTimeout(() => {
        setReactions((prev) => prev.filter((reaction) => reaction.id !== id));
      }, 5000);
      onReaction(type);
    },
    [onReaction]
  );

  return (
    <div data-name="FAN-REACTION-BUTTONS" className="flex flex-wrap gap-2">
      {reactionTypes.map((reaction) => (
        <div
          onClick={(e) => handleReaction(e, reaction)}
          className={`
            relative z-20 rounded-full bg-[#FFFFFF11] p-4 text-4xl

            active:bg-white
          `}
          key={reaction}
        >
          {reaction}
        </div>
      ))}
      <div
        data-name="FAN-FLOATING-REACTIONS"
        className={`absolute left-0 top-0 h-screen w-screen`}
      >
        {reactions.map((reaction) => (
          <div
            key={reaction.id}
            className={`
              absolute z-50

              ${styles.floatUp}
            `}
            style={{
              top: `${reaction.rect.top}px`,
              left: `${reaction.rect.left}px`,
            }}
          >
            <div
              className={`
                ${styles.jiggle}

                text-4xl
              `}
            >
              {reaction.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
