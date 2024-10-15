import { gql, useQuery } from "@apollo/client";
import { EventsQuery, EventsQueryVariables } from "@/gql/graphql.ts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <TableBody>
        {data?.events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.name}</TableCell>
            <TableCell>{event.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
