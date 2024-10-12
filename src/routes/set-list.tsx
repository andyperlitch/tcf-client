import { useSetList } from "../hooks/useSetList";
import { useGigSet } from "../hooks/useGigSet";
import { Link, useParams } from "react-router-dom";
import { Background } from "@/components/background";
import { ModeToggle } from "@/components/ModeToggle";
import { SETS_BY_SLUG } from "@/consts/sets";

export { SetList };

function SetList() {
  const { loading } = useSetList();
  const { setSlug } = useParams();
  const gigSet = useGigSet(setSlug);
  const setMeta = SETS_BY_SLUG[setSlug!];

  return (
    <>
      <Background />
      <div className="max-w-5xl mx-auto justify-center h-screen relative z-[2] p-4">
        {loading ? (
          <div>loading...</div>
        ) : (
          <>
            <h2 className="text-6xl text-center pt-8 mb-8 font-hand">
              <span className="text-gray-500">Setlist:</span> {setMeta.label}
            </h2>
            <ol className="setlist">
              {gigSet.map((song, i) => (
                <li key={i} className="text-5xl">
                  <Link to={`/sets/${setSlug}/${i}`} className="pl-8 p-2 block">
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
