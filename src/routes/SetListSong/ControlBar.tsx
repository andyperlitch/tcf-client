import { Link } from "react-router-dom";
import cn from "clsx";
import { SetListSong } from "../../types/setlist";
import { SongViewType } from "./types";

import "./ControlBar.css";

const VIEW_SELECT_OPTIONS = [
  { value: "leadsheet" as SongViewType, label: "Leadsheet", icon: "📋" },
  { value: "lyrics" as SongViewType, label: "Lyrics", icon: "🎤" },
  { value: "info" as SongViewType, label: "Info", icon: "ℹ️" },
];

interface ControlBarProps {
  currentIndex: number;
  currentSong: SetListSong;
  previousIndex: number;
  nextIndex: number;
  songView: SongViewType;
  setSongView: (view: SongViewType) => void;
}

export function ControlBar({
  currentIndex: songIndex,
  currentSong,
  previousIndex,
  nextIndex,
  songView,
  setSongView,
}: ControlBarProps) {
  return (
    <div className="setlistCtl">
      <div className="setlistCtlLeft">
        <Link to={`/setlist/${previousIndex}`}>
          <button
            disabled={previousIndex === songIndex}
            className="prevNextBtn"
            type="button"
          >
            👈
          </button>
        </Link>
        <div className="songTitleInfo">
          <h3 className="songTitle">
            <span className="songNumber">{songIndex + 1}.</span>{" "}
            {currentSong.Title}
          </h3>
          <div className="songInfoLine">
            <span className="songKey">{currentSong.Key}</span>
            <span className="songTempo">{currentSong.Tempo} bpm</span>
          </div>
        </div>
      </div>

      <div className="setlistCtlRight">
        {VIEW_SELECT_OPTIONS.map((option) => (
          <button
            className={cn("viewSelectBtn", {
              active: songView === option.value,
            })}
            key={option.value}
            onClick={() => {
              setSongView(option.value);
            }}
          >
            {option.icon}
          </button>
        ))}
        <Link to={`/setlist`}>
          <button className="prevNextBtn homeBtn" type="button">
            🏠
          </button>
        </Link>
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
    </div>
  );
}
