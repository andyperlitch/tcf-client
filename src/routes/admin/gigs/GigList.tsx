import { DataTable } from "@/components/DataTable";
import { ErrorMessage } from "@/components/ErrorMessage";
import { InlineConfirmButton } from "@/components/InlineConfirmButton";
import { Loader } from "@/components/Loader";
import {
  BasicGigFragment,
  useBandDeleteGigMutation,
  useBandGigsQuery,
} from "@/gql/graphql";
import { useToast } from "@/hooks/use-toast";
import { TrashIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

const columns: ColumnDef<BasicGigFragment>[] = [
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
    cell: ({ row }) => new Date(row.getValue("date")).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const gig = row.original;

      return <GigActionsCell gig={gig} />;
    },
  },
];

function GigActionsCell({ gig }: { gig: BasicGigFragment }) {
  const { toast } = useToast();
  const [deleteGig] = useBandDeleteGigMutation({
    update(cache) {
      cache.modify({
        fields: {
          gigs(existingGigs = [], { readField }) {
            return existingGigs.filter(
              (gigRef: any) => readField("id", gigRef) !== gig.id
            );
          },
        },
      });
    },
  });

  return (
    <InlineConfirmButton
      onConfirm={() =>
        deleteGig({ variables: { gigId: gig.id } }).then(() => {
          toast({
            variant: "constructive",
            title: "Gig deleted",
          });
        })
      }
      variant="destructive"
    >
      <TrashIcon />
    </InlineConfirmButton>
  );
}

export function GigList() {
  const { data, loading, error, refetch } = useBandGigsQuery();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} retry={refetch} />;

  return (
    <DataTable<BasicGigFragment>
      id="gig-list"
      data={data?.gigs ?? []}
      columns={columns}
      showColumnVisibility={false}
    />
  );
}
