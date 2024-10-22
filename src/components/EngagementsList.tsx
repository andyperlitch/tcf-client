import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useAdminGetEngagementsQuery } from "@/gql/graphql";

export function EngagementsList({
  eventId,
  eventSlug,
}: {
  eventId: number;
  eventSlug: string;
}) {
  const { data /* , loading, error */ } = useAdminGetEngagementsQuery({
    variables: {
      eventId,
    },
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Title</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.engagements.map((engagement) => (
          <TableRow key={engagement.id}>
            <TableCell>
              <Link
                to={`/admin/events/${eventSlug}/engagements/${engagement.id}`}
              >
                {engagement.title}
              </Link>
            </TableCell>
            <TableCell>actions..</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
