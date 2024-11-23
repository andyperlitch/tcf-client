import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useGig } from "../../../hooks/useGig";
import { LeadSheet } from "./LeadSheet";
import { ControlBar } from "./ControlBar";
import { SongViewType } from "./types";
import { Lyrics } from "./Lyrics";
import { SongInfo } from "./SongInfo";
import { useSwipeable } from "react-swipeable";
import { getPatOnTheBack } from "@/utils/getPatOnTheBack";
import { HomeButton } from "@/components/HomeButton";
import useLocalStorage from "use-local-storage";
import { CenteredMessage } from "@/components/CenteredMessage";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { SetListSong as SetListSongType } from "@/types/songlist";

const BREAK_SONG_INDEX = "BREAK";

export function SetListSong() {
  const {
    gigSlug,
    setIndex: setIndexString,
    songIndex: songIndexString,
  } = useParamsSafe("gigSlug", "setIndex", "songIndex");
  const setIndex = parseInt(setIndexString || "0", 10);
  const navigate = useNavigate();
  const [songView, setSongView] = useLocalStorage<SongViewType>(
    "songView",
    "leadsheet"
  );
  const { sets, loading } = useGig(gigSlug!);
  const viewPortWidth = window.innerWidth;
  const isCellPhone = viewPortWidth < 768;

  const { currentSong, previousLink, nextLink } = useMemo(() => {
    let currentSong: SetListSongType | undefined;
    let previousLink: string = "";
    let nextLink: string = "";
    if (!loading) {
      if (songIndexString === BREAK_SONG_INDEX) {
        console.log(`andy setIndex`, setIndex, sets);
        previousLink = `/gigs/${gigSlug}/sets/${setIndex}/${
          sets[setIndex].length - 1
        }`;
        nextLink = `/gigs/${gigSlug}/sets/${setIndex + 1}/0`;
      } else {
        const songIndex = parseInt(songIndexString || "0", 10);
        currentSong = sets?.[setIndex]?.[songIndex];

        if (currentSong) {
          if (setIndex === 0 && songIndex === 0) {
            previousLink = `/gigs/${gigSlug}`;
          } else if (setIndex === 0) {
            previousLink = `/gigs/${gigSlug}/sets/${setIndex}/${songIndex - 1}`;
          } else if (songIndex === 0) {
            previousLink = `/gigs/${gigSlug}/sets/${
              setIndex - 1
            }/${BREAK_SONG_INDEX}`;
          } else {
            previousLink = `/gigs/${gigSlug}/sets/${setIndex}/${songIndex - 1}`;
          }

          if (
            setIndex === sets.length - 1 &&
            songIndex === sets[setIndex].length - 1
          ) {
            nextLink = `/gigs/${gigSlug}`;
          } else if (setIndex === sets.length - 1) {
            nextLink = `/gigs/${gigSlug}/sets/${setIndex}/${songIndex + 1}`;
          } else if (songIndex === sets[setIndex].length - 1) {
            nextLink = `/gigs/${gigSlug}/sets/${setIndex}/${BREAK_SONG_INDEX}`;
          } else {
            nextLink = `/gigs/${gigSlug}/sets/${setIndex}/${songIndex + 1}`;
          }
        } else {
          // throw new Error("No current song found");
        }
      }
    }
    return {
      currentSong,
      previousLink,
      nextLink,
    };
  }, [gigSlug, loading, setIndex, sets, songIndexString]);

  const swipeHandlers = useSwipeable(
    useMemo(
      () => ({
        onSwipedRight: () => {
          if (previousLink) {
            navigate(previousLink);
          }
        },
        onSwipedLeft: () => {
          if (nextLink) {
            navigate(nextLink);
          }
        },
      }),
      [navigate, nextLink, previousLink]
    )
  );

  if (loading || !sets.length) {
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
            isCellPhone
              ? "fixed top-[100vh] -translate-y-full"
              : `sticky top-0 border border-b`
          }
        `}
        previousLink={previousLink}
        nextLink={nextLink}
        currentSong={currentSong}
        songView={songView}
        songIndex={
          songIndexString === "BREAK" ? "BREAK" : Number(songIndexString)
        }
        setSongView={setSongView}
      />
      {songIndexString === BREAK_SONG_INDEX ? (
        <CenteredMessage>{getPatOnTheBack()}</CenteredMessage>
      ) : (
        <>
          {songView === "leadsheet" && (
            <LeadSheet leadsheetUrl={currentSong?.LeadSheet} />
          )}
          {songView === "lyrics" && <Lyrics lyricsUrl={currentSong!.Lyrics} />}
          {songView === "info" && <SongInfo song={currentSong!} />}
        </>
      )}
    </div>
  );
}
