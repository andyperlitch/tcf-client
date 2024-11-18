import { EngagementType } from "@/gql/graphql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CodeBlock } from "./CodeBlock";
import { format } from "date-fns";
import { DeleteSubmissionButton } from "./DeleteSubmissionButton";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { RandomizeChoiceColorsButton } from "./RandomizeChoiceColorsButton";
import { DataCellProps } from "@/engagements/base/EngagementDefinition";
import { engagementDefinitions } from "@/engagements";
import { isMobile } from "react-device-detect";
import { useAdminOrderedSubmissions } from "@/hooks/useAdminOrderedSubmissions";

export function SubmissionsList({
  engagementId,
  engagementType,
  className,
  tableClassName,
}: {
  engagementId: number;
  engagementType: EngagementType;
  className?: string;
  tableClassName?: string;
}) {
  const { sortedSubmissions, loading, refetch } = useAdminOrderedSubmissions({
    engagementId,
  });

  const EngagementDefinition = engagementDefinitions[engagementType];
  const DataCell =
    EngagementDefinition.submissionsTableDataCell || DefaultDataCell;
  const DataHeaders =
    EngagementDefinition.submissionsTableHeaders || DefaultDataHeaders;
  const CreateSubmissionForm = EngagementDefinition.adminSubmissionForm || null;

  return (
    <div data-name="ADMIN-SUBMISSIONS-LIST" className={className}>
      <h2 className="mt-10 flex items-center space-x-5 text-2xl">
        <span>{EngagementDefinition.submissionsName || "Submissions"}</span>{" "}
        <Button
          variant="outline"
          size="icon"
          onClick={() => refetch()}
          disabled={loading}
        >
          <ReloadIcon className="h-4 w-4 text-white" />
        </Button>
        {engagementType === EngagementType.VoteFor && (
          <RandomizeChoiceColorsButton submissions={sortedSubmissions} />
        )}
      </h2>

      <Table className={tableClassName}>
        <TableHead>
          {CreateSubmissionForm && (
            <TableRow>
              <TableCell colSpan={10}>
                <CreateSubmissionForm
                  engagementId={engagementId}
                  existingSubmissions={sortedSubmissions}
                  onCreated={refetch}
                />
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            {isMobile ? null : <TableHeader>ID</TableHeader>}
            <DataHeaders />
            <TableHeader>Date/Time</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedSubmissions.map((submission) => (
            <TableRow key={submission.id}>
              {isMobile ? null : <TableCell>{submission.id}</TableCell>}
              <DataCell submission={submission} />
              <TableCell>
                {format(submission.createdAt, isMobile ? "p" : "Pp")}
              </TableCell>
              <TableCell>
                <DeleteSubmissionButton id={submission.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function DefaultDataCell({ submission }: DataCellProps) {
  const data = submission?.data || {};
  return (
    <TableCell>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">View data</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <CodeBlock json={data} />
        </PopoverContent>
      </Popover>
    </TableCell>
  );
}

function DefaultDataHeaders() {
  return <TableHeader>Data</TableHeader>;
}
