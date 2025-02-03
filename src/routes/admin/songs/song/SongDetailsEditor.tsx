import { EditableText } from "@/components/EditableText";
import { InlineConfirmCancel } from "@/components/InlineConfirmCancel";
import { TempoSetter } from "@/components/TempoSetter";
import { ImageInput } from "@/components/ui/image-input";
import { Label } from "@/components/ui/label";
import {
  SongFragment,
  useAdminCreatePresignedUrlMutation,
  useBandUpdateSongMutation,
} from "@/gql/graphql";
import { uploadFile } from "@/utils/uploadFile";
import { useState } from "react";

export function SongDetailsEditor({
  song,
  className,
}: {
  song: SongFragment;
  className?: string;
}) {
  const [image, setImage] = useState<File | null>(null);
  const [createPresignedUrl] = useAdminCreatePresignedUrlMutation();
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
          <div className="relative">
            <ImageInput
              value={image}
              currentImageUrl={song.coverArtUrl}
              onChange={setImage}
              name="coverArtUrl"
              width={200}
              height={200}
              className="h-64 w-64"
            />
            {image && (
              <InlineConfirmCancel
                confirm={async () => {
                  const { data } = await createPresignedUrl({
                    variables: {
                      mimeType: image.type,
                    },
                  });
                  const { url, key } = data?.adminCreatePresignedUrl || {};
                  if (!url || !key) {
                    throw new Error("Failed to create presigned URL");
                  }
                  await uploadFile({
                    file: image,
                    presignedUrl: url,
                  });
                  await updateSong({
                    variables: {
                      songId: song.id,
                      data: {
                        coverArtUrl: key,
                      },
                    },
                  });
                }}
                cancel={() => {
                  setImage(null);
                }}
              />
            )}
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
