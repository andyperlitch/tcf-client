import { DialogClose, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SongFragment, useBandDeleteSongMutation } from "@/gql/graphql";
import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const SongActionsCell = ({ song }: { song: SongFragment }) => {
  const [deleteSong, { loading: deletingSong }] = useBandDeleteSongMutation();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <DialogTrigger>
              <span className="flex text-red-600">Delete song</span>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(`/admin/songs/${song.id}`)}>
            View song details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent aria-describedby="delete-song-description">
        <DialogHeader>
          <DialogTitle>Delete song "{song.title}"?</DialogTitle>
        </DialogHeader>
        <p id="delete-song-description">This cannot be undone.</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" disabled={deletingSong}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={deletingSong}
            variant="destructive"
            type="button"
            onClick={useCallback(() => {
              deleteSong({
                variables: {
                  songId: song.id,
                },
                refetchQueries: ["bandSongs"],
              }).then(() => {
                toast({
                  title: "Song deleted",
                  variant: "constructive",
                });
                setOpen(false);
              });
            }, [deleteSong, song.id, toast])}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
