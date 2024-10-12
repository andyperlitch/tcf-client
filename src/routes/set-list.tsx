import { useSetList } from "../hooks/useSetList";
import "./set-list.css";
import { useFirstGigSet } from "../hooks/useFirstGigSet";
import { Link } from "react-router-dom";

export { SetList };

function SetList() {
  const { loading } = useSetList();
  const firstGigSet = useFirstGigSet();

  return (
    <>
      <div className="absolute inset-0 bg-[url('/logo.svg')] bg-[length:200%] bg-[position:100%_50%] bg-no-repeat opacity-[0.04] z-[1]" />
      <div className="max-w-5xl mx-auto">
        <div className="setlistRoot">
          {loading ? (
            <div>loading...</div>
          ) : (
            <>
              <h2 className="text-2xl">Setlist</h2>
              <ol className="setlist">
                {firstGigSet.map((song, i) => (
                  <li key={i}>
                    <Link to={`/setlist/${i}`}>{song.Title}</Link>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </div>
    </>
  );
}
