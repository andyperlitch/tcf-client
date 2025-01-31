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
import { PlusIcon } from "@radix-ui/react-icons";

export function CreateNewEventButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="h-4 w-4" /> New Event
        </Button>
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
