import { HomeIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HomeButton() {
  return (
    <div className="fixed bottom-2 right-2 z-10">
      <Button variant="outline" size="icon">
        <Link to="/">
          <HomeIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select setlist</span>
        </Link>
      </Button>
    </div>
  );
}
