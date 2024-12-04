import { Switch } from "@/components/ui/switch";
import { TableCell, TableHeader } from "@/components/ui/table";
import { DataCellProps } from "@/engagements/base/EngagementDefinition";
import {
  NowPlayingAdminData,
  NowPlayingSubmissionData,
  useAdminUpdateEngagementMutation,
} from "@/gql/graphql";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { PlayIcon } from "@radix-ui/react-icons";

export function NowPlayingDataHeaders() {
  return (
    <>
      <TableHeader>
        <PlayIcon />
      </TableHeader>
      <TableHeader>Details</TableHeader>
    </>
  );
}

export function NowPlayingDataCells({ submission, engagement }: DataCellProps) {
  const engagementData = engagement.data as NowPlayingAdminData;
  const data = submission.data as NowPlayingSubmissionData;
  const [updateEngagement] = useAdminUpdateEngagementMutation();
  return (
    <>
      <TableCell>
        <Switch
          checked={submission.id === engagementData.currentSong}
          onCheckedChange={async (checked) => {
            const updateData = {
              data: { currentSong: checked ? submission.id : 0 },
            };
            await updateEngagement({
              variables: { id: engagement.id, data: updateData },
            });
          }}
        />
      </TableCell>
      <TableCell>
        {data.songAlbumArt ? (
          <img src={toFullS3Url(data.songAlbumArt)} className={`h-24`} />
        ) : null}
        {data.songTitle}
        <br />
        {data.songArtist}
        <br />
        {data.songLyrics}
        <br />
        {data.visualizationType}
      </TableCell>
    </>
  );
}
