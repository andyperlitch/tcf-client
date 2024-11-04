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
import { toFullS3Url } from "@/utils/toFullS3Url";

export function SubmissionsList({
  engagementId,
  engagementType,
}: {
  engagementId: number;
  engagementType: EngagementType;
}) {
  const { data, loading, error } = useAdminGetSubmissionsQuery({
    variables: { engagementId },
    skip: !engagementId,
  });

  const sortedSubmissions = useMemo(() => {
    if (!data) return [];
    return data.submissions.slice().sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.submissions.length) return <div>No submissions</div>;

  const DataCell =
    engagementType === EngagementType.PhotoCarousel
      ? PhotoCarouselDataCell
      : DefaultDataCell;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Submission ID</TableHeader>
          <TableHeader>Data</TableHeader>
          <TableHeader>Date/Time</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedSubmissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell>{submission.id}</TableCell>
            <DataCell data={submission.data} />
            <TableCell>{format(submission.createdAt, "Pp")}</TableCell>
            <TableCell>
              <DeleteSubmissionButton id={submission.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DefaultDataCell({ data }: { data: any }) {
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

function PhotoCarouselDataCell({ data }: { data: any }) {
  return (
    <TableCell>
      <img src={toFullS3Url(data.photoUrl)} className="h-24" />
      <p>{data.caption}</p>
    </TableCell>
  );
}
