import { AdminEngagementFragment, EngagementType } from "@/gql/graphql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CodeBlock } from "./CodeBlock";
import { DeleteSubmissionButton } from "./DeleteSubmissionButton";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Pencil1Icon, ReloadIcon } from "@radix-ui/react-icons";
import { RandomizeChoiceColorsButton } from "./RandomizeChoiceColorsButton";
import { DataCellProps } from "@/engagements/base/EngagementDefinition";
import { engagementDefinitions } from "@/engagements";
import { useAdminOrderedSubmissions } from "@/hooks/useAdminOrderedSubmissions";
import { Link } from "react-router-dom";
import { useParamsSafe } from "@/hooks/useParamsSafe";

export function SubmissionsList({
  engagement,
  className,
  tableClassName,
}: {
  engagement: AdminEngagementFragment;
  className?: string;
  tableClassName?: string;
}) {
  const { slug } = useParamsSafe("slug");
  const { sortedSubmissions, loading, refetch } = useAdminOrderedSubmissions({
    engagementId: engagement?.id,
  });

  const EngagementDefinition = engagementDefinitions[engagement.type];
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
        {engagement.type === EngagementType.VoteFor && (
          <RandomizeChoiceColorsButton submissions={sortedSubmissions} />
        )}
      </h2>

      <Table className={tableClassName}>
        <TableHead>
          {CreateSubmissionForm && (
            <TableRow>
              <TableCell colSpan={10}>
                <CreateSubmissionForm
                  engagementId={engagement.id}
                  existingSubmissions={sortedSubmissions}
                  onCreated={refetch}
                />
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <DataHeaders engagement={engagement} />
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedSubmissions.map((submission) => (
            <TableRow key={submission.id}>
              <DataCell submission={submission} engagement={engagement} />
              <TableCell>
                <DeleteSubmissionButton id={submission.id} />
                <Link
                  to={`/admin/events/${slug}/engagements/${engagement.id}/submissions/${submission.id}`}
                >
                  <Button size="icon" variant="informational">
                    <Pencil1Icon className="h-4 w-4" />
                  </Button>
                </Link>
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
