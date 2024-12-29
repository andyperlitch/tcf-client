import { toFullS3Url } from "@/utils/toFullS3Url";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "./button";
import { TrashIcon } from "@radix-ui/react-icons";

function makeDisplayUrl(url: string | null | undefined) {
  if (!url) {
    return "(no image)";
  }
  const fileName = url.split("/").pop() || "";

  // only take the last 20 characters at most
  const truncatedFileName =
    fileName.length > 20 ? "..." + fileName.slice(-20) : fileName;

  return truncatedFileName;
}

export const ImageInput = forwardRef<
  { click: () => void },
  {
    width?: number;
    height?: number;
    value: File | string | null | undefined;
    onChange: (file: File | null) => void;
    /**
     * If the image is already uploaded, this will be the URL of the image.
     */
    currentImageUrl?: string | null | undefined;
    /**
     * Callback for when the user clears the previously-uploaded image.
     * Typically, you'll be setting a different field (the one which holds
     * the URL of the image) to null in this case.
     */
    onCurrentImageClear?: () => void;
    name: string;
    noPreview?: boolean;
    className?: string;
  }
>(
  (
    {
      width,
      height,
      value,
      onChange,
      currentImageUrl,
      onCurrentImageClear,
      name,
      noPreview,
      className,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      click: () => inputRef.current?.click(),
    }));

    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const handleFileChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.files?.[0] ?? null);
      },
      [onChange]
    );

    // Dimensional styles
    const style = useMemo(() => {
      if (noPreview) {
        return undefined;
      }
      return {
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      };
    }, [width, height, noPreview]);

    /**
     * Updates the preview image source based on the current value
     * and the currentImageUrl. If the value is a File, it's a new image
     * that's being uploaded and we render a preview of that image. If
     * the value is null, we check if there's a currentImageUrl and render
     * that image. If there's neither, we render a "no image selected" message.
     */
    useEffect(() => {
      if (value && value instanceof File && value.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewSrc(e.target?.result as string);
        };
        reader.readAsDataURL(value);
      } else if (currentImageUrl) {
        const fullUrl = toFullS3Url(currentImageUrl);
        setPreviewSrc(fullUrl);
      } else {
        setPreviewSrc(null);
      }
    }, [currentImageUrl, value]);

    useEffect(() => {
      if (value === null && inputRef.current) {
        inputRef.current.value = "";
      }
    }, [value]);

    return (
      <div
        data-name="IMAGE-SELECTOR"
        style={style}
        className={`
          relative cursor-pointer

          ${className}
        `}
      >
        {/* The preview image */}
        {!noPreview && previewSrc && (
          <>
            <img
              src={previewSrc}
              alt="Album Art"
              style={style}
              className={`rounded border border-input`}
            />
            <Button
              variant="default"
              size="icon"
              onClick={() => {
                onChange(null);
                if (!value && onCurrentImageClear) {
                  onCurrentImageClear();
                }
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
              className={`
                absolute right-2 top-2 opacity-50

                hover:opacity-100
              `}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </>
        )}
        {noPreview && (value || currentImageUrl) && (
          <div
            className="rounded-sm border border-input p-2"
            onClick={() => inputRef.current?.click()}
          >
            {value instanceof File
              ? value.name
              : makeDisplayUrl(currentImageUrl)}
          </div>
        )}
        {!previewSrc && (
          <div
            style={style}
            className={`
              flex items-center

              ${
                noPreview
                  ? `inline-block rounded-sm border border-input p-2`
                  : `justify-center rounded-md border-4 border-dashed`
              }
            `}
            onClick={() => inputRef.current?.click()}
          >
            <p
              className={`
                ${noPreview ? "" : "text-center"}

                text-sm text-muted-foreground
              `}
            >
              No image selected
            </p>
          </div>
        )}
        <input
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
          type="file"
          name={name}
        />
      </div>
    );
  }
);
