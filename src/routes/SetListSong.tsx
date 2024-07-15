import { Link, useParams } from "react-router-dom";
import "./SetListSong.css";
import { useSetList } from "../hooks/useSetList";
import { useMemo } from "react";
import { useFirstGigSet } from "../hooks/useFirstGigSet";
import { useLeadSheetHtml } from "../hooks/useLeadSheetHtml";

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
        <Link to={`/setlist/${previousIndex}`}>
          <button
            disabled={previousIndex === songIndex}
            className="prevNextBtn"
            type="button"
          >
            👈
          </button>
        </Link>
        <h3>
          {songIndex + 1}. {currentSong.Title}
        </h3>
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
    </div>
  );
}
