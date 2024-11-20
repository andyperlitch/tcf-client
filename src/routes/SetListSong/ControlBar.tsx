import { Link } from "react-router-dom";
import { SetListSong } from "../../types/setlist";
import { SongViewType } from "./types";

import { Button } from "@/components/ui/button";
import {
  ChevronRightIcon,
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
}

export function ControlBar({
  songs,
  currentIndex: songIndex,
  currentSong,
  previousIndex,
  setSlug,
  nextIndex,
  songView,
  setSongView,
}: ControlBarProps) {
  const { label } = SETS_BY_SLUG[setSlug!];
  return (
    <div
      data-name="SETLIST_CONTROL_BAR"
      className={`
        sticky top-0 flex items-center justify-between border-b border-border
        bg-background
      `}
    >
      <div data-name="SETLIST_CONTROL_BAR_LEFT" className="flex items-center">
        <Link to={`/sets/${setSlug}/${previousIndex}`}>
          <Button
            data-name="PREVIOUS_SONG_BUTTON"
            disabled={previousIndex === songIndex}
            className="m-2 px-6"
            size="lg"
            type="button"
            variant="advisory"
          >
            <TrackPreviousIcon className="h-6 w-6" />
          </Button>
        </Link>
        <div
          data-name="SONG_TITLE_INFO"
          className={`flex flex-col items-start justify-center p-2`}
        >
          <h3 data-name="SONG_TITLE" className={`flex items-center font-bold`}>
            <Link to={`/sets/${setSlug}`}>{label}</Link> <ChevronRightIcon />
            <span data-name="SONG_NUMBER" className="text-muted-foreground">
              {songIndex + 1}.
            </span>
            <span>{currentSong.Title}</span>
          </h3>
          <div
            data-name="SONG_INFO_LINE"
            className="flex items-center space-x-2"
          >
            <Badge data-name="SONG_KEY">{currentSong.Key}</Badge>
            <span data-name="SONG_TEMPO" className="italic">
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
        {VIEW_SELECT_OPTIONS.map((option) => (
          <Button
            variant={songView === option.value ? "default" : "secondary"}
            // disabled={songView === option.value}
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
            <div className="flex flex-col">
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

        <Link to={`/sets/${setSlug}/${nextIndex}`}>
          <Button
            data-name="NEXT_SONG_BUTTON"
            disabled={nextIndex === songIndex}
            className="m-2 px-6"
            size="lg"
            type="button"
            variant="advisory"
          >
            <TrackNextIcon className="h-6 w-6" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
