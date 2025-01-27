import { AdminContainer } from "@/components/AdminContainer";
import { CrumbMeta, SimpleCrumbs } from "@/components/SimpleCrumbs";
import {
  LeadSheetFragment,
  SongFragment,
  useBandSongWithLeadSheetQuery,
} from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { LeadSheetEditor } from "./lead-sheet/LeadSheetEditor";
import { Button } from "@/components/ui/button";
import { SongDetailsEditor } from "./SongDetailsEditor";

export function AdminSongPage() {
  const { songId } = useParamsSafe("songId");

  const { data } = useBandSongWithLeadSheetQuery({
    skip: !songId,
    variables: { id: parseInt(songId) },
  });

  const crumbs: CrumbMeta[] = [
    ["/admin/songs", "Songs"],
    [`song-${songId}`, data?.song?.title ?? `Song #${songId}`],
  ];

  return (
    <AdminContainer section="songs">
      <div className="flex flex-col space-y-8">
        <SimpleCrumbs crumbs={crumbs} trailingSeparator={false} />
        <div data-name="SONG_DETAILS" className="flex space-y-8">
          {data?.song && <SongDetailsEditor song={data.song} />}
        </div>
        <div data-name="LEAD_SHEET_SECTION" className="flex flex-col space-y-8">
          <h2 className="text-2xl font-bold">Lead Sheet</h2>
          {data?.song?.leadSheet ? (
            <LeadSheetEditor
              songWithLeadSheet={
                data.song as SongFragment & { leadSheet: LeadSheetFragment }
              }
            />
          ) : (
            <Button variant="constructive" className="self-start">
              Create Lead Sheet
            </Button>
          )}
        </div>
      </div>
    </AdminContainer>
  );
}
