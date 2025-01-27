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

  return (
    <AdminContainer section="songs">
      <div className="mb-4 flex flex-col space-y-8">
        <SimpleCrumbs crumbs={crumbs} trailingSeparator={false} />
      </div>
      {loading && <Loader />}
      {data?.song?.leadSheet && (
        <LeadSheetEditor
          songWithLeadSheet={
            data.song as SongFragment & { leadSheet: LeadSheetFragment }
          }
        />
      )}
    </AdminContainer>
  );
}
