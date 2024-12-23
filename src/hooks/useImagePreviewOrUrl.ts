import { useState, useEffect } from "react";

export function useImagePreviewOrUrl({
  imageUrl,
  imageFile,
}: {
  imageUrl: string | null;
  imageFile: File | null;
}) {
  const [urlOrUri, setUrlOrUri] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile && imageFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        setUrlOrUri(reader.result as string);
      };
    } else {
      setUrlOrUri(imageUrl);
    }
  }, [imageFile, imageUrl]);

  return urlOrUri;
}
