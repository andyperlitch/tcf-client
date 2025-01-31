import { AdminContainer } from "@/components/AdminContainer";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Loader } from "@/components/Loader";
import { CrumbMeta, SimpleCrumbs } from "@/components/SimpleCrumbs";
import { useBandGigQuery } from "@/gql/graphql";
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

  return (
    <AdminContainer section="gigs">
      <div data-name="GIG_HEADER" className="flex flex-col gap-2">
        <SimpleCrumbs crumbs={crumbs} />
        <h1 className="text-2xl font-bold">{gigData?.gig?.name || "..."}</h1>
      </div>
      {gigLoading && <Loader />}
      {gigError && <ErrorMessage error={gigError} retry={refetchGig} />}
      {gigData?.gig && <div data-name="GIG_DETAILS"></div>}
    </AdminContainer>
  );
}
