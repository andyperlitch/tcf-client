import { ArchiveIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GIGS } from "@/consts/gigs";
import { Link } from "react-router-dom";

export function GigPicker() {
  return (
    <div data-name="GIG-PICKER" className="fixed bottom-2 right-2 z-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <ArchiveIcon className="absolute h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Select gig</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {GIGS.map((set) => (
            <Link key={set.slug} to={`/sets/${set.slug}`}>
              <DropdownMenuItem>{set.label}</DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
