import { HomeButton } from "@/components/HomeButton";
import { ModeToggle } from "@/components/ModeToggle";
import { SETS } from "@/consts/sets";
import { Link } from "react-router-dom";

export function Sets() {
  return (
    <>
      <HomeButton />
      <div className="max-w-5xl mx-auto justify-center relative z-[2] p-4">
        <h2 className="text-6xl text-center pt-8 mb-8 font-hand">Set Lists</h2>
        <ol className="setlist">
          {SETS.map((setList, i) => (
            <li key={i} className="text-3xl">
              <Link to={`/sets/${setList.slug}`} className="pl-8 p-2 block">
                {setList.label}
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <ModeToggle />
    </>
  );
}
