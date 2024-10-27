import { CodeBlock } from "@/components/CodeBlock";
import QRCode from "react-qr-code";
import { Engagement, EngagementType, StageGetEventQuery } from "@/gql/graphql";
import { useStageEvent } from "@/hooks/useStageEvent";
import { useEffect } from "react";
import { useParamsSafe } from "@/hooks/useParamsSafe";

export function FunksGivingStage() {
  const { slug } = useParamsSafe("slug");
  const { data } = useStageEvent("funksgiving");

  useEffect(() => {
    const body = window.document.body;
    const originalClassName = body.className;
    body.className = "";
    body.classList.add("bg-[url('/funksgiving-stage-bg.png')]");
    body.classList.add("bg-cover");
    body.classList.add("bg-[position:0_0]");

    return () => {
      body.className = originalClassName;
    };
  }, []);

  return (
    <div
      className={`
        flex h-screen w-screen flex-col items-center justify-center gap-4
      `}
    >
      <div
        className={`
          absolute right-4 top-4 flex items-center justify-center space-x-4
          rounded-lg bg-[#fae1aa77] p-4
        `}
      >
        <p className="w-[130px] text-center font-hand text-4xl text-[#894c37]">
          Only scan this if you're cool
          <br />
          <span className="text-6xl">👉</span>
        </p>
        <div className="">
          <QRCode
            value={`${window.location.origin}/e/${slug}`}
            size={130}
            level="L"
            fgColor="#894c37"
            bgColor="#fae1aa77"
          />
        </div>
      </div>
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
