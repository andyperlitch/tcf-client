import {
  StageEngagementFragment,
  useStageGetSubmissionQuery,
} from "@/gql/graphql";
import { useEffect, useRef, useState } from "react";
import { DefaultSongViz } from "./DefaultSongViz";

export function StageNowPlayingEngagement({
  engagement,
}: {
  engagement: StageEngagementFragment;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { data: submissionData } = useStageGetSubmissionQuery({
    skip:
      engagement.viewData.__typename !== "NowPlayingViewData" ||
      !engagement.viewData.currentSong,
    variables: {
      id:
        (engagement.viewData.__typename === "NowPlayingViewData" &&
          engagement.viewData.currentSong) ||
        0,
    },
  });

  const song =
    submissionData?.submission?.data.__typename === "NowPlayingSubmissionData"
      ? submissionData.submission.data
      : undefined;

  const [dimensions, setDimensions] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({ width: undefined, height: undefined });

  useEffect(() => {
    if (rootRef.current) {
      const newDimensions = {
        width: rootRef.current.clientWidth,
        height: rootRef.current.clientHeight,
      };
      setDimensions(newDimensions);
    }
  }, []);

  return (
    <div
      data-name="NOW_PLAYING_ENGAGEMENT"
      className={`flex h-full w-full items-center justify-center pt-[18vh]`}
    >
      <div className="w-full p-8 pt-0">
        <div
          data-name="AUDIO_VIZ_WRAPPER"
          className="relative h-full w-full"
          ref={rootRef}
        >
          {dimensions.width ? (
            <>
              <DefaultSongViz song={song} width={dimensions.width} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
