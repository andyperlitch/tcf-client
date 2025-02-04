import { DetailedGigSongFragment } from "@/gql/graphql";

import { GigFragment } from "@/gql/graphql";
import { toFullS3Url } from "@/utils/toFullS3Url";

export function InfoView({
  gigSong,
}: {
  gig: GigFragment;
  gigSong: DetailedGigSongFragment;
}) {
  return (
    <div data-name="INFO_VIEW">
      <div data-name="INFO_VIEW_SONG_ALBUM_COVER_ART">
        {gigSong.song?.coverArtUrl && (
          <img
            src={toFullS3Url(gigSong.song.coverArtUrl)}
            alt={gigSong.song?.title || ""}
          />
        )}
      </div>
    </div>
  );
}
