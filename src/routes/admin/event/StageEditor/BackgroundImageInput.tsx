import { InlineConfirmCancel } from "@/components/InlineConfirmCancel";
import { ImageInput } from "@/components/ui/image-input";
import { Label } from "@/components/ui/label";
import { useAdminUploadFile } from "@/hooks/useAdminUploadFile";
import { ImageIcon } from "@radix-ui/react-icons";
import { useCallback, useState } from "react";

export function BackgroundImageInput({
  imageUrl,
  onPreview,
  onSave,
}: {
  imageUrl: string | null | undefined;
  onPreview: (imageUri: string | null) => void;
  onSave: (imageUri: string) => void;
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

  return (
    <div data-name="BACKGROUND_IMAGE_INPUT" className="relative">
      <Label>Background image</Label>
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
          confirm={() => {
            adminUploadFile(imageFile).then((url) => {
              onSave(url);
              setImageFile(null);
            });
          }}
          cancel={() => {
            setImageFile(null);
          }}
        />
      )}
    </div>
  );
}
/*
  return <FormField
            control={form.control}
            name="backgroundImageFile"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel htmlFor={field.name}>Background Image</FormLabel>
                <FormControl>
                  <ImageInput
                    {...field}
                    noPreview
                    currentImageUrl={event.stageConfig?.backgroundImage}
                    onCurrentImageClear={() => {
                      form.setValue("backgroundImage", null);
                    }}
                    width={200}
                    height={200}
                  />
                </FormControl>
                <FormMessage />
                {backgroundImageFile && (
                  <InlineConfirmCancel
                    loading={adminUploadFileLoading}
                    confirm={() => {
                      adminUploadFile(backgroundImageFile)
                        .then((key) => {
                          return updateEventStageConfig({
                            variables: {
                              id: event.id,
                              data: {
                                backgroundImage: key,
                              },
                            },
                          });
                        })
                        .then((result) => {
                          if (result?.errors) {
                            logger.error(result.errors);
                            form.setError("backgroundImageFile", {
                              message: "Failed to upload image",
                            });
                          } else {
                            logger.log("Clearing stageBackgroundImageFile");
                            form.resetField("backgroundImageFile");
                            form.setValue(
                              "backgroundImage",
                              result?.data?.updateEventStageConfig
                                .backgroundImage,
                              {
                                shouldDirty: true,
                              }
                            );
                          }
                        });
                    }}
                    cancel={() => {
                      form.setValue("backgroundImageFile", null, {
                        shouldDirty: true,
                      });
                    }}
                  />
                )}
              </FormItem>
            )}
          />;
}

*/
