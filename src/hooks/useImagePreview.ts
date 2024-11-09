import { useState, ChangeEvent, useCallback } from "react";

interface UseImagePreviewOptions {
  onImageChange?: (file: File | null) => void;
}

interface UseImagePreviewReturn {
  /**
   * The src of the image preview.
   */
  previewSrc: string | null;
  /**
   * Attach this to the input element's onChange event.
   */
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * The file that was selected.
   */
  file: File | undefined;
  /**
   * The mime type of the file.
   */
  mimeType: string;
  /**
   * Set the preview src.
   */
  setPreviewSrc: (src: string | null) => void;
  /**
   * Set the file.
   */
  setFile: (file: File | undefined) => void;
}

export function useImageInput({
  onImageChange,
}: UseImagePreviewOptions = {}): UseImagePreviewReturn {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  const [mimeType, setMimeType] = useState("");

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const eventFile = event.target.files?.[0];
      setFile(eventFile);
      setMimeType(eventFile?.type || "");
      onImageChange?.(eventFile || null);
      if (eventFile && eventFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageSrc = e.target?.result;
          setPreviewSrc(typeof imageSrc === "string" ? imageSrc : null);
        };
        reader.readAsDataURL(eventFile);
      }
    },
    [onImageChange]
  );

  return {
    previewSrc,
    handleFileChange,
    file,
    mimeType,
    setPreviewSrc,
    setFile: useCallback(
      (file: File | undefined) => {
        setFile(file);
        setMimeType(file?.type || "");
        onImageChange?.(file || null);
      },
      [onImageChange]
    ),
  };
}
