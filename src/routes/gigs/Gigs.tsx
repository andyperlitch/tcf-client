import { ErrorMessage } from "@/components/ErrorMessage";
import { HomeButton } from "@/components/HomeButton";
import { Loader } from "@/components/Loader";
import { ModeToggle } from "@/components/ModeToggle";
import { useBandGigsQuery } from "@/gql/graphql";
import { Link } from "react-router-dom";

export function Gigs() {
  const { data, loading, error, refetch } = useBandGigsQuery();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} retry={refetch} />;

  const gigs = data?.gigs;

  if (!gigs) {
    return null;
  }

  return (
    <>
      <HomeButton />
      <div
        data-name="GIGS_PAGE"
        className={`relative z-[2] mx-auto flex w-full flex-col gap-4 p-4`}
      >
        <h2 className="text-3xl font-bold">Gigs</h2>
        <ol className="setlist">
          {gigs.map((gig, i) => (
            <li key={i} className="text-3xl">
              <Link to={`/gigs/${gig.id}`} className="block p-2 pl-8">
                {gig.name}
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <ModeToggle />
    </>
  );
}
