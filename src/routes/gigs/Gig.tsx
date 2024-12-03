import { useGig } from "../../hooks/useGig";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import { HomeButton } from "@/components/HomeButton";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Gig() {
  const { gigSlug } = useParamsSafe("gigSlug");
  const { sets, gigMeta, loading } = useGig(gigSlug);

  return (
    <>
      <HomeButton />
      <div className="relative z-[2] mx-auto max-w-5xl justify-center p-4">
        {loading ? (
          <div>loading...</div>
        ) : (
          <>
            <h2 className={`mb-8 pt-8 text-center font-hand text-6xl`}>
              <span className="text-gray-500">Gig:</span> {gigMeta?.label}
            </h2>
            <div
              data-name="GIG_SETS"
              className={`
                flex flex-col

                md:flex-row md:flex-wrap
              `}
            >
              {sets.map((set, setIndex) => (
                <div
                  data-name="GIG_SET"
                  key={setIndex}
                  className={`
                    rounded-lg p-2

                    md:w-1/2
                  `}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        Set {setIndex + 1}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol key={setIndex}>
                        {set.map((song, songIndex) => (
                          <li
                            key={song.ID}
                            className="flex items-center text-xl"
                          >
                            {songIndex + 1}.
                            <Link
                              to={`/gigs/${gigSlug}/sets/${setIndex}/${songIndex}`}
                              className="block p-2 pl-8"
                            >
                              {song.Title}
                            </Link>
                            <div className="text-sm text-gray-500">
                              {song.Writer}
                            </div>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <ModeToggle />
    </>
  );
}
