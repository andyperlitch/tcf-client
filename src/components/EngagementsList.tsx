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
import { ToggleActiveEngagementButton } from "./ToggleActiveEngagementButton";
import { DeleteEngagementButton } from "./DeleteEngagementButton";
import { useSortedAdminEngagements } from "@/hooks/useSortedEngagements";
import { MoveEngagementButton } from "./MoveEngagementButton";
import { AdminEventFragment } from "@/gql/graphql";

export function EngagementsList({ event }: { event: AdminEventFragment }) {
  const { data, loading, error } = useAdminGetEngagementsQuery({
    variables: {
      eventId: event.id,
    },
  });

  const sortedEngagements = useSortedAdminEngagements(data?.engagements || []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

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
        {sortedEngagements.map((engagement, index) => (
          <TableRow key={engagement.id}>
            <TableCell>
              <ToggleActiveEngagementButton
                id={engagement.id}
                activeId={event.activeEngagementId}
                eventId={event.id}
              />
            </TableCell>

            <TableCell>
              <Link
                to={`/admin/events/${event.slug}/engagements/${engagement.id}`}
              >
                {engagement.title}
              </Link>
            </TableCell>

            <TableCell className="flex gap-2">
              {event.locked ? (
                <span className="italic">Event locked</span>
              ) : (
                <div className={`flex items-center gap-2`}>
                  <DeleteEngagementButton
                    size="icon"
                    id={engagement.id}
                    disabled={
                      event.locked || event.activeEngagementId === engagement.id
                    }
                  />
                  <MoveEngagementButton
                    disabled={event.locked}
                    id={engagement.id}
                    engagements={sortedEngagements}
                    index={index}
                    eventId={event.id}
                    direction="up"
                  />
                  <MoveEngagementButton
                    disabled={event.locked}
                    id={engagement.id}
                    engagements={sortedEngagements}
                    index={index}
                    eventId={event.id}
                    direction="down"
                  />
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
