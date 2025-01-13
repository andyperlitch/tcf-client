import { useEffect } from "react";

function encodeFontFamily(font: string) {
  return encodeURIComponent(font)
    .replace(/%20/g, "+") // Replace URL-encoded spaces with plus signs
    .replace(/%2B/g, "+"); // Replace URL-encoded plus signs with plus signs
}

/**
 * Takes an array of google font family names, and loads them by injecting them into the document head.
 * Also returns a function to remove the fonts from the document head.
 * Loads both regular and italic styles for each weight.
 */
export function useGoogleFonts({
  fontFamily,
}: {
  fontFamily?: string[] | null;
}) {
  useEffect(() => {
    if (!fontFamily) return;

    const fontLinks = fontFamily.map((font) => {
      return `https://fonts.googleapis.com/css2?family=${encodeFontFamily(
        font
      )}&display=swap`;
    });

    fontLinks.forEach((link) => {
      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.href = link;
      document.head.appendChild(linkElement);
    });

    return () => {
      fontLinks.forEach((link) => {
        const linkElement = document.querySelector(`link[href="${link}"]`);
        if (linkElement) {
          document.head.removeChild(linkElement);
        }
      });
    };
  }, [fontFamily]);
}
