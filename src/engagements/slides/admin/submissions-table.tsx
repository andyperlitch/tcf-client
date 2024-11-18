import { Switch } from "@/components/ui/switch";
import { TableCell, TableHeader } from "@/components/ui/table";
import { DataCellProps } from "@/engagements/base/EngagementDefinition";
import {
  SlidesAdminData,
  SlidesSubmissionData,
  useAdminUpdateEngagementMutation,
} from "@/gql/graphql";

export function SlidesDataHeaders() {
  return (
    <>
      <TableHeader>Current</TableHeader>
      <TableHeader>Title</TableHeader>
    </>
  );
}

export function SlidesDataCells({ submission, engagement }: DataCellProps) {
  const engagementData = engagement.data as SlidesAdminData;
  const data = (submission?.data || {}) as SlidesSubmissionData;
  const [updateEngagement] = useAdminUpdateEngagementMutation();
  return (
    <>
      <TableCell>
        <Switch
          checked={submission.id === engagementData.currentSlide}
          onCheckedChange={async (checked) => {
            const updateData = {
              data: { currentSlide: checked ? submission.id : 0 },
            };
            await updateEngagement({
              variables: { id: engagement.id, data: updateData },
            });
          }}
        />
      </TableCell>
      <TableCell>{data.title}</TableCell>
    </>
  );
}
