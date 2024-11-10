import {
  AdminSubmissionFragment,
  EngagementType,
  useAdminGetSubmissionsQuery,
  useAdminUpdateSubmissionMutation,
} from "@/gql/graphql";
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
import { RandomizeChoiceColorsButton } from "./RandomizeChoiceColorsButton";
import { ColorPicker } from "./ColorPicker";
import { CreateVoteForChoiceForm } from "./CreateVoteForChoiceForm";

type DataCellProps = {
  submission: AdminSubmissionFragment;
};

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

  let DataCell: React.ComponentType<DataCellProps>;
  let DataHeaders: React.ComponentType;
  switch (engagementType) {
    case EngagementType.PhotoCarousel:
      DataCell = PhotoCarouselDataCell;
      DataHeaders = PhotoCarouselDataHeaders;
      break;
    case EngagementType.VoteFor:
      DataCell = VoteForDataCell;
      DataHeaders = VoteForDataHeaders;
      break;
    default:
      DataCell = DefaultDataCell;
      DataHeaders = DefaultDataHeaders;
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

function PhotoCarouselDataCell({ submission }: DataCellProps) {
  const data = submission?.data || {};
  return (
    <TableCell>
      <img src={toFullS3Url(data.photoUrl)} className="h-24" />
      <p>{data.caption}</p>
    </TableCell>
  );
}

function PhotoCarouselDataHeaders() {
  return <TableHeader>Photo/Caption</TableHeader>;
}

function VoteForDataCell({ submission }: DataCellProps) {
  const data = submission?.data || {};
  const [updateSubmission] = useAdminUpdateSubmissionMutation();
  return (
    <>
      <TableCell>
        <div className="font-bold">{data.title || "No title"}</div>
        {data.description && <div>{data.description}</div>}
      </TableCell>
      <TableCell className="text-center">
        {data.photoUrl && (
          <div className="flex justify-start">
            <img
              src={toFullS3Url(data.photoUrl)}
              className={`h-24 rounded-full border-4 border-solid border-white`}
            />
          </div>
        )}
      </TableCell>
      <TableCell>
        <ColorPicker
          value={data.color}
          name="color"
          onChange={(c) => {
            updateSubmission({
              variables: {
                id: submission.id,
                data: { ...data, color: c },
              },
            });
          }}
        />
      </TableCell>
    </>
  );
}

function VoteForDataHeaders() {
  return (
    <>
      <TableHeader>Label</TableHeader>
      <TableHeader>Photo</TableHeader>
      <TableHeader>Color</TableHeader>
    </>
  );
}
