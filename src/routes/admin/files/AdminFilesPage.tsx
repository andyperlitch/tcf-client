import { AdminContainer } from "@/components/AdminContainer";

/*
import { DataTable } from "@/components/DataTable";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
*/

export function AdminFilesPage() {
  return (
    <AdminContainer section="files">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-3xl">Files</h1>
        </div>
        <FilesList />
      </div>
    </AdminContainer>
  );
}

function FilesList() {
  // const { data, loading, error } = useAdminFilesQuery();

  // if (loading) return <Loader />;

  // if (error) {
  //   return <ErrorMessage error={error} />;
  // }

  return (
    // <DataTable<FileFragment>
    //   id="master-song-list"
    //   data={data?.songs ?? []}
    //   columns={columns}
    // />
    <div>FilesList</div>
  );
}
/*
const columns: ColumnDef<FileFragment>[] = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    id: "size",
    header: "Size",
    cell: ({ row }) => <div>{row.getValue("size")}</div>,
  },
  {
    id: "type",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  // upload date
  {
    id: "uploadDate",
    header: "Upload Date",
    cell: ({ row }) => <div>{row.getValue("uploadDate")}</div>,
  },
  // upload user
  {
    id: "uploadUser",
    header: "Upload User",
    cell: ({ row }) => <div>{row.getValue("uploadUser")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const file = row.original;

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
              onClick={() => navigator.clipboard.writeText(file.id.toString())}
            >
              Copy presigned download URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Download</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
*/
