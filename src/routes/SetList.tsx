import { useSetList } from "../hooks/useSetList";
import { useGigSet } from "../hooks/useGigSet";
import { Link, useParams } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import { SETS_BY_SLUG } from "@/consts/sets";
import { HomeButton } from "@/components/HomeButton";

export { SetList };

function SetList() {
  const { loading } = useSetList();
  const { setSlug } = useParams();
  const gigSet = useGigSet(setSlug);
  const setMeta = SETS_BY_SLUG[setSlug!];

  return (
    <>
      <HomeButton />
      <div className="relative z-[2] mx-auto max-w-5xl justify-center p-4">
        {loading ? (
          <div>loading...</div>
        ) : (
          <>
            <h2 className="mb-8 pt-8 text-center font-hand text-6xl">
              <span className="text-gray-500">Setlist:</span> {setMeta.label}
            </h2>
            <ol className="setlist">
              {gigSet.map((song, i) => (
                <li key={i} className="text-3xl">
                  <Link to={`/sets/${setSlug}/${i}`} className="block p-2 pl-8">
                    {i + 1}. {song.Title}
                  </Link>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
      <ModeToggle />
    </>
  );
}
