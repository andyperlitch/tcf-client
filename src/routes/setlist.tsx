import { useCallback, useMemo, useState } from "react";
import "./setlist.css";
import { useSetList } from "../hooks/useSetList";

export { SetList };

function SetList() {
  console.log("SetList rendered");
  const { songs, loading } = useSetList();
  console.log(`loading`, loading);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = useMemo(() => {
    if (songs && songs.length) {
      return songs[currentSongIndex];
    }
  }, [currentSongIndex, songs]);

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
      if (prevIndex >= songs.length - 1) {
        return songs.length - 1;
      }
      return prevIndex + 1;
    });
  }, [songs]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!currentSong) {
    return <div>no songs</div>;
  }

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
