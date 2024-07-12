import { useCallback, useMemo, useState } from "react";
import { SONGS } from "../consts/songs";
import "./setlist.css";

export { SetList };

function SetList() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = useMemo(
    () => SONGS[currentSongIndex],
    [currentSongIndex]
  );

  const onBack = useCallback(() => {
    setCurrentSongIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return 0;
    });
  }, []);
  const onForward = useCallback(() => {
    setCurrentSongIndex((prevIndex) => {
      if (prevIndex >= SONGS.length - 1) {
        return SONGS.length - 1;
      }
      return prevIndex + 1;
    });
  }, []);

  return (
    <div className="setlistRoot">
      <div className="setlistCtl">
        <button className="prevNextBtn" type="button" onClick={onBack}>
          &laquo;
        </button>
        <h3>
          {currentSongIndex + 1}. {currentSong.Title}
        </h3>
        <button className="prevNextBtn" type="button" onClick={onForward}>
          &raquo;
        </button>
      </div>
      {currentSong.LeadSheet && (
        <iframe
          className="leadSheetFrame"
          src={`${currentSong.LeadSheet}?embedded=true`}
        />
      )}
    </div>
  );
}
