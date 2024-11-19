import { useOnReactionsCreatedSubscription } from "@/gql/graphql";
import styles from "./StageReactions.module.css";
import { StageReactionFragment } from "@/gql/graphql";
import { useEffect, useRef, useState } from "react";

export function StageReactions({ submissionId }: { submissionId: number }) {
  const [visibleReactions, setVisibleReactions] = useState<
    { reaction: StageReactionFragment; leftStart: string }[]
  >([]);

  const timers = useRef<NodeJS.Timeout[]>([]);

  useOnReactionsCreatedSubscription({
    variables: { submissionId },
    onData: (data) => {
      if (data.data?.data?.reactionsCreated?.reactions?.length) {
        const reactions = data.data?.data?.reactionsCreated?.reactions;
        const reactionIds = reactions.map((r) => r.id);
        setVisibleReactions((prev) => [
          ...prev,
          ...reactions.map((reaction) => ({
            reaction,
            leftStart: `${Math.random() * 50 + 5}%`,
          })),
        ]);
        timers.current.push(
          setTimeout(() => {
            setVisibleReactions((prev) =>
              prev.filter((r) => !reactionIds.includes(r.reaction.id))
            );
          }, 5000)
        );
      }
    },
  });

  useEffect(() => {
    const timerIds = timers.current;
    return () => {
      timerIds.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div
      data-name="STAGE-REACTIONS"
      className="absolute top-[100vh] z-50 w-full"
    >
      {visibleReactions.map((r) => (
        <div
          className={`
            ${styles.floatUp}

            absolute top-0
          `}
          key={r.reaction.id}
          style={{ left: r.leftStart }}
        >
          <div
            className={`
              ${styles.jiggle}

              text-5xl
            `}
          >
            {r.reaction.type}
          </div>
        </div>
      ))}
    </div>
  );
}
