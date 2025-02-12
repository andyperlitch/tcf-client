import { AudioVizBars } from "@/components/AudioVizBars";
import { NowPlayingSubmissionData } from "@/gql/graphql";
import { useAudioInput } from "@/hooks/useAudioInput";
import { toFullS3Url } from "@/utils/toFullS3Url";

export function DefaultSongViz({
  song,
  width,
}: {
  song?: NowPlayingSubmissionData;
  width: number;
}) {
  const { frequencyData } = useAudioInput({ fftSize: 64 });

  return (
    <div
      data-name="DEFAULT_SONG_VIZ"
      className={`relative flex flex-col bg-white/70 p-4 text-black`}
    >
      <AudioVizBars
        className="absolute left-0 top-full"
        width={width}
        height={200}
        frequencyData={frequencyData}
        placement="top"
        // mirrored={true}
        // flipped={true}
        fillColor="#FFFFFFB3"
      />
      <AudioVizBars
        className="absolute bottom-full left-0"
        width={width}
        height={200}
        frequencyData={frequencyData}
        placement="bottom"
        // mirrored={true}
        // flipped
        fillColor="#FFFFFFB3"
      />
      <div className="relative flex items-center gap-4" data-name="SONG_INFO">
        {song?.songAlbumArt ? (
          <img
            src={toFullS3Url(song.songAlbumArt)}
            className={`flex w-[20vw] shadow-lg`}
          />
        ) : null}
        <div className="flex flex-col gap-0">
          <div
            className="font-stage text-[4vw] font-bold"
            data-name="SONG_TITLE"
          >
            {song?.songTitle}
          </div>
          <div className="font-stage text-[3vw]" data-name="SONG_ARTIST">
            {song?.songArtist}
          </div>
        </div>
      </div>
    </div>
  );
}
