import { format } from "date-fns";
import { Link } from "react-router-dom";
import { AdminEventFragment } from "@/gql/graphql";
import { DeleteEventButton } from "./DeleteEventButton";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

const columns: ColumnDef<AdminEventFragment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell({ row }) {
      return (
        <Link to={`/admin/events/${row.original.slug}`}>
          {row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell({ row }) {
      return format(row.original.date, "PPP");
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell({ row }) {
      return <DeleteEventButton id={row.original.id} />;
    },
  },
];

export function EventsList({ events }: { events: AdminEventFragment[] }) {
  return (
    <DataTable
      id="events"
      data={events}
      columns={columns}
      showGlobalFilter
      showColumnVisibility={false}
    />
  );
}
