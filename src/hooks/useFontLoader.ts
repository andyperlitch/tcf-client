import FontFaceObserver from "fontfaceobserver";
import { useEffect, useState } from "react";

export function useFontLoader({ fonts }: { fonts: string[] }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    Promise.all(
      fonts.map((font) => {
        const fontFace = new FontFaceObserver(font);
        return fontFace.load();
      })
    ).finally(() => setIsLoaded(true));
  }, [fonts]);

  return isLoaded;
}
