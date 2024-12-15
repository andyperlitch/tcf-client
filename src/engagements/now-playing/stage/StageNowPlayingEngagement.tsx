import {
  NowPlayingSubmissionData,
  StageEngagementFragment,
} from "@/gql/graphql";
import { useAudioInput } from "@/hooks/useAudioInput";
import { useEffect, useRef, useState } from "react";
import { DefaultSongViz } from "./DefaultSongViz";

const MOCK_SONG: NowPlayingSubmissionData = {
  order: 1,
  songAlbumArt: null,
  songArtist: "Greyboy Allstars",
  songTitle: "Let the music take your mind",
  songNotes: null,
  songLyrics: null,
};

export function StageNowPlayingEngagement({
  engagement,
}: {
  engagement: StageEngagementFragment;
}) {
  console.log(`andy engagement`, engagement);
  const { frequencyData } = useAudioInput({ fftSize: 128 });

  const rootRef = useRef<HTMLDivElement>(null);

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
      console.log(`andy newDimensions`, newDimensions);
      setDimensions(newDimensions);
    }
  }, []);

  return (
    <div
      data-name="NOW_PLAYING_ENGAGEMENT"
      className={`flex h-full w-full items-center justify-center pt-[18vh]`}
    >
      <div className="h-full w-full p-32">
        <div
          data-name="AUDIO_VIZ_WRAPPER"
          className="relative h-full w-full"
          ref={rootRef}
        >
          {dimensions.height && dimensions.width ? (
            <>
              <DefaultSongViz
                song={MOCK_SONG}
                width={dimensions.width}
                height={dimensions.height}
                frequencyData={frequencyData}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
