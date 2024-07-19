import { useParams } from "react-router-dom";
import "./SetListSong.css";
import { useSetList } from "../../hooks/use-set-list";
import { useMemo, useState } from "react";
import { useFirstGigSet } from "../../hooks/use-first-gig-set";
import { LeadSheet } from "./LeadSheet";
import { ControlBar } from "./ControlBar";
import { SongViewType } from "./types";

const USE_IFRAME = false;

export function SetListSong() {
  const params = useParams();
  const [songView, setSongView] = useState<SongViewType>("leadsheet");
  const songIndex = parseInt(params.songIndex || "0", 10);
  const { loading } = useSetList();
  const songs = useFirstGigSet();

  const currentSong = useMemo(() => {
    if (songs && songs.length) {
      return songs[songIndex];
    }
  }, [songIndex, songs]);

  const previousIndex = Math.max(0, songIndex - 1);
  const nextIndex = Math.min(songs.length - 1, songIndex + 1);

  if (loading || !songs.length || !currentSong) {
    return <div>loading...</div>;
  }

  return (
    <div className="setlistRoot">
      <ControlBar
        previousIndex={previousIndex}
        nextIndex={nextIndex}
        currentSong={currentSong}
        songIndex={songIndex}
        songView={songView}
        setSongView={setSongView}
      />
      {songView === "leadsheet" && (
        <>
          {currentSong.LeadSheet && USE_IFRAME && (
            <iframe
              className="leadSheetFrame"
              src={`${currentSong.LeadSheet}?embedded=true`}
            />
          )}
          {!USE_IFRAME && <LeadSheet leadsheetUrl={currentSong.LeadSheet} />}
        </>
      )}
      {/* {songView === "lyrics" && <Lyrics lyricsUrl={currentSong.Lyrics} />} */}
    </div>
  );
}
