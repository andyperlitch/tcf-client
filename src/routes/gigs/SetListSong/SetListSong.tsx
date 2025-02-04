import { ControlBar } from "./ControlBar";
import { useSetListSongOrBreak } from "./useSetListSong";
import useLocalStorage from "use-local-storage";
import { LeadsheetView } from "./LeadsheetView";
import { InfoView } from "./InfoView";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SongView } from "./consts";
import { useNavigate, useParams } from "react-router-dom";
import { CenteredMessage } from "@/components/CenteredMessage";
import { getPatOnTheBack } from "@/utils/getPatOnTheBack";
import { GigSetList } from "@/components/GigSetList";
import { useSwipeable } from "react-swipeable";
import { useMemo } from "react";
import { getSongOrBreakUrl } from "./utils";
import { isCellPhone } from "@/utils/isCellPhone";

export function SetListSong() {
  const allParams = useParams();
  const gigId = Number(allParams.gigId);
  const gigSongId = allParams.gigSongId ? Number(allParams.gigSongId) : null;
  const nextSetId = allParams.nextSetId ? Number(allParams.nextSetId) : null;
  const lastSetId = allParams.lastSetId ? Number(allParams.lastSetId) : null;

  const [view, setView] = useLocalStorage<SongView>(
    "SetListSong:view",
    SongView.Leadsheet
  );
  const [followLeader, setFollowLeader] = useLocalStorage<boolean>(
    "SetListSong:followLeader",
    true
  );

  const navigate = useNavigate();

  const {
    gig,
    gigSongOrBreak,
    previousSongOrBreak,
    nextSongOrBreak,
    loading,
    error,
    refetch,
  } = useSetListSongOrBreak({
    gigId,
    gigSongId,
    lastSetId,
    nextSetId,
    followLeader,
  });

  const nextSet =
    gig?.id &&
    gigSongOrBreak?.__typename === "SetBreak" &&
    gig?.sets.find((set) => set.id === nextSetId);

  const swipeHandlers = useSwipeable(
    useMemo(
      () => ({
        onSwipedRight: () => {
          if (previousSongOrBreak) {
            navigate(getSongOrBreakUrl(gig, previousSongOrBreak));
          }
        },
        onSwipedLeft: () => {
          if (nextSongOrBreak) {
            navigate(getSongOrBreakUrl(gig, nextSongOrBreak));
          }
        },
      }),
      [navigate, nextSongOrBreak, previousSongOrBreak, gig]
    )
  );
  const patOnBack = useMemo(() => getPatOnTheBack(), []);

  return (
    <div
      data-name="SET_LIST_SONG"
      className="flex min-h-screen flex-col gap-0"
      {...(isCellPhone ? {} : swipeHandlers)}
    >
      <ControlBar
        gig={gig}
        gigSongOrBreak={gigSongOrBreak}
        view={view}
        setView={setView}
        previousSongOrBreak={previousSongOrBreak}
        nextSongOrBreak={nextSongOrBreak}
        followLeader={followLeader}
        setFollowLeader={setFollowLeader}
      />
      {loading && <Loader />}
      {error && <ErrorMessage error={error} retry={refetch} />}
      {gig && gigSongOrBreak?.__typename === "GigSong" && (
        <>
          {view === SongView.Leadsheet && (
            <LeadsheetView gig={gig} gigSong={gigSongOrBreak} view={view} />
          )}
          {view === SongView.Lyrics && (
            <LeadsheetView gig={gig} gigSong={gigSongOrBreak} view={view} />
          )}
          {view === SongView.Info && (
            <InfoView gig={gig} gigSong={gigSongOrBreak} />
          )}
        </>
      )}
      {nextSet && (
        <CenteredMessage className="min-h-[calc(100vh-300px)]">
          {patOnBack}
          <GigSetList
            title="Here's what's coming up..."
            gigId={gig.id}
            set={nextSet}
          />
        </CenteredMessage>
      )}
    </div>
  );
}
