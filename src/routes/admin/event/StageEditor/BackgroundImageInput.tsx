import { InlineConfirmCancel } from "@/components/InlineConfirmCancel";
import { ImageInput } from "@/components/ui/image-input";
import { Label } from "@/components/ui/label";
import { useAdminUploadFile } from "@/hooks/useAdminUploadFile";
import { ImageIcon } from "@radix-ui/react-icons";
import { ReactNode, useCallback, useState } from "react";

export function BackgroundImageInput({
  imageUrl,
  onPreview,
  onSave,
  label = "Background image",
}: {
  imageUrl: string | null | undefined;
  onPreview: (imageUri: string | null) => void;
  onSave: (imageUri: string) => void;
  label?: ReactNode;
}) {
  const [adminUploadFile, { loading: adminUploadFileLoading }] =
    useAdminUploadFile();

  const [imageFile, _setImageFile] = useState<File | null>(null);

  const setImageFile = useCallback(
    (file: File | null) => {
      _setImageFile(file);
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageSrc = e.target?.result;
          onPreview(typeof imageSrc === "string" ? imageSrc : null);
        };
        reader.readAsDataURL(file);
      } else {
        onPreview(null);
      }
    },
    [onPreview]
  );

  const uploadAndSave = useCallback(() => {
    if (!imageFile) return;
    adminUploadFile(imageFile).then((url) => {
      onSave(url);
      setImageFile(null);
    });
  }, [adminUploadFile, imageFile, onSave, setImageFile]);

  const cancel = useCallback(() => {
    setImageFile(null);
  }, [setImageFile]);

  return (
    <div data-name="BACKGROUND_IMAGE_INPUT" className="relative">
      <Label>{label}</Label>
      <div className="flex items-center justify-between gap-2">
        <ImageIcon className="h-4 w-4" />
        <ImageInput
          className="flex-1"
          noPreview
          currentImageUrl={imageUrl}
          value={imageFile}
          onChange={setImageFile}
          name="backgroundImageFile"
        />
      </div>
      {imageFile && (
        <InlineConfirmCancel
          loading={adminUploadFileLoading}
          confirm={uploadAndSave}
          cancel={cancel}
        />
      )}
    </div>
  );
}
