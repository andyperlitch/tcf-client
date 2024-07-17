import { Link } from "react-router-dom";
import { SetListSong } from "../../types/setlist";
import { SongViewType } from "./types";
import { ChangeEvent, useCallback } from "react";

import "./ControlBar.css";

const VIEW_SELECT_OPTIONS = [
  { value: "leadsheet", label: "Leadsheet" },
  { value: "lyrics", label: "Lyrics" },
  { value: "info", label: "Info" },
];

interface ControlBarProps {
  songIndex: number;
  currentSong: SetListSong;
  previousIndex: number;
  nextIndex: number;
  songView: SongViewType;
  setSongView: (view: SongViewType) => void;
}

export function ControlBar({
  songIndex,
  currentSong,
  previousIndex,
  nextIndex,
  songView,
  setSongView,
}: ControlBarProps) {
  const handleViewChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSongView(event.target.value as SongViewType);
    },
    [setSongView]
  );

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
        <h3>
          <span className="songNumber">{songIndex + 1}.</span>{" "}
          {currentSong.Title}
        </h3>
        <span className="songKey">{currentSong.Key}</span>

        <span className="songTempo">{currentSong.Tempo} bpm</span>
      </div>

      <div className="setlistCtlMiddle">
        <select
          className="songViewSelect"
          onChange={handleViewChange}
          value={songView}
        >
          {VIEW_SELECT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="setlistCtlRight">
        <Link to={`/setlist`}>
          <button className="prevNextBtn homeBtn" type="button">
            📋
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
