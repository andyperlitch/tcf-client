import { useState, ChangeEvent } from "react";

interface UseImagePreviewOptions {
  onImageChange?: (imageSrc: string | ArrayBuffer | null) => void;
}

interface UseImagePreviewReturn {
  previewSrc: string | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function useImagePreview({
  onImageChange,
}: UseImagePreviewOptions = {}): UseImagePreviewReturn {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target?.result;
        setPreviewSrc(typeof imageSrc === "string" ? imageSrc : null);
        if (onImageChange && imageSrc) {
          onImageChange(imageSrc);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return { previewSrc, handleFileChange };
}
