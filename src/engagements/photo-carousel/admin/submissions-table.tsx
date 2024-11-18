import { TableCell, TableHeader } from "@/components/ui/table";
import { DataCellProps } from "@/engagements/base/EngagementDefinition";
import { PhotoCarouselSubmissionData } from "@/gql/graphql";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { format } from "date-fns";
import { isMobile } from "react-device-detect";

export function PhotoCarouselDataCell({ submission }: DataCellProps) {
  const data = (submission?.data || {}) as PhotoCarouselSubmissionData;
  return (
    <>
      <TableCell>
        <img src={toFullS3Url(data.photoUrl)} className="h-24" />
        <p>{data.caption}</p>
      </TableCell>
      <TableCell>
        {format(submission.createdAt, isMobile ? "p" : "Pp")}
      </TableCell>
    </>
  );
}

export function PhotoCarouselDataHeaders() {
  return (
    <>
      <TableHeader>Photo/Caption</TableHeader>
      <TableHeader>Date/Time</TableHeader>
    </>
  );
}
