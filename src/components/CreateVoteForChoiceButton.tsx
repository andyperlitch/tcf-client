import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateVoteForChoiceForm } from "./CreateVoteForChoiceForm";
import { useState } from "react";

export function CreateVoteForChoiceButton({
  engagementId,
  onCreated,
}: {
  engagementId: number;
  onCreated?: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="constructive">
          <PlusIcon className="mr-2 h-4 w-4" /> add choice
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Vote Choice</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateVoteForChoiceForm
            engagementId={engagementId}
            onCreated={() => {
              setOpen(false);
              onCreated?.();
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
