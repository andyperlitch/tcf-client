import { SongFragment, useBandSongsQuery } from "@/gql/graphql";

import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/ErrorMessage";
import useLocalStorage from "use-local-storage";
import { LeadSheetCell } from "./LeadSheetCell";
import { Link } from "react-router-dom";

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

function DataTable<TData>({
  id,
  data,
  columns,
}: {
  id: string;
  data: TData[];
  columns: ColumnDef<TData>[];
}) {
  const [sorting, setSorting] = useLocalStorage<SortingState>(
    `${id}-sorting`,
    [] as SortingState
  );
  const [columnFilters, setColumnFilters] = useLocalStorage<ColumnFiltersState>(
    `${id}-column-filters`,
    [] as ColumnFiltersState
  );
  const [columnVisibility, setColumnVisibility] =
    useLocalStorage<VisibilityState>(
      `${id}-column-visibility`,
      {} as VisibilityState
    );
  const [rowSelection, setRowSelection] = useLocalStorage<RowSelectionState>(
    `${id}-row-selection`,
    {} as RowSelectionState
  );

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 50,
      },
    },
    onSortingChange: (updater) => setSorting(updater as SortingState),
    onColumnFiltersChange: (updater) =>
      setColumnFilters(updater as ColumnFiltersState),
    onColumnVisibilityChange: (updater) =>
      setColumnVisibility(updater as VisibilityState),
    onRowSelectionChange: (updater) =>
      setRowSelection(updater as RowSelectionState),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter songs..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHeader key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHeader>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
