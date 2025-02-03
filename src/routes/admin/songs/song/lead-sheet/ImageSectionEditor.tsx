import { LeadSheetDetailFragment } from "@/gql/graphql";
import { RemoveDetailButton } from "./RemoveDetailButton";
import { useCallback, useState } from "react";
import { ImageInput } from "@/components/ui/image-input";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_IMAGE_DETAIL,
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_WIDTH,
} from "./consts";
import { useImageDetail } from "./useImageDetail";
import { useImageInputHandlers } from "@/hooks/useImageInputHandlers";

export function ImageSectionEditor({
  detail,
}: {
  detail: LeadSheetDetailFragment;
}) {
  const [value, setValue] = useImageDetail(detail);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onUploadComplete = useCallback(
    (key: string) => {
      setValue({
        url: key,
        width: DEFAULT_IMAGE_WIDTH,
        constraintDimension: "width",
      });
    },
    [setValue]
  );

  const {
    progress,
    handleImageChange,
    handlePasteFromClipboard,
    deleteFromS3,
  } = useImageInputHandlers({
    onUploadComplete,
    image: selectedImage,
    setImage: setSelectedImage,
  });

  const handleClearImage = useCallback(() => {
    setValue(DEFAULT_IMAGE_DETAIL);
    setSelectedImage(null);
    if (value.url) {
      deleteFromS3(value.url);
    }
  }, [setValue, value.url, deleteFromS3]);

  return (
    <div data-name="IMAGE_SECTION_EDITOR" className="flex gap-2">
      <RemoveDetailButton id={detail.id} />
      <div className={`flex w-full flex-col gap-2`}>
        <ImageInput
          name="image"
          emptyMessage={
            <div className="flex flex-col gap-2 p-2">
              <span>Click to select an image or</span>
              <Button size="sm" onClick={handlePasteFromClipboard}>
                Paste from clipboard
              </Button>
            </div>
          }
          width={
            value.constraintDimension === "width"
              ? value.width || DEFAULT_IMAGE_WIDTH
              : undefined
          }
          height={
            value.constraintDimension === "height"
              ? value.height || DEFAULT_IMAGE_HEIGHT
              : undefined
          }
          value={selectedImage}
          onChange={handleImageChange}
          currentImageUrl={value.url}
          onCurrentImageClear={handleClearImage}
        />
        {progress !== null && <Progress value={progress} />}
        {/* <div className="flex items-center gap-2">
          <Label className="whitespace-nowrap">constrain by:</Label>
          <ToggleGroup
            type="single"
            value={value.constraintDimension}
            onValueChange={(value: "width" | "height") => {
              setValue((oldValue) => ({
                ...oldValue,
                constraintDimension: value,
              }));
            }}
          >
            <ToggleGroupItem value="width">width</ToggleGroupItem>
            <ToggleGroupItem value="height">height</ToggleGroupItem>
          </ToggleGroup>
        </div> */}
      </div>
    </div>
  );
}
