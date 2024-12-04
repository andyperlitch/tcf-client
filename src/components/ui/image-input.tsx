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
    const style = useMemo(
      () => ({
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }),
      [width, height]
    );

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

    return (
      <div data-name="IMAGE-SELECTOR" style={style} className="relative">
        {/* The preview image */}
        {previewSrc ? (
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
        ) : (
          <div
            style={style}
            className={`
              flex items-center justify-center rounded-md border-4 border-dashed
            `}
            onClick={() => inputRef.current?.click()}
          >
            <p className="text-center text-sm text-muted-foreground">
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
