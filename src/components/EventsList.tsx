import { gql, useQuery } from "@apollo/client";
import { format } from "date-fns";
import { EventsQuery, EventsQueryVariables } from "@/gql/graphql.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

const USE_EVENTS_QUERY = gql`
  query Events {
    events {
      id
      name
      date
      location
      description
      slug
      activeEngagement {
        id
      }
      activeEngagementId
      engagements {
        id
        title
        description
        startTime
        endTime
        viewType
        allowSubmissions
        status
        order
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export function EventsList() {
  const { loading, error, data } = useQuery<EventsQuery, EventsQueryVariables>(
    USE_EVENTS_QUERY
  );
  console.log(`andy { loading, error, data }`, { loading, error, data });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader>Date</TableHeader>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
