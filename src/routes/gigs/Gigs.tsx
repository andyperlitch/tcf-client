import { HomeButton } from "@/components/HomeButton";
import { ModeToggle } from "@/components/ModeToggle";
import { GIGS } from "@/consts/gigs";
import { Link } from "react-router-dom";

export function Gigs() {
  return (
    <>
      <HomeButton />
      <div className="relative z-[2] mx-auto max-w-5xl justify-center p-4">
        <h2 className="mb-8 pt-8 text-center font-hand text-6xl">Gigs</h2>
        <ol className="setlist">
          {GIGS.map((gig, i) => (
            <li key={i} className="text-3xl">
              <Link to={`/gigs/${gig.slug}`} className="block p-2 pl-8">
                {gig.label}
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <ModeToggle />
    </>
  );
}
