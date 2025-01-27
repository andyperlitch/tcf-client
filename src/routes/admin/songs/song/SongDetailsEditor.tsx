import { InlineConfirmCancel } from "@/components/InlineConfirmCancel";
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
      <div>
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
  );
}
