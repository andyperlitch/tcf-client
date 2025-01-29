import {
  LeadSheetDetailFragment,
  useAdminCreatePresignedUrlMutation,
  useAdminDeleteFromS3Mutation,
} from "@/gql/graphql";
import { RemoveDetailButton } from "./RemoveDetailButton";
import { useCallback, useMemo, useState } from "react";
import { useLeadSheetSection } from "./LeadSheetSectionProvider/context";
import { updateDetail } from "./LeadSheetSectionProvider/reducer";
import { ImageInput } from "@/components/ui/image-input";
import { uploadFile } from "@/utils/uploadFile";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface ParsedImageDetail {
  url: string;
  width?: number;
  height?: number;
  constraintDimension: "width" | "height";
}

const DEFAULT_IMAGE_DETAIL: ParsedImageDetail = {
  url: "",
  constraintDimension: "width",
};

const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 50;
export function ImageSectionEditor({
  detail,
}: {
  detail: LeadSheetDetailFragment;
}) {
  const [value, setValue] = useImageDetail(detail);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [progress, onProgress] = useState<number | null>(null);
  const { toast } = useToast();
  const [createPresignedUrl] = useAdminCreatePresignedUrlMutation();

  /**
   * Uploads the image to S3 and updates the detail with the new image key.
   */
  const handleImageChange = useCallback(
    (file: File | null) => {
      setSelectedImage(file);

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
            setValue({
              url: key,
              width: DEFAULT_WIDTH,
              constraintDimension: "width",
            });
            setSelectedImage(null);
            onProgress(null);
          })
          .catch((error) => {
            toast({
              title: "Image failed to upload",
              description: error.message,
              variant: "destructive",
            });
            setSelectedImage(null);
          });
      }
    },
    [createPresignedUrl, setValue, toast]
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

  const handleClearImage = useCallback(() => {
    setValue(DEFAULT_IMAGE_DETAIL);
    setSelectedImage(null);
    if (value.url) {
      deleteFromS3({
        variables: {
          key: value.url,
        },
      });
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
              ? value.width || DEFAULT_WIDTH
              : undefined
          }
          height={
            value.constraintDimension === "height"
              ? value.height || DEFAULT_HEIGHT
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

function useImageDetail(detail: LeadSheetDetailFragment) {
  const { dispatch } = useLeadSheetSection();
  return useMemo(() => {
    const serialized =
      detail.content.trim() || JSON.stringify(DEFAULT_IMAGE_DETAIL);
    const value = parseAndValidateContent(serialized) as ParsedImageDetail;

    return [
      value,
      (
        newValue:
          | ParsedImageDetail
          | ((oldValue: ParsedImageDetail) => ParsedImageDetail)
      ) => {
        const serialized = JSON.stringify(
          typeof newValue === "function" ? newValue(value) : newValue
        );
        dispatch(
          updateDetail({
            id: detail.id,
            content: serialized,
          })
        );
      },
    ] as const;
  }, [detail.content, detail.id, dispatch]);
}

function parseAndValidateContent(content: string): ParsedImageDetail {
  const parsed = JSON.parse(content) as ParsedImageDetail;
  if (!parsed.url) {
    parsed.url = "";
  }
  if (parsed.width && typeof parsed.width !== "number") {
    delete parsed.width;
  }
  if (parsed.height && typeof parsed.height !== "number") {
    delete parsed.height;
  }
  return parsed;
}
