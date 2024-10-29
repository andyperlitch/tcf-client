import { useAdminGetSubmissionsQuery } from "@/gql/graphql";
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

export function SubmissionsList({ engagementId }: { engagementId: number }) {
  const { data, loading, error } = useAdminGetSubmissionsQuery({
    variables: { engagementId },
    skip: !engagementId,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.submissions.length) return <div>No submissions</div>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Submission ID</TableHeader>
          <TableHeader>Data</TableHeader>
          <TableHeader>Date</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.submissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell>{submission.id}</TableCell>
            <TableCell>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">View data</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <CodeBlock json={submission.data} />
                </PopoverContent>
              </Popover>
            </TableCell>
            <TableCell>{format(submission.createdAt, "PPP")}</TableCell>
            <TableCell>
              <DeleteSubmissionButton id={submission.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
