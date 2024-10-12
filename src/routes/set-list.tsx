import { useSetList } from "../hooks/useSetList";
import { useFirstGigSet } from "../hooks/useFirstGigSet";
import { Link } from "react-router-dom";
import { Background } from "@/components/background";
import { ModeToggle } from "@/components/ModeToggle";

export { SetList };

function SetList() {
  const { loading } = useSetList();
  const firstGigSet = useFirstGigSet();

  return (
    <>
      <Background />
      <div className="max-w-5xl mx-auto justify-center h-screen relative z-[2] p-4">
        {loading ? (
          <div>loading...</div>
        ) : (
          <>
            <h2 className="text-6xl text-center pt-8 mb-8 font-hand">
              Setlist
            </h2>
            <ol className="setlist">
              {firstGigSet.map((song, i) => (
                <li key={i} className="text-5xl">
                  <Link to={`/setlist/${i}`} className="pl-8 p-2 block">
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
