import { EditableText } from "@/components/EditableText";
import { TempoSetter } from "@/components/TempoSetter";
import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/image-input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { SongFragment, useBandUpdateSongMutation } from "@/gql/graphql";
import { useImageInputHandlers } from "@/hooks/useImageInputHandlers";
import { useCallback, useState } from "react";

export function SongDetailsEditor({
  song,
  className,
}: {
  song: SongFragment;
  className?: string;
}) {
  const [image, setImage] = useState<File | null>(null);
  const {
    progress,
    handleImageChange,
    handlePasteFromClipboard,
    deleteFromS3,
  } = useImageInputHandlers({
    image,
    setImage,
    onUploadComplete: (key) => {
      updateSong({
        variables: { songId: song.id, data: { coverArtUrl: key } },
      });
    },
  });
  const [updateSong] = useBandUpdateSongMutation();

  return (
    <div
      className={`
        flex gap-4

        ${className}
      `}
    >
      <div data-name="LEFT_COLUMN">
        <div data-name="COVER_ART_SECTION">
          <Label>Cover Art</Label>
          <div className="relative flex flex-col">
            <ImageInput
              value={image}
              currentImageUrl={song.coverArtUrl}
              emptyMessage={
                <div className="flex flex-col gap-2 p-2">
                  <span>Click to select an image or</span>
                  <Button size="sm" onClick={handlePasteFromClipboard}>
                    Paste from clipboard
                  </Button>
                </div>
              }
              onChange={handleImageChange}
              name="coverArtUrl"
              width={200}
              height={200}
              className="h-64 w-64"
              onCurrentImageClear={useCallback(() => {
                if (song.coverArtUrl) {
                  deleteFromS3(song.coverArtUrl);
                  updateSong({
                    variables: { songId: song.id, data: { coverArtUrl: null } },
                  });
                }
              }, [deleteFromS3, song.coverArtUrl, updateSong, song.id])}
            />
            {progress !== null && <Progress value={progress} />}
          </div>
        </div>
      </div>
      <div data-name="RIGHT_COLUMN" className="flex flex-col gap-4">
        <div
          data-name="DETAILS_ROW_ONE"
          className={`
            flex flex-wrap gap-4

            *:min-w-[100px]
          `}
        >
          <div data-name="ARTIST">
            <Label>Artist</Label>
            <EditableText
              className="text-lg font-bold"
              value={song.artist || ""}
              setValue={(value) =>
                updateSong({
                  variables: { songId: song.id, data: { artist: value } },
                })
              }
              tabbable
              element="div"
            />
          </div>
          <div data-name="TEMPO">
            <Label>Tempo</Label>
            <TempoSetter className="text-lg font-bold" song={song} />
          </div>
          <div data-name="KEY">
            <Label>Key</Label>
            <EditableText
              className="text-lg font-bold"
              inputClassName="min-w-8"
              value={song.key || ""}
              setValue={(value) =>
                updateSong({
                  variables: { songId: song.id, data: { key: value } },
                })
              }
              tabbable
              element="div"
            />
          </div>
          <div data-name="FEEL">
            <Label>Feel</Label>
            <EditableText
              className="text-lg italic"
              value={song.feel || ""}
              setValue={(value) =>
                updateSong({
                  variables: { songId: song.id, data: { feel: value } },
                })
              }
              tabbable
              element="div"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
