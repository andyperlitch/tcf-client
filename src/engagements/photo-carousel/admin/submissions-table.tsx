import { TableCell, TableHeader } from "@/components/ui/table";
import {
  DataCellProps,
  TableHeaderProps,
} from "@/engagements/base/EngagementDefinition";
import {
  PhotoCarouselAdminConfig,
  PhotoCarouselSubmissionData,
} from "@/gql/graphql";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { format } from "date-fns";
import { isMobile } from "react-device-detect";

export function PhotoCarouselDataHeaders({ engagement }: TableHeaderProps) {
  const config = (engagement?.config || {}) as PhotoCarouselAdminConfig;
  return (
    <>
      <TableHeader>Photo/Caption</TableHeader>
      {config.askSharePermission && <TableHeader>Shareable?</TableHeader>}
      <TableHeader>Date/Time</TableHeader>
    </>
  );
}

export function PhotoCarouselDataCell({
  submission,
  engagement,
}: DataCellProps) {
  const data = (submission?.data || {}) as PhotoCarouselSubmissionData;
  const config = (engagement?.config || {}) as PhotoCarouselAdminConfig;
  return (
    <>
      <TableCell>
        <img src={toFullS3Url(data.photoUrl)} className="h-24" />
        <p>{data.caption}</p>
      </TableCell>
      {config.askSharePermission && (
        <TableCell>{data.sharingPermissionGranted && "✅"}</TableCell>
      )}
      <TableCell>
        {format(submission.createdAt, isMobile ? "p" : "Pp")}
      </TableCell>
    </>
  );
}
