import { GigSongFragment } from "@/gql/graphql";
import { GigFragment } from "@/gql/graphql";
import { To } from "react-router-dom";
import { SetBreak } from "./consts";

export function getSongOrBreakTitle(
  gigSongOrBreak: GigSongFragment | SetBreak | null
) {
  if (!gigSongOrBreak) return "-";

  return gigSongOrBreak.__typename === "SetBreak"
    ? "Set Break"
    : gigSongOrBreak.song?.title;
}

export function getSongOrBreakUrl(
  gig: Pick<GigFragment, "id"> | null,
  gigSongOrBreak: Pick<GigSongFragment, "id" | "__typename"> | SetBreak | null
): To {
  if (!gig || !gigSongOrBreak) return "";

  return gigSongOrBreak.__typename === "SetBreak"
    ? `/gigs/${gig?.id}/setbreak/${gigSongOrBreak.lastSetId}/${gigSongOrBreak.nextSetId}`
    : `/gigs/${gig?.id}/songs/${gigSongOrBreak.id}`;
}
