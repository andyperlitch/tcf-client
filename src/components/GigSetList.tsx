import { GigSetFragment } from "@/gql/graphql";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router-dom";

export function GigSetList({
  title,
  gigId,
  set,
}: {
  title: string;
  gigId: number;
  set: GigSetFragment;
}) {
  return (
    <div
      data-name="GIG_SET"
      key={set.id}
      className={`
        max-w-[800px] rounded-lg

        md:flex-1
      `}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ol>
            {set.songs.map((song, songIndex) => (
              <li key={song.id} className="flex items-center text-xl">
                {songIndex + 1}.
                <Link
                  to={`/gigs/${gigId}/songs/${song.id}`}
                  className="block p-2 pl-8"
                >
                  {song.song?.title}
                </Link>
                <div className="text-sm text-gray-500">{song.song?.artist}</div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
