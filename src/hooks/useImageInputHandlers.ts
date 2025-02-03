import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  useAdminCreatePresignedUrlMutation,
  useAdminDeleteFromS3Mutation,
} from "@/gql/graphql";
import { uploadFile } from "@/utils/uploadFile";

export function useImageInputHandlers({
  image,
  setImage,
  onUploadComplete,
}: {
  image: File | null;
  setImage: (file: File | null) => void;
  onUploadComplete: (key: string) => void;
}) {
  const [progress, onProgress] = useState<number | null>(null);
  const { toast } = useToast();
  const [createPresignedUrl] = useAdminCreatePresignedUrlMutation();

  /**
   * Uploads the image to S3 and updates the detail with the new image key.
   */
  const handleImageChange = useCallback(
    (file: File | null) => {
      setImage(file);

      // perform upload and save on success
      if (file) {
        onProgress(0);
        createPresignedUrl({
          variables: {
            mimeType: file.type,
          },
        })
          .then(({ data }) => {
            const presignedUrl = data?.adminCreatePresignedUrl.url;
            const key = data?.adminCreatePresignedUrl.key;
            if (!presignedUrl || !key) {
              throw new Error("Failed to create presigned URL");
            }
            return uploadFile({ file, presignedUrl, onProgress }).then(() => ({
              key,
            }));
          })
          .then(({ key }) => {
            onUploadComplete(key);
            setImage(null);
            onProgress(null);
          })
          .catch((error) => {
            toast({
              title: "Image failed to upload",
              description: error.message,
              variant: "destructive",
            });
            setImage(null);
          });
      }
    },
    [createPresignedUrl, onUploadComplete, setImage, toast]
  );

  const handlePasteFromClipboard = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      try {
        const clipboardItems = await navigator.clipboard.read();
        for (const item of clipboardItems) {
          const imageType = item.types.find((type) =>
            type.startsWith("image/")
          );
          if (imageType) {
            const blob = await item.getType(imageType);
            const file = new File([blob], "pasted-image.png", {
              type: imageType,
            });
            handleImageChange(file);
            return;
          }
        }
        toast({
          title: "No image in clipboard",
          description: "Please copy an image first",
          variant: "destructive",
        });
      } catch (error) {
        toast({
          title: "Failed to paste image",
          description: "Please make sure you've allowed clipboard access",
          variant: "destructive",
        });
      }
    },
    [handleImageChange, toast]
  );

  const [deleteFromS3] = useAdminDeleteFromS3Mutation();

  const deleteKey = useCallback(
    (key: string) => {
      deleteFromS3({
        variables: {
          key,
        },
      });
    },
    [deleteFromS3]
  );

  return {
    handleImageChange,
    handlePasteFromClipboard,
    setImage,
    image,
    progress,
    deleteFromS3: deleteKey,
  };
}
