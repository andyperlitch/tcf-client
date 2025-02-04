import {
  GigFragment,
  DetailedGigSongFragment,
  GigSongFragment,
} from "@/gql/graphql";
import { SetBreak, SongView } from "./consts";
import { Link } from "react-router-dom";
import {
  RowsIcon,
  TrackNextIcon,
  TrackPreviousIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { KeyBadge } from "@/components/KeyBadge";
import { SongFeelBadge } from "@/components/SongFeelBadge";
import { TempoBadge } from "@/components/TempoBadge/TempoBadge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MiniGigMenu } from "./MiniGigMenu";
import { isCellPhone } from "@/utils/isCellPhone";
import { getSongOrBreakTitle } from "./utils";
import { getSongOrBreakUrl } from "./utils";

const BUTTON_DIMENSION_CLASSES = isCellPhone ? "h-5 w-5" : "h-6 w-6";
const BUTTON_SIZE = isCellPhone ? "sm" : "lg";
const TITLE_FONT_SIZE = isCellPhone ? "text-md" : "text-2xl";

export function ControlBar({
  gig,
  gigSongOrBreak: gigSongOrBreak,
  view,
  setView,
  className,
  previousSongOrBreak,
  nextSongOrBreak,
}: {
  gig: GigFragment | null;
  gigSongOrBreak: DetailedGigSongFragment | SetBreak | null;
  view: SongView;
  setView: (view: SongView) => void;
  className?: string;
  previousSongOrBreak: GigSongFragment | SetBreak | null;
  nextSongOrBreak: GigSongFragment | SetBreak | null;
}) {
  const previousButton = (
    <Button
      disabled={!previousSongOrBreak || !gig}
      variant="constructive"
      size={BUTTON_SIZE}
      className={`h-full`}
    >
      <TrackPreviousIcon
        className={`
          ${BUTTON_DIMENSION_CLASSES}
        `}
      />
    </Button>
  );

  const nextButton = (
    <Button
      disabled={!nextSongOrBreak || !gig}
      variant="constructive"
      size={BUTTON_SIZE}
      className={`h-full`}
    >
      <TrackNextIcon
        className={`
          ${BUTTON_DIMENSION_CLASSES}
        `}
      />
    </Button>
  );

  return (
    <div
      data-name="SET_LIST_SONG_CONTROL_BAR"
      className={`
        flex items-stretch justify-between border-b border-muted bg-black p-1

        md:p-4

        ${className}
      `}
    >
      <div data-name="LEFT_BUTTONS" className="flex items-stretch gap-2">
        {previousSongOrBreak ? (
          <Link to={getSongOrBreakUrl(gig, previousSongOrBreak)}>
            {previousButton}
          </Link>
        ) : (
          previousButton
        )}

        <div
          data-name="SET_LIST_SONG_CONTROL_BAR_SONG_TITLE"
          className={`flex min-h-16 flex-col gap-1`}
        >
          <h1
            className={`
              ${TITLE_FONT_SIZE}

              font-bold
            `}
          >
            {gigSongOrBreak?.__typename === "GigSong"
              ? `${gigSongOrBreak.order + 1}.`
              : ""}{" "}
            {getSongOrBreakTitle(gigSongOrBreak)}
          </h1>
          {gigSongOrBreak?.__typename === "GigSong" && (
            <div data-name="BADGES" className="flex gap-2">
              <KeyBadge songKey={gigSongOrBreak?.song?.key} />
              <TempoBadge tempo={gigSongOrBreak?.song?.tempo} />
              {!isCellPhone && (
                <SongFeelBadge songFeel={gigSongOrBreak?.song?.feel} />
              )}
            </div>
          )}
        </div>
      </div>

      <div data-name="RIGHT_BUTTONS" className="flex items-stretch gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="informational"
              size={BUTTON_SIZE}
              className={`h-full`}
            >
              <RowsIcon
                className={`
                  ${BUTTON_DIMENSION_CLASSES}
                `}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {gigSongOrBreak && gig && (
              <MiniGigMenu
                className="flex max-h-[60vh] flex-col overflow-y-auto"
                currentSongOrBreak={gigSongOrBreak}
                gig={gig}
                view={view}
                setView={setView}
              />
            )}
          </PopoverContent>
        </Popover>
        {nextSongOrBreak ? (
          <Link
            to={
              nextSongOrBreak.__typename === "SetBreak"
                ? `/gigs/${gig?.id}/setbreak/${nextSongOrBreak.lastSetId}/${nextSongOrBreak.nextSetId}`
                : `/gigs/${gig?.id}/songs/${nextSongOrBreak.id}`
            }
          >
            {nextButton}
          </Link>
        ) : (
          nextButton
        )}
      </div>
    </div>
  );
}
