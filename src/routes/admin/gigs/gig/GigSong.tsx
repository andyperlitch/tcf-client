import { Button } from "@/components/ui/button";
import { GigSongFragment } from "@/gql/graphql";
import { useSortable } from "@dnd-kit/sortable";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { CSS } from "@dnd-kit/utilities";

export function GigSong({
  gigSong,
  onDelete,
}: {
  gigSong: GigSongFragment;
  onDelete: (gigSongId: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: gigSong.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-name="GIG_SET_SONG"
      key={gigSong.id}
      className={`
        flex items-center justify-between border-b border-border py-2 text-lg

        last:border-b-0
      `}
    >
      <div
        className="flex cursor-grab items-baseline gap-2"
        {...attributes}
        {...listeners}
      >
        <div className="text-muted-foreground">{gigSong.order + 1}.</div>
        <div className="text-xl font-bold">{gigSong.song?.title}</div>
        <div className="italic text-muted-foreground">
          {gigSong.song?.artist}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link to={`/admin/songs/${gigSong.song?.id}`} target="_blank">
          <Button variant="ghost" tooltip="View song">
            <ExternalLinkIcon />
          </Button>
        </Link>
        <Button
          variant="ghost"
          tooltip="Remove song from set"
          className="text-red-500"
          onClick={() => {
            onDelete(gigSong.id);
          }}
        >
          <Cross2Icon />
        </Button>
      </div>
    </div>
  );
}
