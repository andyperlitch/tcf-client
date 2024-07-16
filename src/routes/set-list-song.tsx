import { Link, useParams } from "react-router-dom";
import "./set-list-song.css";
import { useSetList } from "../hooks/use-set-list";
import { useMemo } from "react";
import { useFirstGigSet } from "../hooks/use-first-gig-set";
import { useLeadSheetHtml } from "../hooks/use-lead-sheet-html";

const USE_IFRAME = false;

export function SetListSong() {
  const params = useParams();
  const songIndex = parseInt(params.songIndex || "0", 10);
  const { loading } = useSetList();
  const songs = useFirstGigSet();

  const currentSong = useMemo(() => {
    if (songs && songs.length) {
      return songs[songIndex];
    }
  }, [songIndex, songs]);

  const leadSheetHtml = useLeadSheetHtml({ url: currentSong?.LeadSheet });

  const previousIndex = Math.max(0, songIndex - 1);
  const nextIndex = Math.min(songs.length - 1, songIndex + 1);

  if (loading || !songs.length || !currentSong) {
    return <div>loading...</div>;
  }
  return (
    <div className="setlistRoot">
      <div className="setlistCtl">
        <div className="setlistCtlLeft">
          <Link to={`/setlist/${previousIndex}`}>
            <button
              disabled={previousIndex === songIndex}
              className="prevNextBtn"
              type="button"
            >
              👈
            </button>
          </Link>

          <Link to={`/setlist`}>
            <button className="prevNextBtn homeBtn" type="button">
              🏠
            </button>
          </Link>
        </div>

        <h3>
          {songIndex + 1}. {currentSong.Title}
        </h3>

        <span className="songKey">{currentSong.Key}</span>

        <span className="songTempo">{currentSong.Tempo} bpm</span>

        <Link to={`/setlist/${nextIndex}`}>
          <button
            disabled={nextIndex === songIndex}
            className="prevNextBtn"
            type="button"
          >
            👉
          </button>
        </Link>
      </div>
      {currentSong.LeadSheet && USE_IFRAME && (
        <iframe
          className="leadSheetFrame"
          src={`${currentSong.LeadSheet}?embedded=true`}
        />
      )}
      {leadSheetHtml && !USE_IFRAME && (
        <div
          className="leadSheetHtml"
          dangerouslySetInnerHTML={{ __html: leadSheetHtml }}
        ></div>
      )}
      {!leadSheetHtml && !USE_IFRAME && (
        <div className="noLeadSheet">No lead sheet available</div>
      )}
    </div>
  );
}
