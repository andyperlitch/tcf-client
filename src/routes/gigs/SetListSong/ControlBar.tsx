import { Link } from "react-router-dom";
import { SetListSong } from "@/types/songlist";
import { SongViewType } from "./types";

import { Button } from "@/components/ui/button";
import {
  FileIcon,
  InfoCircledIcon,
  QuoteIcon,
  RowsIcon,
  TrackNextIcon,
  TrackPreviousIcon,
} from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { isMobile } from "react-device-detect";
import { MiniGigMenu } from "./MiniGigMenu";

const VIEW_SELECT_OPTIONS = [
  {
    value: "leadsheet" as SongViewType,
    label: "Leadsheet",
    icon: <FileIcon />,
  },
  { value: "lyrics" as SongViewType, label: "Lyrics", icon: <QuoteIcon /> },
  { value: "info" as SongViewType, label: "Info", icon: <InfoCircledIcon /> },
];

interface ControlBarProps {
  previousLink: string;
  nextLink: string;
  songView: SongViewType;
  setSongView: (view: SongViewType) => void;
  className?: string;
  currentSong?: SetListSong;
  songIndex: number | "BREAK";
}

export function ControlBar({
  className,
  previousLink,
  nextLink,
  songIndex,
  songView,
  currentSong,
  setSongView,
}: ControlBarProps) {
  const viewPortWidth = window.innerWidth;
  return (
    <div
      data-name="SETLIST_CONTROL_BAR"
      className={`
        flex w-full items-center justify-between border bg-background

        ${className}
      `}
    >
      <div data-name="SETLIST_CONTROL_BAR_LEFT" className="flex items-center">
        <PreviousSongButton previousLink={previousLink} />
        <div
          data-name="SONG_TITLE_INFO"
          className={`flex flex-col items-start justify-center p-2`}
        >
          <h3
            data-name="SONG_TITLE"
            className={`
              flex max-w-[60vw] items-center overflow-hidden whitespace-nowrap
              font-bold
            `}
          >
            {songIndex === "BREAK" || !currentSong ? (
              "SET BREAK"
            ) : (
              <>
                <span
                  data-name="SONG_NUMBER"
                  className={`text-muted-foreground`}
                >
                  {songIndex + 1}.
                </span>
                <span className="overflow-hidden text-ellipsis">
                  {currentSong.Title}
                </span>
              </>
            )}
          </h3>

          {currentSong && (
            <div
              data-name="SONG_INFO_LINE"
              className="flex items-center space-x-2"
            >
              {currentSong.Key && (
                <Badge data-name="SONG_KEY" size="sm">
                  {currentSong.Key}
                </Badge>
              )}
              {Boolean(currentSong.Tempo) && !isNaN(currentSong.Tempo) && (
                <span
                  data-name="SONG_TEMPO"
                  className={`whitespace-nowrap italic`}
                >
                  {currentSong.Tempo} bpm
                </span>
              )}
              {currentSong.Feel && (
                <div
                  data-name="SONG_FEEL"
                  className={`text-xs italic text-muted-foreground`}
                >
                  {currentSong.Feel}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        data-name="SETLIST_CONTROL_BAR_RIGHT"
        className={`flex items-center space-x-2`}
      >
        <div
          data-name="VIEW_SELECT_BUTTONS"
          className={`
            flex items-center justify-between

            ${
              viewPortWidth < 768
                ? `
                  absolute bottom-full left-1/2 w-[80vw] max-w-[300px]
                  -translate-x-1/2 -translate-y-2 rounded border bg-background
                  p-2
                `
                : "gap-2"
            }
          `}
        >
          {VIEW_SELECT_OPTIONS.map((option) => (
            <Button
              variant={songView === option.value ? "default" : "secondary"}
              key={option.value}
              onClick={() => {
                setSongView(option.value);
              }}
            >
              {option.icon}
            </Button>
          ))}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="informational">
                <RowsIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <MiniGigMenu
                className="flex max-h-[60vh] flex-col overflow-y-auto"
                currentSong={currentSong}
              />
            </PopoverContent>
          </Popover>
        </div>

        <NextSongButton nextLink={nextLink} />
      </div>
    </div>
  );
}

function PreviousSongButton({ previousLink }: { previousLink: string }) {
  return (
    <Link to={previousLink}>
      <Button
        data-name="PREVIOUS_SONG_BUTTON"
        disabled={!previousLink}
        className={`
          m-2

          ${isMobile ? "px-3" : "px-6"}
        `}
        size={isMobile ? "sm" : "lg"}
        type="button"
        variant="advisory"
      >
        <TrackPreviousIcon
          className={`
            h-4 w-4

            md:h-6 md:w-6
          `}
        />
      </Button>
    </Link>
  );
}

function NextSongButton({ nextLink }: { nextLink: string }) {
  return (
    <Link to={nextLink}>
      <Button
        data-name="NEXT_SONG_BUTTON"
        disabled={!nextLink}
        className={`
          m-2

          ${isMobile ? "px-3" : "px-6"}
        `}
        size={isMobile ? "sm" : "lg"}
        type="button"
        variant="advisory"
      >
        <TrackNextIcon
          className={`
            h-4 w-4

            md:h-6 md:w-6
          `}
        />
      </Button>
    </Link>
  );
}
