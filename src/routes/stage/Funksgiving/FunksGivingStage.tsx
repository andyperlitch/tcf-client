import QRCode from "react-qr-code";
import { useStageEvent } from "@/hooks/useStageEvent";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { StageActiveEngagement } from "../StageActiveEngagement";
import { useFunksgivingBackground } from "./useFunksgivingBackground";

export function FunksGivingStage() {
  const { slug } = useParamsSafe("slug");
  const { data } = useStageEvent("funksgiving");

  useFunksgivingBackground();

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
        <StageActiveEngagement event={data.event} />
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
