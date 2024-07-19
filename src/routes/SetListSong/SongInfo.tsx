import { SetListSong } from "../../types/setlist";
import "./SongInfo.css";

export function SongInfo({ song }: { song: SetListSong }) {
  return (
    <div className="songInfo">
      <p>
        Artist: <strong>{song.Writer}</strong>
      </p>
      <p>
        Feel: <strong>{song.Feel}</strong>
      </p>
      <p>
        Key: <strong>{song.Key}</strong>
      </p>
      <p>
        Tempo: <strong>{song.Tempo} bpm</strong>
      </p>
      {song.SongLink && (
        <p>
          Song Link:{" "}
          <strong>
            <a href={song.SongLink} target="_blank" rel="noreferrer">
              {getSongLinkSource(song.SongLink)}
            </a>
          </strong>
        </p>
      )}
      <p>
        Duration: <strong>{song.Duration} min</strong>
      </p>
      {song.AndyNotes && (
        <p>
          Andy's Notes: <strong>{song.AndyNotes}</strong>
        </p>
      )}
      {song.LeadSheetEditLink && (
        <p>
          <a
            className="leadSheetEditLink"
            href={song.LeadSheetEditLink}
            target="_blank"
            rel="noreferrer"
          >
            Lead Sheet GDoc ✏️
          </a>
        </p>
      )}
    </div>
  );
}

function getSongLinkSource(url: string) {
  // if domain is spotify, return "Spotify"
  if (url.includes("spotify")) {
    return "Spotify";
  }
  if (url.includes("drive.google")) {
    return "Drive";
  }
}
