import { AdminContainer } from "@/components/AdminContainer";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Loader } from "@/components/Loader";
import { CrumbMeta, SimpleCrumbs } from "@/components/SimpleCrumbs";
import { Button } from "@/components/ui/button";
import {
  useBandCreateGigSetMutation,
  useBandDeleteGigSetMutation,
  useBandGigQuery,
} from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { AdminGigSet } from "./AdminGigSet";
import { GigLeaderPicker } from "./GigLeaderPicker";
import { GigEventPicker } from "./GigEventPicker";
import { GigNowPlayingPicker } from "./GigNowPlayingPicker";
import { Link } from "react-router-dom";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

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

  const [deleteGigSet, { loading: deletingGigSet }] =
    useBandDeleteGigSetMutation();

  const gig = gigData?.gig;

  return (
    <AdminContainer section="gigs">
      <div className="flex flex-col gap-4">
        <div data-name="GIG_HEADER" className="flex flex-col gap-2">
          <SimpleCrumbs crumbs={crumbs} />
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <span>{gigData?.gig?.name || "..."} </span>
            <Link to={`/gigs/${params.gigId}`} target="_blank">
              <ExternalLinkIcon />
            </Link>
          </h1>
        </div>
        {gigLoading && <Loader />}
        {gigError && <ErrorMessage error={gigError} retry={refetchGig} />}
        {gig && (
          <div data-name="GIG_DETAILS" className="flex flex-col gap-4">
            <div data-name="GIG_MAIN_CONTROLS" className="flex gap-2">
              <GigLeaderPicker gig={gig} />
              <GigEventPicker gig={gig} />
              {typeof gig.eventId === "number" && (
                <GigNowPlayingPicker gig={{ ...gig, eventId: gig.eventId }} />
              )}
            </div>

            <div
              data-name="GIG_SETS"
              className={`
                flex flex-col items-start justify-start gap-4

                lg:flex-row lg:flex-wrap
              `}
            >
              {gig.sets.map((set, index) => (
                <AdminGigSet
                  gigId={gig.id}
                  className="max-w-[800px] flex-1"
                  key={set.id}
                  gigSet={set}
                  gigSetIndex={index}
                  refetchGig={refetchGig}
                  onDelete={(gigSetId: number) => {
                    if (deletingGigSet) return;
                    deleteGigSet({
                      variables: { gigSetId },
                    }).then(() => {
                      refetchGig();
                    });
                  }}
                />
              ))}
            </div>
            <CreateGigSetButton
              className="self-start"
              gigId={gig.id}
              onSuccess={refetchGig}
            />
          </div>
        )}
      </div>
    </AdminContainer>
  );
}

function CreateGigSetButton({
  gigId,
  onSuccess,
  className,
}: {
  gigId: number;
  onSuccess: () => void;
  className?: string;
}) {
  const [createGigSet, { loading }] = useBandCreateGigSetMutation();

  return (
    <Button
      className={className}
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
