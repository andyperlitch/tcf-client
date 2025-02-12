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
    if (url) {
      console.log("what");
      setImageLoaded(false);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        console.log(`andy img HAS loaded`);
        setImageLoaded(true);
        onLoad?.();
      };
    }
  }, [url, onLoad]);

  return { imageLoaded, url };
}
