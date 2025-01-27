import { Button } from "@/components/ui/button";
import {
  LeadSheetFragment,
  SongFragment,
  useBandCreateLeadSheetSectionMutation,
} from "@/gql/graphql";
import { useToast } from "@/hooks/use-toast";
import { useCallback, useMemo } from "react";
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

export function LeadSheetEditor({
  songWithLeadSheet: song,
}: {
  songWithLeadSheet: SongFragment & { leadSheet: LeadSheetFragment };
}) {
  const sections = useMemo(() => {
    return song.leadSheet?.sections ?? [];
  }, [song.leadSheet]);

  const { toast } = useToast();

  const [createSection, { loading: createSectionLoading }] =
    useBandCreateLeadSheetSectionMutation({
      update: (cache, { data }) => {
        if (!data?.createLeadSheetSection) return;

        const newSection = data.createLeadSheetSection;

        // Update the cache for LeadSheetFragment
        cache.modify({
          id: cache.identify(song.leadSheet),
          fields: {
            sections: (existingSections = []) => [
              ...existingSections,
              newSection,
            ],
          },
        });
      },
    });

  return (
    <div className="flex flex-col items-center space-y-4 rounded-sm border p-4">
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
              <TableHeader>Details</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {sections.map((section) => (
              <LeadSheetSectionProvider key={section.id} initialState={section}>
                <TableRow>
                  <TableCell>
                    <LeadSheetSectionHeaderCell />
                  </TableCell>
                  <TableCell>
                    <LeadSheetSectionLengthCell />
                  </TableCell>
                  <TableCell>
                    <LeadSheetSectionDetailsCell />
                  </TableCell>
                  <TableCell>
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
