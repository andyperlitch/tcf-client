import { DetailedGigSongFragment, GigFragment } from "@/gql/graphql";
import { Link } from "react-router-dom";
import { SetBreak, SongView } from "./consts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Fragment as F } from "react/jsx-runtime";
import { ReactNode } from "react";

export function MiniGigMenu({
  currentSongOrBreak,
  gig,
  view,
  setView,
  className,
}: {
  currentSongOrBreak: DetailedGigSongFragment | SetBreak;
  gig: GigFragment;
  view: SongView;
  setView: (view: SongView) => void;
  className?: string;
}) {
  return (
    <div
      data-name="MINI_GIG_MENU"
      className={`
        ${className}

        flex flex-col gap-2
      `}
    >
      <div data-name="VIEW_SELECTOR" className="flex gap-2">
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={setView}
          className="w-full"
        >
          <ToggleGroupItem value={SongView.Leadsheet}>
            leadsheet
          </ToggleGroupItem>
          <ToggleGroupItem value={SongView.Lyrics}>lyrics</ToggleGroupItem>
          <ToggleGroupItem value={SongView.Info}>info</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div data-name="GIG_SETS" className="flex flex-col gap-2">
        {gig.sets.map((set, setIndex) => {
          return (
            <F key={setIndex}>
              {setIndex > 0 && (
                <SetBreakLink
                  gigId={gig.id}
                  lastSetId={gig.sets[setIndex - 1].id}
                  nextSetId={set.id}
                  currentSongOrBreak={currentSongOrBreak}
                />
              )}
              <div data-name="GIG_SET">
                <h3 className="text-lg">Set {setIndex + 1}</h3>
                <div data-name="GIG_SET_LIST">
                  {set.songs.map((song, songIndex) => (
                    <div
                      key={song.id}
                      data-name="GIG_SET_LIST_ITEM"
                      className={`flex items-baseline space-x-1`}
                    >
                      <span className="text-muted-foreground">
                        {songIndex + 1}.
                      </span>
                      {currentSongOrBreak.__typename === "GigSong" &&
                      song.id === currentSongOrBreak.id ? (
                        <span className={`font-bold`}>{song.song?.title}</span>
                      ) : (
                        <Link to={`/gigs/${gig.id}/songs/${song.id}`}>
                          {song.song?.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </F>
          );
        })}
      </div>
    </div>
  );
}

function SetBreakLink({
  gigId,
  lastSetId,
  nextSetId,
  currentSongOrBreak,
}: {
  gigId: number;
  lastSetId: number;
  nextSetId: number;
  currentSongOrBreak: DetailedGigSongFragment | SetBreak;
}) {
  let children: ReactNode;

  if (
    currentSongOrBreak.__typename === "SetBreak" &&
    lastSetId === currentSongOrBreak.lastSetId &&
    nextSetId === currentSongOrBreak.nextSetId
  ) {
    children = `(set break)`;
  } else {
    children = (
      <Link to={`/gigs/${gigId}/setbreak/${lastSetId}/${nextSetId}`}>
        (set break)
      </Link>
    );
  }

  return <div data-name="SET_BREAK">{children}</div>;
}
