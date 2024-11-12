import { useParamsSafe } from "@/hooks/useParamsSafe";
import { StageQR } from "./StageQR";
import useWindowSize from "@/hooks/useWindowSize";
import { StageEventFragment } from "@/gql/graphql";
import { StageEngagementTitle } from "../../engagements/StageEngagementTitle";

interface StageChromeProps {
  children: React.ReactNode;
  name: string;
  event?: StageEventFragment | null;
}

export function StageChrome({ children, name, event }: StageChromeProps) {
  const { slug } = useParamsSafe("slug");
  const { width } = useWindowSize();
  return (
    <div
      data-name={name}
      className={`flex h-screen w-screen items-stretch align-middle`}
    >
      <div data-name={`${name}-content`} className="flex-1">
        {children}
      </div>
      <div
        data-name={`${name}-SIDEBAR`}
        className={`
          flex-0 flex h-full w-[21vw] flex-col justify-end transition-opacity
          duration-1000

          ${event?.activeEngagement ? "opacity-100" : "opacity-0"}
        `}
      >
        <StageEngagementTitle event={event} />
        <StageQR
          className="mb-4 mr-4 mt-4"
          event={event}
          eventSlug={slug}
          width={width * 0.17}
          bgColor="#fae1aa77"
          fgColor="#894c37"
          bgQRColor="#fae1aa77"
        />
      </div>
    </div>
  );
}
