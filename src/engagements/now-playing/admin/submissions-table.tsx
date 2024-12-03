import { TableCell, TableHeader } from "@/components/ui/table";
import { DataCellProps } from "@/engagements/base/EngagementDefinition";
import { NowPlayingSubmissionData } from "@/gql/graphql";
import { toFullS3Url } from "@/utils/toFullS3Url";

export function NowPlayingDataHeaders() {
  return (
    <>
      <TableHeader>Album Art</TableHeader>
      <TableHeader>Song</TableHeader>
      <TableHeader>Artist</TableHeader>
      <TableHeader>Lyrics</TableHeader>
      <TableHeader>Visualization</TableHeader>
    </>
  );
}

export function NowPlayingDataCells({ submission }: DataCellProps) {
  const data = submission.data as NowPlayingSubmissionData;
  return (
    <>
      <TableCell>
        {data.songAlbumArt ? (
          <img src={toFullS3Url(data.songAlbumArt)} className={`h-24`} />
        ) : null}
      </TableCell>
      <TableCell>{data.songTitle}</TableCell>
      <TableCell>{data.songArtist}</TableCell>
      <TableCell>{data.songLyrics}</TableCell>
      <TableCell>{data.visualizationType}</TableCell>
    </>
  );
}
