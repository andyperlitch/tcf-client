import { Link } from "react-router-dom";
import { SetListSong } from "../../types/setlist";
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
import { SETS_BY_SLUG } from "@/consts/sets";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { isMobile } from "react-device-detect";

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
  songs: SetListSong[];
  setSlug: string;
  currentIndex: number;
  currentSong: SetListSong;
  previousIndex: number;
  nextIndex: number;
  songView: SongViewType;
  setSongView: (view: SongViewType) => void;
  className?: string;
}

export function ControlBar({
  className,
  songs,
  currentIndex: songIndex,
  currentSong,
  previousIndex,
  setSlug,
  nextIndex,
  songView,
  setSongView,
}: ControlBarProps) {
  const setMeta = SETS_BY_SLUG[setSlug!];
  return (
    <div
      data-name="SETLIST_CONTROL_BAR"
      className={`
        flex w-full items-center justify-between border bg-background

        ${className}
      `}
    >
      <div data-name="SETLIST_CONTROL_BAR_LEFT" className="flex items-center">
        <Link to={`/sets/${setSlug}/${previousIndex}`}>
          <Button
            data-name="PREVIOUS_SONG_BUTTON"
            disabled={previousIndex === songIndex}
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
            <span data-name="SONG_NUMBER" className="text-muted-foreground">
              {songIndex + 1}.
            </span>
            <span className="overflow-hidden text-ellipsis">
              {currentSong.Title}
            </span>
          </h3>
          <div
            data-name="SONG_INFO_LINE"
            className="flex items-center space-x-2"
          >
            <Badge data-name="SONG_KEY" size="sm">
              {currentSong.Key}
            </Badge>
            <span data-name="SONG_TEMPO" className="whitespace-nowrap italic">
              {currentSong.Tempo} bpm
            </span>
            <div
              data-name="SONG_FEEL"
              className={`text-xs italic text-muted-foreground`}
            >
              {currentSong.Feel}
            </div>
          </div>
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
              isMobile
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
              <div className="flex max-h-[60vh] flex-col overflow-y-auto">
                <Link className="font-hand text-3xl" to={`/sets/${setSlug}`}>
                  {setMeta.label}
                </Link>
                {songs.map((song, index) => {
                  if (songIndex !== index) {
                    return (
                      <Link
                        className="py-1"
                        key={song.Title}
                        to={`/sets/${setSlug}/${index}`}
                      >
                        {index + 1}. {song.Title}
                      </Link>
                    );
                  }
                  return (
                    <p className="py-1 font-bold" key={song.Title}>
                      {index + 1}. {song.Title}
                    </p>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Link to={`/sets/${setSlug}/${nextIndex}`}>
          <Button
            data-name="NEXT_SONG_BUTTON"
            disabled={nextIndex === songIndex}
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
      </div>
    </div>
  );
}
