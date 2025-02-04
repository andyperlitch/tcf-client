import { DetailedGigSongFragment, GigFragment } from "@/gql/graphql";

export function LyricsView({
  gig,
  gigSong,
}: {
  gig: GigFragment;
  gigSong: DetailedGigSongFragment;
}) {
  return <div>LyricsView</div>;
}
