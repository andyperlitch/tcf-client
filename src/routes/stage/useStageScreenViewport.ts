import { useEffect } from "react";

/**
 * Sets the <meta name="viewport"> tag to 1080px width, and scales the page to fit the viewport
 */
export function useStageScreenViewport() {
  useEffect(() => {
    const previousViewport = document
      .querySelector("meta[name='viewport']")
      ?.getAttribute("content");
    document
      .querySelector("meta[name='viewport']")
      ?.setAttribute("content", "width=1080, height=720 initial-scale=1");

    return () => {
      document
        .querySelector("meta[name='viewport']")
        ?.setAttribute("content", previousViewport ?? "");
    };
  }, []);
}
