"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateEngagementForm } from "./CreateEngagementForm";
import { PlusIcon } from "@radix-ui/react-icons";

export function CreateNewEngagementButton({
  eventId,
  eventSlug,
}: {
  eventId: number;
  eventSlug: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="constructive">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Engagement</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateEngagementForm eventId={eventId} eventSlug={eventSlug} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
