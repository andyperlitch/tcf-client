import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import {
  useAdminGetEngagementsQuery,
  useAdminGetEventQuery,
} from "@/gql/graphql";
import { ToggleActiveEngagementButton } from "./ToggleActiveEngagementButton";

export function EngagementsList({
  eventId,
  eventSlug,
}: {
  eventId: number;
  eventSlug: string;
}) {
  const { data, loading, error } = useAdminGetEngagementsQuery({
    variables: {
      eventId,
    },
  });
  const {
    data: eventData,
    loading: eventLoading,
    error: eventError,
  } = useAdminGetEventQuery({
    variables: {
      slug: eventSlug,
    },
  });

  if (loading || eventLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (eventError) {
    return <p>{eventError.message}</p>;
  }

  if (!data?.engagements || !eventData?.event) {
    return <p>No engagements or event data found.</p>;
  }

  console.log(`andy data`, data);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Active</TableHeader>
          <TableHeader>Title</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.engagements.map((engagement) => (
          <TableRow key={engagement.id}>
            <TableCell>
              <ToggleActiveEngagementButton
                id={engagement.id}
                activeId={eventData?.event?.activeEngagementId}
                eventId={eventId}
              />
            </TableCell>
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
