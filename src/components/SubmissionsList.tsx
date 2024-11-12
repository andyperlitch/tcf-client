import { EngagementType, useAdminGetSubmissionsQuery } from "@/gql/graphql";
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
import { useMemo } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { RandomizeChoiceColorsButton } from "./RandomizeChoiceColorsButton";
import { CreateVoteForChoiceForm } from "./CreateVoteForChoiceForm";
import { DataCellProps } from "@/engagements/base/EngagementDefinition";
import { ENGAGEMENT_DEFINITIONS } from "@/engagements";

export function SubmissionsList({
  engagementId,
  engagementType,
}: {
  engagementId: number;
  engagementType: EngagementType;
}) {
  const { data, loading, refetch } = useAdminGetSubmissionsQuery({
    variables: { engagementId },
    skip: !engagementId,
  });

  const sortedSubmissions = useMemo(() => {
    if (!data) return [];
    return data.submissions.slice().sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [data]);

  const EngagementDefinition = ENGAGEMENT_DEFINITIONS[engagementType];
  const DataCell =
    EngagementDefinition.submissionsTableDataCell || DefaultDataCell;
  const DataHeaders =
    EngagementDefinition.submissionsTableHeaders || DefaultDataHeaders;

  return (
    <>
      <h2 className="mt-10 flex items-center space-x-5 text-2xl">
        <span>Submissions</span>{" "}
        <Button
          variant="outline"
          size="icon"
          onClick={() => refetch()}
          disabled={loading}
        >
          <ReloadIcon className="h-4 w-4 text-white" />
        </Button>
        {engagementType === EngagementType.VoteFor && (
          <RandomizeChoiceColorsButton submissions={data?.submissions} />
        )}
      </h2>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <DataHeaders />
            <TableHeader>Date/Time</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {engagementType === EngagementType.VoteFor && (
            <CreateVoteForChoiceForm
              engagementId={engagementId}
              onCreated={() => refetch()}
            />
          )}
          {sortedSubmissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell>{submission.id}</TableCell>
              <DataCell submission={submission} />
              <TableCell>{format(submission.createdAt, "Pp")}</TableCell>
              <TableCell>
                <DeleteSubmissionButton id={submission.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
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
