import { StageEventFragment } from "@/gql/graphql";
import styles from "./StageEngagementTitle.module.css";
import { useEffect, useState } from "react";

export function StageEngagementTitle({
  event,
}: {
  event?: StageEventFragment | null;
}) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (event?.activeEngagement?.title?.length) {
      setText(event.activeEngagement.title);
    }
  }, [event?.activeEngagement?.title]);

  return (
    <h1
      data-name="ACTIVE-ENGAGEMENT-TITLE"
      className={`
        mr-4 whitespace-nowrap rounded-full bg-foreground p-4 pt-6 text-center
        font-hand

        ${styles.activeEngagementTitle}
        ${
          (event?.activeEngagement?.title?.length || 0) > 18
            ? `text-4xl`
            : `text-5xl`
        }

        text-[#593312] transition-opacity duration-1000

        ${event?.activeEngagement ? "opacity-100" : "opacity-0"}
      `}
    >
      {text}
    </h1>
  );
}
