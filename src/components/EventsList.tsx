import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useAdminGetEventsQuery } from "@/gql/graphql";
import { DeleteEventButton } from "./DeleteEventButton";

export function EventsList() {
  const { /* loading, error,  */ data } = useAdminGetEventsQuery();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader>Date</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>
              <Link to={`/admin/events/${event.slug}`}>{event.name}</Link>
            </TableCell>
            <TableCell>{event.description}</TableCell>
            <TableCell>{format(event.date, "PPP")}</TableCell>
            <TableCell>
              <DeleteEventButton id={event.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
