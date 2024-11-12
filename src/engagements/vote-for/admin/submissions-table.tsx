import { DataCellProps } from "@/engagements/base/EngagementDefinition";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { useAdminUpdateSubmissionMutation } from "@/gql/graphql";
import { TableCell, TableHeader } from "@/components/ui/table";
import { ColorPicker } from "@/components/ColorPicker";

export function VoteForDataCell({ submission }: DataCellProps) {
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

export function VoteForDataHeaders() {
  return (
    <>
      <TableHeader>Label</TableHeader>
      <TableHeader>Photo</TableHeader>
      <TableHeader>Color</TableHeader>
    </>
  );
}
