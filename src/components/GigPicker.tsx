import { ArchiveIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useBandGigsQuery } from "@/gql/graphql";

export function GigPicker() {
  const { data, loading, error } = useBandGigsQuery();
  const gigs = data?.gigs;

  if (loading || error || !gigs) {
    return null;
  }

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
          {gigs.map((gig) => (
            <Link key={gig.id} to={`/gigs/${gig.id}`}>
              <DropdownMenuItem>{gig.name}</DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
