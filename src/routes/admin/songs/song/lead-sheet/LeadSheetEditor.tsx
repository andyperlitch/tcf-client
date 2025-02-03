import { Button } from "@/components/ui/button";
import {
  LeadSheetFragment,
  LeadSheetSectionFragmentDoc,
  SongFragment,
  useBandCreateLeadSheetSectionMutation,
} from "@/gql/graphql";
import { useToast } from "@/hooks/use-toast";
import { useCallback, useMemo, useState } from "react";
import { LeadSheetSectionHeaderCell } from "./LeadSheetSectionHeaderCell";
import { LeadSheetSectionLengthCell } from "./LeadSheetSectionLengthCell";
import { LeadSheetSectionDetailsCell } from "./LeadSheetSectionDetailsCell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeadSheetSectionProvider } from "./LeadSheetSectionProvider/provider";
import { LeadSheetSectionActionsCell } from "./LeadSheetSectionActionsCell";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import hoverStyles from "@/styles/ShowChildOnHover.module.css";
import { LeadSheetLyricsCell } from "./LeadSheetLyricsCell";
import useLocalStorage from "use-local-storage";

export function LeadSheetEditor({
  songWithLeadSheet: song,
}: {
  songWithLeadSheet: SongFragment & { leadSheet: LeadSheetFragment };
}) {
  const [showLyricHints, setShowLyricHints] = useLocalStorage(
    "show-lyric-hints",
    song.leadSheet.sections.some((section) => {
      return Boolean(section.lyricHint);
    })
  );
  const [showTimeCodes, setShowTimeCodes] = useLocalStorage(
    "show-time-codes",
    song.leadSheet.sections.some((section) => {
      return Boolean(section.timeCode);
    })
  );
  const [showLyrics, setShowLyrics] = useLocalStorage(
    "show-lyrics",
    song.leadSheet.sections.some((section) => {
      return Boolean(section.lyrics);
    })
  );

  const sections = useMemo(() => {
    return song.leadSheet?.sections ?? [];
  }, [song.leadSheet]);

  const { toast } = useToast();

  const [lastAddedSectionId, setLastAddedSectionId] = useState<number | null>(
    null
  );

  const [createSection, { loading: createSectionLoading }] =
    useBandCreateLeadSheetSectionMutation({
      update: (cache, { data }) => {
        if (!data?.createLeadSheetSection) return;

        const newSection = data.createLeadSheetSection;

        cache.writeFragment({
          id: cache.identify(newSection),
          fragment: LeadSheetSectionFragmentDoc,
          fragmentName: "LeadSheetSection",
          data: newSection,
        });

        // Update the cache for LeadSheetFragment
        cache.modify({
          id: cache.identify(song.leadSheet),
          fields: {
            sections: (existingSections = [], { toReference }) => [
              ...existingSections,
              toReference(newSection, true),
            ],
          },
        });

        setLastAddedSectionId(newSection.id);
      },
    });

  return (
    <div
      data-name="LEAD_SHEET_EDITOR"
      className={`flex flex-col items-center space-y-4 p-4`}
    >
      <div data-name="LEAD_SHEET_CONTROLS" className="flex w-full gap-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="lyric-hints"
            checked={showLyricHints}
            onCheckedChange={(checked) => setShowLyricHints(!!checked)}
          />
          <Label htmlFor="lyric-hints">show lyric hints</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="lyrics"
            checked={showLyrics}
            onCheckedChange={(checked) => setShowLyrics(!!checked)}
          />
          <Label htmlFor="lyrics">show lyrics</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="time-code"
            checked={showTimeCodes}
            onCheckedChange={(checked) => setShowTimeCodes(!!checked)}
          />
          <Label htmlFor="time-code">show time codes</Label>
        </div>
      </div>
      {sections.length === 0 && (
        <div
          className={`
            rounded-sm px-8 py-4 text-center text-xl backdrop-brightness-50
          `}
        >
          No sections yet 😓
          <br /> Add one!
        </div>
      )}
      {sections.length > 0 && (
        <Table data-name="LEAD_SHEET_SECTIONS" className={`w-full`}>
          <TableHead>
            <TableRow>
              <TableHeader className="w-1/3">Name</TableHeader>
              <TableHeader className="w-36">Length</TableHeader>
              {showLyrics && <TableHeader>Lyrics</TableHeader>}
              <TableHeader>Details</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {sections.map((section) => (
              <LeadSheetSectionProvider key={section.id} initialState={section}>
                <TableRow className="hover:bg-muted/10">
                  <TableCell className={`align-top`}>
                    <LeadSheetSectionHeaderCell
                      autoFocus={lastAddedSectionId === section.id}
                      showLyricHints={showLyricHints}
                      showTimeCodes={showTimeCodes}
                    />
                  </TableCell>
                  <TableCell className="align-top">
                    <LeadSheetSectionLengthCell />
                  </TableCell>
                  {showLyrics && (
                    <TableCell className={`align-top`}>
                      <LeadSheetLyricsCell />
                    </TableCell>
                  )}
                  <TableCell
                    className={`
                      relative align-top

                      ${hoverStyles.hoverParent}
                    `}
                  >
                    <LeadSheetSectionDetailsCell
                      addDetailButtonsClassName={hoverStyles.hoverChild}
                    />
                  </TableCell>
                  <TableCell className="align-top">
                    <LeadSheetSectionActionsCell />
                  </TableCell>
                </TableRow>
              </LeadSheetSectionProvider>
            ))}
          </TableBody>
        </Table>
      )}
      <Button
        disabled={createSectionLoading}
        size="lg"
        variant="constructive"
        onClick={useCallback(() => {
          createSection({
            variables: {
              leadSheetId: song.leadSheet.id,
              data: {
                name: "New section",
              },
            },
          }).catch((error) => {
            toast({
              title: "Error creating section",
              description: "Please try again in a moment",
              variant: "destructive",
            });
            console.error(error);
          });
        }, [createSection, song.leadSheet.id, toast])}
      >
        Add section
      </Button>
    </div>
  );
}
