import { useEffect, useState } from "react";

export function useImageLoader({
  url,
  onLoad,
}: {
  url: string | undefined | null;
  onLoad?: () => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!imageLoaded && url) {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setImageLoaded(true);
        onLoad?.();
      };
    }
  }, [url, imageLoaded, onLoad]);

  return { imageLoaded, url };
}
