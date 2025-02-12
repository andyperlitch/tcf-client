import { Button } from "@/components/ui/button";
import { FanEngagementFragment, useFanGetSubmissionQuery } from "@/gql/graphql";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { Link } from "react-router-dom";

export function FanNowPlayingEngagement({
  engagement,
}: {
  engagement: FanEngagementFragment;
}) {
  const { data: submissionData } = useFanGetSubmissionQuery({
    skip:
      engagement.viewData.__typename !== "NowPlayingViewData" ||
      !engagement.viewData.currentSong,
    variables: {
      submissionId:
        (engagement.viewData.__typename === "NowPlayingViewData" &&
          engagement.viewData.currentSong) ||
        0,
    },
  });

  const song =
    submissionData?.submission?.data.__typename === "NowPlayingSubmissionData"
      ? submissionData.submission.data
      : undefined;

  console.log(`andy song`, song);

  return (
    <div
      data-name="FAN_NOW_PLAYING_ENGAGEMENT"
      className={`flex h-full w-full flex-col items-center justify-center`}
    >
      <div
        data-name="SONG_INFO"
        className={`
          flex w-[90%] flex-col items-center justify-center gap-2 rounded-md
          bg-white/70 p-4 font-fan text-black
        `}
      >
        {song?.songAlbumArt ? (
          <img
            src={toFullS3Url(song.songAlbumArt)}
            className={`w-[70vw] shadow-lg`}
          />
        ) : null}
        <div data-name="SONG_TITLE" className="text-2xl font-bold">
          {song?.songTitle}
        </div>
        <div data-name="SONG_ARTIST" className="text-lg">
          {song?.songArtist}
        </div>
        {song?.spotifyUrl && (
          <Link target="_blank" rel="noopener noreferrer" to={song.spotifyUrl}>
            <Button
              variant="informational"
              className={`flex gap-1 font-inter text-white`}
            >
              <span>View on</span>
              <img src="/spotify-full.png" className="h-6" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
