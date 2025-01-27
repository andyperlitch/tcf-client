import { SongFragment, useBandSongsQuery } from "@/gql/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LeadSheetCell } from "./LeadSheetCell";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/DataTable";

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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(song.id.toString())}
            >
              Copy song ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View song</DropdownMenuItem>
            <DropdownMenuItem>View song details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
