import { AdminContainer } from "@/components/AdminContainer";
import { DataTable } from "@/components/DataTable";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UploadManager } from "@/components/UploadManager";
import {
  UploadFragment,
  useDeleteUploadMutation,
  useUploadsQuery,
} from "@/gql/graphql";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { useApolloClient } from "@apollo/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { useMemo } from "react";

export function AdminFilesPage() {
  return (
    <AdminContainer section="files">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-3xl">Files</h1>
        </div>
        <UploadManager />
        <FilesList />
      </div>
    </AdminContainer>
  );
}

function FilesList() {
  const { data, loading, error } = useUploadsQuery();
  const client = useApolloClient();
  const [deleteUpload] = useDeleteUploadMutation({
    onCompleted(data) {
      if (data.deleteUpload) {
        client.cache.evict({
          id: client.cache.identify({
            __typename: "Upload",
            id: data.deleteUpload.id,
          }),
        });
      }
    },
  });
  const columns: ColumnDef<UploadFragment>[] = useMemo(
    () => [
      {
        accessorKey: "fileName",
        header: "Name",
        cell: ({ row }) => <div>{row.getValue("fileName")}</div>,
      },
      {
        accessorKey: "fileSize",
        header: "Size",
        cell: ({ row }) => <div>{prettyBytes(row.getValue("fileSize"))}</div>,
      },
      {
        accessorKey: "fileType",
        header: "Type",
        cell: ({ row }) => <div>{row.getValue("fileType")}</div>,
      },
      // upload date
      {
        accessorKey: "createdAt",
        header: "Upload Date",
        cell: ({ row }) => (
          <div>{new Date(row.getValue("createdAt")).toLocaleString()}</div>
        ),
      },
      // upload user
      {
        accessorKey: "uploader",
        header: "Uploaded By",
        cell: ({ row }) => <div>{(row.getValue("uploader") as any)?.name}</div>,
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
                <DropdownMenuItem asChild>
                  <a
                    href={toFullS3Url(file.key)}
                    download={file.fileName}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="link"
                    onClick={() => {
                      deleteUpload({
                        variables: {
                          id: file.id,
                        },
                      });
                    }}
                  >
                    Delete
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  if (loading) return <Loader />;

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <DataTable<UploadFragment>
      id="master-song-list"
      data={data?.uploads ?? []}
      columns={columns}
    />
  );
}
