import { StageEventFragment } from "@/gql/graphql";
import styles from "./StageEngagementTitle.module.css";
import { useEffect, useMemo, useState } from "react";

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

  const inlineStyles = useMemo(
    () => ({
      fontSize: `${
        event?.activeEngagement?.title?.length || 0 > 18 ? "1.7vw" : "2.2vw"
      }`,
    }),
    [event?.activeEngagement?.title?.length]
  );

  console.log("inlineStyles", inlineStyles);

  return (
    <h1
      style={inlineStyles}
      data-name="ACTIVE_ENGAGEMENT_TITLE"
      className={`
        whitespace-nowrap rounded-full bg-foreground text-center font-stage

        ${styles.activeEngagementTitle}

        text-[#593312] transition-opacity duration-1000

        ${event?.activeEngagement ? "opacity-100" : "opacity-0"}
      `}
    >
      {text}
    </h1>
  );
}
