import QRCode from "react-qr-code";
import { useStageEvent } from "@/hooks/useStageEvent";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { StageActiveEngagement } from "../StageActiveEngagement";
import { useFunksgivingBackground } from "./useFunksgivingBackground";
import useWindowSize from "@/hooks/useWindowSize";

export function FunksGivingStage() {
  const { slug } = useParamsSafe("slug");
  const { data } = useStageEvent("funksgiving");
  const { width } = useWindowSize();

  useFunksgivingBackground();

  return (
    <div
      className={`
        flex h-screen w-screen flex-col items-center justify-center gap-4
      `}
    >
      <div
        className={`
          absolute right-4 top-4 flex h-screen flex-col items-center
          justify-center space-x-4
        `}
      >
        <div className="flex flex-col items-center">
          <p className="text-center font-hand text-6xl text-[#894c37]">
            Only scan this
            <br /> if you're cool
          </p>
          <div className="mb-4 mt-2 text-6xl">👇</div>
          <div className="rounded-lg bg-[#fae1aa77] p-4">
            <QRCode
              value={`${window.location.origin}/e/${slug}`}
              size={width * 0.15}
              level="L"
              fgColor="#894c37"
              bgColor="#fae1aa77"
            />
          </div>
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
