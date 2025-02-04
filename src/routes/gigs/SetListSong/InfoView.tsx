import { DetailedGigSongFragment } from "@/gql/graphql";

import { GigFragment } from "@/gql/graphql";

export function InfoView({
  gig,
  gigSong,
}: {
  gig: GigFragment;
  gigSong: DetailedGigSongFragment;
}) {
  return <div>InfoView</div>;
}
