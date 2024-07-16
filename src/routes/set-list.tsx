import { useSetList } from "../hooks/use-set-list";
import "./set-list.css";
import { useFirstGigSet } from "../hooks/use-first-gig-set";
import { Link } from "react-router-dom";

export { SetList };

function SetList() {
  const { loading } = useSetList();
  const firstGigSet = useFirstGigSet();

  return (
    <div className="mainContainer">
      <div className="setlistRoot">
        {loading ? (
          <div>loading...</div>
        ) : (
          <>
            <h2>Setlist</h2>
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
  );
}
