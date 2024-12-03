import { AudioVizBars } from "@/components/AudioVizBars";
import { NowPlayingSubmissionData } from "@/gql/graphql";

export function DefaultSongViz({
  song,
  width,
  frequencyData,
}: {
  song?: NowPlayingSubmissionData;
  width: number;
  height?: number;
  frequencyData: Uint8Array | null;
}) {
  return (
    <div
      data-name="DEFAULT_SONG_VIZ"
      className={`relative flex flex-col bg-[#00000055] p-16 shadow`}
    >
      <AudioVizBars
        className="absolute left-0 top-0"
        width={width}
        height={100}
        frequencyData={frequencyData}
        placement="top"
        mirrored={true}
        fillColor="#FFFFFF22"
      />
      <AudioVizBars
        className="absolute bottom-0 left-0"
        width={width}
        height={100}
        frequencyData={frequencyData}
        placement="bottom"
        mirrored={true}
        flipped={true}
        fillColor="#FFFFFF22"
      />
      <div className="relative" data-name="SONG_INFO">
        <div className="text-3xl" data-name="SONG_ARTIST">
          {song?.songArtist}
        </div>
        <div className="text-3xl font-bold" data-name="SONG_TITLE">
          {song?.songTitle}
        </div>
      </div>
    </div>
  );
}
