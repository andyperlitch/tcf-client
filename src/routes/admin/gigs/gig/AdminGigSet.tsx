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
  useBandUpdateGigSetMutation,
} from "@/gql/graphql";
import { useCallback, useEffect, useState } from "react";
import { GigSong } from "./GigSong";
import { AddGigSongInput } from "./AddGigSongInput";
export function AdminGigSet({
  gigSet,
  gigSetIndex,
  refetchGig,
}: {
  gigSet: GigSetFragment;
  gigSetIndex: number;
  refetchGig: () => void;
}) {
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
      className={`flex flex-1 items-center`}
    >
      <Card className="w-full max-w-[800px]">
        <CardHeader>
          <CardTitle className="text-3xl">Set {gigSetIndex + 1}</CardTitle>
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
                  <GigSong key={gigSong.id} gigSong={gigSong} />
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
