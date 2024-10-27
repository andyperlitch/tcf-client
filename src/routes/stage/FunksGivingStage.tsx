import { CodeBlock } from "@/components/CodeBlock";
import { Engagement, EngagementType, StageGetEventQuery } from "@/gql/graphql";
import { useStageEvent } from "@/hooks/useStageEvent";
import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";

export function FunksGivingStage() {
  const { data } = useStageEvent("funksgiving");
  const { setBgImage } = useTheme();

  useEffect(() => {
    setBgImage("/funksgiving-stage-bg.png");
  }, []);

  return (
    <div
      className={`
        flex h-screen w-screen flex-col items-center justify-center gap-4
      `}
    >
      {data?.event?.activeEngagement ? (
        <ActiveEngagement engagement={data.event.activeEngagement} />
      ) : (
        <>
          <h1>Welcome to FunksGiving!</h1>
          <p>
            Scan the following QR code on your phone to be in on the action.
          </p>
        </>
      )}
      {/* <CodeBlock json={data} /> */}
    </div>
  );
}

function ActiveEngagement({
  engagement,
}: {
  engagement: NonNullable<StageGetEventQuery["event"]>["activeEngagement"];
}) {
  switch (engagement.type) {
    case EngagementType.PhotoCarousel: {
      return <PhotoCarousel engagement={engagement} />;
    }
    case EngagementType.VoteFor: {
      return <VoteFor engagement={engagement} />;
    }
  }

  return <div>{engagement.title}</div>;
}

function PhotoCarousel({
  engagement,
}: {
  engagement: NonNullable<StageGetEventQuery["event"]>["activeEngagement"];
}) {
  return <div>{engagement.title}</div>;
}

function VoteFor({
  engagement,
}: {
  engagement: NonNullable<StageGetEventQuery["event"]>["activeEngagement"];
}) {
  return <div>{engagement.title}</div>;
}
