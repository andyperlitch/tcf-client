import { AdminContainer } from "@/components/AdminContainer";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Loader } from "@/components/Loader";
import { CrumbMeta, SimpleCrumbs } from "@/components/SimpleCrumbs";
import { Button } from "@/components/ui/button";
import { useBandCreateGigSetMutation, useBandGigQuery } from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";

const crumbs: CrumbMeta[] = [["/admin/gigs", "Gigs"]];

export function AdminGigPage() {
  const params = useParamsSafe("gigId");

  const {
    data: gigData,
    loading: gigLoading,
    error: gigError,
    refetch: refetchGig,
  } = useBandGigQuery({
    variables: {
      id: Number(params.gigId),
    },
    skip: !params.gigId,
  });

  const gig = gigData?.gig;

  return (
    <AdminContainer section="gigs">
      <div className="flex flex-col gap-4">
        <div data-name="GIG_HEADER" className="flex flex-col gap-2">
          <SimpleCrumbs crumbs={crumbs} />
          <h1 className="text-2xl font-bold">{gigData?.gig?.name || "..."}</h1>
        </div>
        {gigLoading && <Loader />}
        {gigError && <ErrorMessage error={gigError} retry={refetchGig} />}
        {gig && (
          <div data-name="GIG_DETAILS">
            {!gig.sets.length && (
              <CreateGigSetButton gigId={gig.id} onSuccess={refetchGig} />
            )}
          </div>
        )}
      </div>
    </AdminContainer>
  );
}

function CreateGigSetButton({
  gigId,
  onSuccess,
}: {
  gigId: number;
  onSuccess: () => void;
}) {
  const [createGigSet, { loading }] = useBandCreateGigSetMutation();

  return (
    <Button
      disabled={loading}
      onClick={() =>
        createGigSet({
          variables: {
            gigId,
            data: {
              name: "Set 1",
            },
          },
        }).then(onSuccess)
      }
    >
      Add Set
    </Button>
  );
}
