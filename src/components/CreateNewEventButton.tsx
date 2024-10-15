"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateEventForm } from "./CreateEventForm";

export function CreateNewEventButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
          <DialogDescription>Make it a hot one.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateEventForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
