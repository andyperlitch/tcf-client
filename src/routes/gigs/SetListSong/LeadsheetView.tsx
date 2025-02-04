import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DetailedGigSongFragment,
  GigFragment,
  LeadSheetDetailType,
} from "@/gql/graphql";
import { LeadSheetChordDetail } from "./LeadSheetChordDetail";
import { LeadSheetImageDetail } from "./LeadSheetImageDetail";
import { LeadSheetTextDetail } from "./LeadSheetTextDetail";
import { SongView } from "./consts";
import { Fragment as F } from "react";
import { isCellPhone } from "@/utils/isCellPhone";

export function LeadsheetView({
  gigSong,
  view,
}: {
  gig: GigFragment;
  gigSong: DetailedGigSongFragment;
  view: SongView;
}) {
  const leadSheet = gigSong.song?.leadSheet;

  if (!leadSheet) {
    return <div>No lead sheet found</div>;
  }

  return (
    <div data-name="LEADSHEET_VIEW" className="flex flex-col">
      <Table>
        <TableBody>
          {leadSheet.sections.map((section) => (
            <TableRow key={section.id} className="even:bg-white/10">
              {!isCellPhone && (
                <TableCell className={`align-top`}>
                  <div
                    data-name="SECTION_NAME"
                    className={`flex min-h-[4rem] flex-col items-start gap-2`}
                  >
                    <div className="text-xl font-bold">{section.name}</div>
                    <div className="italic text-muted-foreground">
                      {section.lyricHint}
                    </div>
                  </div>
                </TableCell>
              )}
              {view === SongView.Leadsheet && !isCellPhone && (
                <TableCell>
                  <div
                    data-name="SECTION_LENGTH"
                    className={`text-lg text-advisory`}
                  >
                    {section.barLength}
                  </div>
                </TableCell>
              )}
              <TableCell>
                {isCellPhone && (
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-xl font-bold">{section.name}</div>
                    <div className="italic text-muted-foreground">
                      {section.barLength}
                    </div>
                  </div>
                )}
                {view === SongView.Leadsheet && (
                  <div
                    data-name="SECTION_DETAILS"
                    className={`flex flex-col gap-1`}
                  >
                    {section.details.map((detail) => {
                      switch (detail.type) {
                        case LeadSheetDetailType.Chords:
                          return (
                            <LeadSheetChordDetail
                              key={detail.id}
                              detail={detail}
                            />
                          );
                        case LeadSheetDetailType.Text:
                          return (
                            <LeadSheetTextDetail
                              key={detail.id}
                              detail={detail}
                            />
                          );
                        case LeadSheetDetailType.Image:
                          return (
                            <LeadSheetImageDetail
                              key={detail.id}
                              detail={detail}
                            />
                          );
                        default:
                          return null;
                      }
                    })}
                  </div>
                )}
                {view === SongView.Lyrics && (
                  <div
                    data-name="SECTION_LYRICS"
                    className={`flex flex-col gap-1 text-xl`}
                  >
                    <div className="min-h-8">
                      {section.lyrics?.split("\n").map((line, i) => (
                        <F key={i}>
                          {line}
                          {i < section.lyrics!.split("\n").length - 1 && <br />}
                        </F>
                      )) || (
                        <span className="italic text-muted-foreground">
                          No lyrics
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
