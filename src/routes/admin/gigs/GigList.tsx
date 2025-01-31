import { DataTable } from "@/components/DataTable";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Loader } from "@/components/Loader";
import { GigFragment, useBandGigsQuery } from "@/gql/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

const columns: ColumnDef<GigFragment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link to={`/admin/gigs/${row.original.id}`}>{row.getValue("name")}</Link>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => row.getValue("date"),
  },
];

export function GigList() {
  const { data, loading, error, refetch } = useBandGigsQuery();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} retry={refetch} />;

  return (
    <DataTable<GigFragment>
      id="gig-list"
      data={data?.gigs ?? []}
      columns={columns}
      showColumnVisibility={false}
    />
  );
}
