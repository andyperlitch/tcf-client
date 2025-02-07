import { CardHeader, CardTitle } from "@/components/ui/card";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Card } from "@/components/ui/card";
import {
  GigSetFragment,
  GigSongFragment,
  useBandDeleteGigSongMutation,
  useBandUpdateGigSetMutation,
} from "@/gql/graphql";
import { useCallback, useEffect, useState } from "react";
import { GigSong } from "./GigSong";
import { AddGigSongInput } from "./AddGigSongInput";
import { TrashIcon } from "@radix-ui/react-icons";
import { InlineTypeoutConfirmButton } from "@/components/InlineTypeoutConfirmButton";

export function AdminGigSet({
  gigId,
  gigSet,
  gigSetIndex,
  refetchGig,
  onDelete,
  className,
}: {
  gigId: number;
  gigSet: GigSetFragment;
  gigSetIndex: number;
  refetchGig: () => void;
  onDelete: (gigSetId: number) => void;
  className?: string;
}) {
  const [deleteGigSong, { loading: deletingGigSong }] =
    useBandDeleteGigSongMutation();

  const [sortedGigSongs, setSortedGigSongs] = useState<GigSongFragment[]>([]);

  useEffect(() => {
    setSortedGigSongs(
      Array.from(gigSet.songs).sort((a, b) => a.order - b.order)
    );
  }, [gigSet.songs]);

  const [updateGigSet] = useBandUpdateGigSetMutation();
  const updateGigSetOrder = useCallback(
    (setOrder: number[]) => {
      updateGigSet({
        variables: {
          gigSetId: gigSet.id,
          data: {
            setOrder,
          },
        },
      }).then(refetchGig);
    },
    [gigSet.id, refetchGig, updateGigSet]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      // Get current indexes
      const oldIndex = sortedGigSongs.findIndex((s) => s.id === active.id);
      const newIndex = sortedGigSongs.findIndex((s) => s.id === over.id);

      // Reorder array
      const updatedSongs = [...sortedGigSongs];
      const [movedItem] = updatedSongs.splice(oldIndex, 1);
      updatedSongs.splice(newIndex, 0, movedItem);

      // Assign new order numbers
      const reorderedSongs = updatedSongs.map((song, index) => ({
        ...song,
        order: index,
      }));

      setSortedGigSongs(reorderedSongs);

      // Send new order to backend
      updateGigSetOrder(reorderedSongs.map((song) => song.id));
    },
    [sortedGigSongs, updateGigSetOrder]
  );

  return (
    <div
      data-name="GIG_SET"
      key={gigSet.id}
      className={`
        flex items-center

        ${className}
      `}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-3xl">
            <div>Set {gigSetIndex + 1}</div>

            <InlineTypeoutConfirmButton
              className={`
                opacity-25

                hover:opacity-100
              `}
              message="Delete this set permanently?"
              size="icon"
              variant="destructive"
              onConfirm={() => onDelete(gigSet.id)}
            >
              <TrashIcon />
            </InlineTypeoutConfirmButton>
          </CardTitle>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sortedGigSongs.map((song) => song.id)}
              strategy={verticalListSortingStrategy}
            >
              <div data-name="GIG_SET_SONGS" className="flex flex-col">
                {sortedGigSongs.map((gigSong) => (
                  <GigSong
                    key={gigSong.id}
                    gigId={gigId}
                    gigSong={gigSong}
                    onDelete={() => {
                      if (deletingGigSong) return;
                      deleteGigSong({
                        variables: {
                          gigSongId: gigSong.id,
                        },
                      }).then(refetchGig);
                    }}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <AddGigSongInput gigSetId={gigSet.id} onSuccess={refetchGig} />
        </CardHeader>
      </Card>
    </div>
  );
}
