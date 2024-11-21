import { isMobile } from "react-device-detect";
import { useNavigate, useParams } from "react-router-dom";
import { useSetList } from "../../hooks/useSetList";
import { useMemo } from "react";
import { useGigSet } from "../../hooks/useGigSet";
import { LeadSheet } from "./LeadSheet";
import { ControlBar } from "./ControlBar";
import { SongViewType } from "./types";
import { Lyrics } from "./Lyrics";
import { SongInfo } from "./SongInfo";
import { useSwipeable } from "react-swipeable";
import { SET_BREAK_TITLE } from "../../consts/songs";
import { CenteredMessage } from "../../CenteredMessage";
import { getPatOnTheBack } from "../../utils/getPatOnTheBack";
import { HomeButton } from "@/components/HomeButton";
import useLocalStorage from "use-local-storage";

export function SetListSong() {
  const params = useParams();
  const navigate = useNavigate();
  const [songView, setSongView] = useLocalStorage<SongViewType>(
    "songView",
    "leadsheet"
  );
  const currentIndex = parseInt(params.songIndex || "0", 10);
  const { loading } = useSetList();
  const songs = useGigSet(params.setSlug!);

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
            navigate(`/sets/${params.setSlug}/${previousIndex}`);
          }
        },
        onSwipedLeft: () => {
          if (nextIndex !== currentIndex) {
            navigate(`/sets/${params.setSlug}/${nextIndex}`);
          }
        },
      }),
      [currentIndex, navigate, nextIndex, previousIndex, params.setSlug]
    )
  );

  if (loading || !songs.length || !currentSong) {
    return <div>loading...</div>;
  }

  return (
    <div
      data-name="SETLIST_SONG"
      className={`relative flex h-full min-h-screen w-full flex-col`}
      {...(isMobile ? {} : swipeHandlers)}
    >
      <HomeButton />
      <ControlBar
        className={`
          z-20

          ${
            isMobile
              ? "fixed top-[100vh] -translate-y-full"
              : `sticky top-0 border border-b`
          }
        `}
        songs={songs}
        previousIndex={previousIndex}
        setSlug={params.setSlug!}
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
            <LeadSheet leadsheetUrl={currentSong.LeadSheet} />
          )}
          {songView === "lyrics" && <Lyrics lyricsUrl={currentSong.Lyrics} />}
          {songView === "info" && <SongInfo song={currentSong} />}
        </>
      )}
    </div>
  );
}
