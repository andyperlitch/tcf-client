import { useNavigate, useParams } from "react-router-dom";
import "./SetListSong.css";
import { useSetList } from "../../hooks/useSetList";
import { useMemo, useState } from "react";
import { useFirstGigSet } from "../../hooks/useFirstGigSet";
import { LeadSheet } from "./LeadSheet";
import { ControlBar } from "./ControlBar";
import { SongViewType } from "./types";
import { Lyrics } from "./Lyrics";
import { SongInfo } from "./SongInfo";
import { useSwipeable } from "react-swipeable";
import { SET_BREAK_TITLE } from "../../consts/songs";
import { CenteredMessage } from "../../CenteredMessage";
import { getPatOnTheBack } from "../../utils/getPatOnTheBack";

const USE_IFRAME = false;

export function SetListSong() {
  const params = useParams();
  const navigate = useNavigate();
  const [songView, setSongView] = useState<SongViewType>("leadsheet");
  const currentIndex = parseInt(params.songIndex || "0", 10);
  const { loading } = useSetList();
  const songs = useFirstGigSet();

  const currentSong = useMemo(() => {
    if (songs && songs.length) {
      return songs[currentIndex];
    }
  }, [currentIndex, songs]);

  const previousIndex = Math.max(0, currentIndex - 1);
  const nextIndex = Math.min(songs.length - 1, currentIndex + 1);

  const swipeHandlers = useSwipeable(
    useMemo(
      () => ({
        onSwipedRight: () => {
          if (previousIndex !== currentIndex) {
            navigate(`/setlist/${previousIndex}`);
          }
        },
        onSwipedLeft: () => {
          if (nextIndex !== currentIndex) {
            navigate(`/setlist/${nextIndex}`);
          }
        },
      }),
      [currentIndex, navigate, nextIndex, previousIndex]
    )
  );

  if (loading || !songs.length || !currentSong) {
    return <div>loading...</div>;
  }

  return (
    <div className="setlistRoot" {...swipeHandlers}>
      <ControlBar
        previousIndex={previousIndex}
        nextIndex={nextIndex}
        currentSong={currentSong}
        currentIndex={currentIndex}
        songView={songView}
        setSongView={setSongView}
      />
      {currentSong.Title === SET_BREAK_TITLE ? (
        <CenteredMessage>{getPatOnTheBack()}</CenteredMessage>
      ) : (
        <>
          {songView === "leadsheet" && (
            <>
              {currentSong.LeadSheet && USE_IFRAME && (
                <iframe
                  className="leadSheetFrame"
                  src={`${currentSong.LeadSheet}?embedded=true`}
                />
              )}
              {!USE_IFRAME && (
                <LeadSheet leadsheetUrl={currentSong.LeadSheet} />
              )}
            </>
          )}
          {songView === "lyrics" && <Lyrics lyricsUrl={currentSong.Lyrics} />}
          {songView === "info" && <SongInfo song={currentSong} />}
        </>
      )}
    </div>
  );
}
