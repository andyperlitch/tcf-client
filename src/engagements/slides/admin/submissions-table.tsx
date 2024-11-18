import { TableCell, TableHeader } from "@/components/ui/table";
import { DataCellProps } from "@/engagements/base/EngagementDefinition";
import { SlidesSubmissionData } from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { Link } from "react-router-dom";

export function SlidesDataHeaders() {
  return (
    <>
      <TableHeader>Title</TableHeader>
      <TableHeader>Content</TableHeader>
      <TableHeader>Photo</TableHeader>
    </>
  );
}

export function SlidesDataCells({ submission }: DataCellProps) {
  const data = (submission?.data || {}) as SlidesSubmissionData;
  const { slug, engagementId } = useParamsSafe("slug", "engagementId");
  return (
    <>
      <TableCell>{data.title}</TableCell>
      <TableCell>
        <Link
          to={`/admin/events/${slug}/engagements/${engagementId}/submissions/${submission.id}`}
        >
          Edit
        </Link>
      </TableCell>
      <TableCell>
        {data.optionalImageUrl ? (
          <img src={toFullS3Url(data.optionalImageUrl)} />
        ) : (
          <span className="italic">no image</span>
        )}
      </TableCell>
    </>
  );
}
