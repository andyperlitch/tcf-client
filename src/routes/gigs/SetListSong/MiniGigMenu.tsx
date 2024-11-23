import { useGig } from "@/hooks/useGig";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { SetListSong } from "@/types/songlist";
import { Link } from "react-router-dom";

export function MiniGigMenu({
  currentSong,
  className,
}: {
  currentSong: SetListSong | undefined;
  className?: string;
}) {
  const { gigSlug } = useParamsSafe("gigSlug");
  const { gigMeta, sets } = useGig(gigSlug);

  return (
    <div data-name="MINI_GIG_MENU" className={className}>
      <Link className="font-hand text-3xl" to={`/gigs/${gigSlug}`}>
        {gigMeta?.label}
      </Link>

      {sets.map((songs, setIndex) => {
        return (
          <div data-name="GIG_SET" key={setIndex}>
            <h3 className="text-lg">Set {setIndex + 1}</h3>
            <div data-name="GIG_SET_LIST">
              {songs.map((song, songIndex) => (
                <div
                  data-name="GIG_SET_LIST_ITEM"
                  key={song.ID}
                  className={`flex space-x-1`}
                >
                  <span className="text-sm">{songIndex + 1}.</span>
                  {song.ID === currentSong?.ID ? (
                    <span className={`font-bold`}>{song.Title}</span>
                  ) : (
                    <Link to={`/gigs/${gigSlug}/sets/${setIndex}/${songIndex}`}>
                      {song.Title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
