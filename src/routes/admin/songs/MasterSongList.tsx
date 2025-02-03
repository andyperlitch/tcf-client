import { SongFragment, useBandSongsQuery } from "@/gql/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LeadSheetCell } from "./LeadSheetCell";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/DataTable";
import { SongActionsCell } from "./SongActionsCell";
export function MasterSongList() {
  const { data, loading, error } = useBandSongsQuery();

  if (loading) return <Loader />;

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <DataTable<SongFragment>
      id="master-song-list"
      data={data?.songs ?? []}
      columns={columns}
    />
  );
}

const columns: ColumnDef<SongFragment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          const isSelected = !!value;
          row.toggleSelected(isSelected);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        to={`/admin/songs/${row.original.id}`}
        className="font-bold hover:underline"
      >
        {row.getValue("title")}
      </Link>
    ),
  },
  {
    accessorKey: "artist",
    header: "Artist",
    cell: ({ row }) => <div>{row.getValue("artist")}</div>,
  },
  {
    accessorKey: "tempo",
    header: "Tempo",
    cell: ({ row }) => <div>{row.getValue("tempo")}</div>,
  },
  {
    accessorKey: "key",
    header: "Key",
    cell: ({ row }) => <div>{row.getValue("key")}</div>,
  },
  {
    accessorKey: "practicePriority",
    header: "Practice Priority",
    cell: ({ row }) => <div>{row.getValue("practicePriority")}</div>,
  },
  {
    accessorKey: "feel",
    header: "Feel",
    cell: ({ row }) => <div>{row.getValue("feel")}</div>,
  },
  {
    id: "leadSheet",
    header: "Lead Sheet",
    cell: ({ row }) => <LeadSheetCell song={row.original} />,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const song = row.original;

      return <SongActionsCell song={song} />;
    },
  },
];
