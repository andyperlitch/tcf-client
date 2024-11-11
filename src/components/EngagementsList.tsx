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
import { DeleteEngagementButton } from "./DeleteEngagementButton";
import { useMemo } from "react";
import { MoveEngagementButton } from "./MoveEngagementButton";

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

  const sortedEngagements = useMemo(() => {
    const unsortedEngagements = data?.engagements.slice() || [];
    unsortedEngagements.sort((a, b) => a.order - b.order);
    return unsortedEngagements;
  }, [data?.engagements]);

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

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Order</TableHeader>
          <TableHeader>Active</TableHeader>
          <TableHeader>Title</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedEngagements.map((engagement, index) => (
          <TableRow key={engagement.id}>
            <TableCell>{engagement.order}</TableCell>
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
            <TableCell className="flex gap-2">
              <DeleteEngagementButton
                id={engagement.id}
                disabled={
                  eventData?.event?.activeEngagementId === engagement.id
                }
              />
              <MoveEngagementButton
                id={engagement.id}
                engagements={sortedEngagements}
                index={index}
                eventId={eventId}
                direction="up"
              />
              <MoveEngagementButton
                id={engagement.id}
                engagements={sortedEngagements}
                index={index}
                eventId={eventId}
                direction="down"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
