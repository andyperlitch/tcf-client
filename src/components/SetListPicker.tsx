import { ArchiveIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SETS } from "@/consts/sets";
import { Link } from "react-router-dom";

export function SetListPicker() {
  return (
    <div className="absolute bottom-2 right-2 z-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <ArchiveIcon className="absolute h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Select setlist</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {SETS.map((set) => (
            <Link key={set.slug} to={`/sets/${set.slug}`}>
              <DropdownMenuItem>{set.label}</DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
