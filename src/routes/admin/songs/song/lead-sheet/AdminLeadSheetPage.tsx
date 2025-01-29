import { AdminContainer } from "@/components/AdminContainer";
import { Loader } from "@/components/Loader";
import { CrumbMeta, SimpleCrumbs } from "@/components/SimpleCrumbs";
import {
  LeadSheetFragment,
  SongFragment,
  useBandSongWithLeadSheetQuery,
} from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { useMemo } from "react";
import { LeadSheetEditor } from "./LeadSheetEditor";
import { KeyBadge } from "@/components/KeyBadge";
import { SongFeelBadge } from "@/components/SongFeelBadge";
import { TempoBadge } from "@/components/TempoBadge/TempoBadge";

export function AdminLeadSheetPage() {
  const { songId } = useParamsSafe("songId");

  const { data, loading } = useBandSongWithLeadSheetQuery({
    skip: !songId,
    variables: { id: parseInt(songId) },
  });

  const crumbs: CrumbMeta[] = useMemo(
    () => [
      ["/admin/songs", "Songs"],
      [`/admin/songs/${songId}`, data?.song?.title ?? `Song #${songId}`],
      [`leadsheet`, "Lead Sheet"],
    ],
    [songId, data?.song?.title]
  );

  const song = data?.song;

  return (
    <AdminContainer section="songs">
      <div className="mb-4 flex flex-col space-y-8">
        <SimpleCrumbs crumbs={crumbs} trailingSeparator={false} />
      </div>
      {loading && <Loader />}
      {song?.leadSheet && (
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{song.title || "Untitled"}</h1>

          <div data-name="SONG_INFO" className={`flex gap-2 text-xl font-bold`}>
            <KeyBadge songKey={song.key} />
            <TempoBadge tempo={song.tempo} />
            <SongFeelBadge songFeel={song.feel} />
          </div>
          <LeadSheetEditor
            songWithLeadSheet={
              song as SongFragment & { leadSheet: LeadSheetFragment }
            }
          />
        </div>
      )}
    </AdminContainer>
  );
}
