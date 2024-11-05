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
import { ReloadIcon } from "@radix-ui/react-icons";
import { CreateVoteForChoiceButton } from "./CreateVoteForChoiceButton";

export function SubmissionsList({
  engagementId,
  engagementType,
}: {
  engagementId: number;
  engagementType: EngagementType;
}) {
  const { data, loading, error, refetch } = useAdminGetSubmissionsQuery({
    variables: { engagementId },
    skip: !engagementId,
  });

  const sortedSubmissions = useMemo(() => {
    if (!data) return [];
    return data.submissions.slice().sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [data]);

  let DataCell: React.ComponentType<{ data: any }>;
  switch (engagementType) {
    case EngagementType.PhotoCarousel:
      DataCell = PhotoCarouselDataCell;
      break;
    case EngagementType.VoteFor:
      DataCell = VoteForDataCell;
      break;
    default:
      DataCell = DefaultDataCell;
  }

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
          <CreateVoteForChoiceButton
            engagementId={engagementId}
            onCreated={() => refetch()}
          />
        )}
      </h2>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {data?.submissions.length ? (
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
      ) : (
        <div>No submissions</div>
      )}
    </>
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

function VoteForDataCell({ data }: { data: any }) {
  return (
    <TableCell className="text-center">
      <div className="font-bold">{data.title || "No title"}</div>
      {data.description && <div>{data.description}</div>}
      {data.photoUrl && (
        <div className="flex justify-center">
          <img
            src={toFullS3Url(data.photoUrl)}
            className={`h-24 rounded-full border-4 border-solid border-white`}
          />
        </div>
      )}
    </TableCell>
  );
}
