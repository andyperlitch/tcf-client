import { ModeToggle } from "@/components/ModeToggle";
import { HomeButton } from "@/components/HomeButton";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { useBandGigQuery } from "@/gql/graphql";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/ErrorMessage";
import { CrumbMeta, SimpleCrumbs } from "@/components/SimpleCrumbs";
import { GigSetList } from "@/components/GigSetList";

export function Gig() {
  const { gigId } = useParamsSafe("gigId");

  const { data, loading, error, refetch } = useBandGigQuery({
    variables: {
      id: Number(gigId),
    },
    skip: !gigId,
  });

  const gig = data?.gig;

  const crumbs: CrumbMeta[] = [["/gigs", "Gigs"]];

  return (
    <>
      <HomeButton />
      <div
        data-name="GIG_PAGE"
        className={`
          relative z-[2] mx-auto flex w-full flex-col justify-center gap-4 p-4
        `}
      >
        {loading && <Loader />}
        {error && <ErrorMessage error={error} retry={refetch} />}
        {gig && (
          <>
            <SimpleCrumbs crumbs={crumbs} />
            <h2 className={`text-3xl font-bold`}>{gig.name}</h2>
            <div
              data-name="GIG_SETS"
              className={`
                flex flex-col gap-2

                md:flex-row md:flex-wrap
              `}
            >
              {gig.sets.map((set, setIndex) => (
                <GigSetList
                  key={set.id}
                  gigId={gig.id}
                  set={set}
                  title={`Set ${setIndex + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <ModeToggle />
    </>
  );
}
