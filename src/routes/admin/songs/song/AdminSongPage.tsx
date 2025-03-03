import { AdminContainer } from "@/components/AdminContainer";
import { CrumbMeta, SimpleCrumbs } from "@/components/SimpleCrumbs";
import {
  LeadSheetFragment,
  SongFragment,
  useBandCreateLeadSheetMutation,
  useBandDeleteLeadSheetMutation,
  useBandSongWithLeadSheetQuery,
  useBandUpdateSongMutation,
} from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { LeadSheetEditor } from "./lead-sheet/LeadSheetEditor";
import { Button } from "@/components/ui/button";
import { SongDetailsEditor } from "./SongDetailsEditor";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { ErrorMessage } from "@/components/ErrorMessage";
import { TempoBadge } from "@/components/TempoBadge/TempoBadge";
import { KeyBadge } from "@/components/KeyBadge";
import { SongFeelBadge } from "@/components/SongFeelBadge";
import { InlineTypeoutConfirmButton } from "@/components/InlineTypeoutConfirmButton";
import { ImportLeadSheetFromGoogleDocButton } from "./lead-sheet/ImportLeadSheetFromGoogleDocButton";
import { EditableText } from "@/components/EditableText";
import { useCallback } from "react";
const crumbs: CrumbMeta[] = [["/admin/songs", "Songs"]];

export function AdminSongPage() {
  const params = useParamsSafe("songId");
  const songId = parseInt(params.songId);
  const { data, refetch } = useBandSongWithLeadSheetQuery({
    skip: typeof songId !== "number",
    variables: { id: songId },
  });
  const [deleteLeadSheet] = useBandDeleteLeadSheetMutation();
  const [updateSong] = useBandUpdateSongMutation();
  const [createLeadSheet] = useBandCreateLeadSheetMutation();
  const song = data?.song;

  const handleCreateLeadSheet = useCallback(() => {
    createLeadSheet({
      variables: { songId },
    }).then(() => refetch());
  }, [createLeadSheet, refetch, songId]);

  return (
    <AdminContainer section="songs">
      <div className="flex flex-col gap-8">
        {!song && <ErrorMessage error={new Error("Song not found")} />}
        {song && (
          <>
            <div data-name="SONG_HEADER" className="flex flex-col gap-2">
              <SimpleCrumbs crumbs={crumbs} />
              <EditableText
                className="text-3xl font-bold"
                value={song.title || "-"}
                setValue={(value) =>
                  updateSong({
                    variables: {
                      songId,
                      data: {
                        title: value,
                      },
                    },
                  })
                }
                element="h1"
                tabbable
              />
            </div>
            <div
              className={`
                flex flex-col gap-8

                xl:flex-row xl:gap-4
              `}
            >
              <div
                data-name="SONG_DETAILS"
                className={`flex flex-1 flex-col gap-2`}
              >
                <h2
                  className={`text-xl section-title italic text-muted-foreground`}
                >
                  Details
                </h2>
                <SongDetailsEditor song={song} />
              </div>
              {song.leadSheetEditUrl && (
                <div
                  data-name="GOOGLE_LEAD_SHEET_SECTION"
                  className="flex flex-1 flex-col gap-2"
                >
                  <h2
                    className={`
                      text-xl section-title italic text-muted-foreground
                    `}
                  >
                    Lead Sheet (Google Docs)
                  </h2>
                  <p>
                    To remove this section, clear the LeadSheet and
                    LeadSheetEditUrl columns in the{" "}
                    <a
                      href="https://docs.google.com/spreadsheets/d/1gRXICNsQmi5L-OkP0Qr5F8q2EO7IGlkeLXaKmX59g90/edit?gid=0#gid=0"
                      target="_blank"
                    >
                      google sheet
                      <ExternalLinkIcon className="inline-block" />
                    </a>
                    .
                  </p>
                  <div className="flex gap-2">
                    <Button asChild>
                      <a
                        href={song.leadSheetEditUrl}
                        target="_blank"
                        className={`flex items-center gap-1`}
                      >
                        <ExternalLinkIcon className="inline-block" />
                        <span>Edit Google Docs Version</span>
                      </a>
                    </Button>
                    {song.leadSheetUrl && (
                      <ImportLeadSheetFromGoogleDocButton
                        songId={songId}
                        leadSheetUrl={song.leadSheetUrl}
                        tooltip={
                          song.leadSheetId
                            ? "Delete existing lead sheet to sync from google"
                            : undefined
                        }
                        disabled={!!song.leadSheetId}
                        onSuccess={() => refetch()}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
            <div
              data-name="LEAD_SHEET_SECTION"
              className={`flex flex-col gap-2`}
            >
              <div
                data-name="LEAD_SHEET_SECTION_HEADER"
                className={`flex flex-col gap-2`}
              >
                <div className="flex justify-between gap-2">
                  <h2
                    className={`
                      text-xl section-title italic text-muted-foreground
                    `}
                  >
                    Lead Sheet
                  </h2>
                  {typeof song.leadSheetId === "number" ? (
                    <InlineTypeoutConfirmButton
                      variant="destructive"
                      message="Are you sure? This cannot be undone."
                      confirmText="delete"
                      onConfirm={async () => {
                        await deleteLeadSheet({
                          variables: { leadSheetId: song.leadSheetId! },
                        });
                        refetch();
                      }}
                    >
                      Delete Lead Sheet
                    </InlineTypeoutConfirmButton>
                  ) : (
                    <Button
                      variant="constructive"
                      className="self-start"
                      onClick={handleCreateLeadSheet}
                    >
                      Create Lead Sheet
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <div
                    data-name="SONG_INFO"
                    className={`flex gap-2 text-xl font-bold`}
                  >
                    <KeyBadge songKey={song.key} />
                    <TempoBadge tempo={song.tempo} />
                    <SongFeelBadge songFeel={song.feel} />
                  </div>
                </div>
              </div>
              {song.leadSheet && (
                <LeadSheetEditor
                  songWithLeadSheet={
                    song as SongFragment & { leadSheet: LeadSheetFragment }
                  }
                />
              )}
            </div>
          </>
        )}
      </div>
    </AdminContainer>
  );
}
