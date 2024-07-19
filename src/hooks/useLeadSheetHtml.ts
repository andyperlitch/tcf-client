import { useEffect, useState } from "react";

const TABLE_ONLY = true;

export function useLeadSheetHtml({ url }: { url: string | undefined }) {
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // load the html of the lead sheet
  useEffect(() => {
    setHtml("");
    if (!url) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const abortController = new AbortController();
    fetch(url, {
      signal: abortController.signal,
    })
      .then((result) => {
        if (result.status === 200) {
          return result.text();
        }
        throw new Error("Could not fetch lead sheet");
      })
      .then((html) => {
        // parse has html
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // delete scripts and styles
        const scripts = doc.querySelectorAll("script");
        scripts.forEach((script) => script.remove());

        // delete banners
        doc.getElementById("banners")?.remove();

        // delete title
        doc.getElementsByTagName("h1")[0]?.remove();

        // add a class to the table
        const table = doc.querySelector("table");
        table?.classList.add("leadSheetTable");

        // add class to all p tags in the first column of the table whose text content starts with a quote '"'
        const pTags = doc.querySelectorAll("table tr td:first-child p");
        pTags.forEach((p) => {
          if (
            p.textContent?.startsWith('"') ||
            p.textContent?.startsWith("“")
          ) {
            p.classList.add("lyric");
          }
        });

        // add "sectionTitle" class to every h3 inside of the first column
        const h3s = doc.querySelectorAll("table tr td:first-child h3");
        h3s.forEach((h3) => {
          h3.classList.add("sectionTitle");
        });

        // add "recordingTimestamp" class to every 2nd span inside of an h3 in the first column
        const h3Spans = doc.querySelectorAll(
          "table tr td:first-child h3 span:nth-child(2)"
        );
        h3Spans.forEach((span) => {
          span.classList.add("recordingTimestamp");
        });

        // "unwrap" all img tags from their parent span tags
        const imagesInSpans = doc.querySelectorAll("span > img");
        imagesInSpans.forEach((img) => {
          const parent = img.parentElement;
          parent?.replaceWith(img);
        });

        // for all images in a p tag text around it, add the inlineImage class
        const imagesInPs = doc.querySelectorAll("p img");
        imagesInPs.forEach((img) => {
          const parent = img.parentElement;
          const textContent = (parent?.textContent || "").trim();
          if (textContent) {
            img.classList.add("inlineImage");
          }
        });

        // remove height, width, and style attributes from images
        const images = doc.querySelectorAll("img");
        images.forEach((img) => {
          // img.removeAttribute("height");
          // img.removeAttribute("width");
          img.removeAttribute("style");
        });

        // add the "chords" class too all p tags in the 3rd column which begin with the character "|"
        const chords = doc.querySelectorAll("table tr td:nth-child(3) p");
        chords.forEach((chord) => {
          if (chord.textContent?.startsWith("|")) {
            chord.classList.add("chords");
          }
        });

        // Extract the content of the body tag
        const content =
          doc.getElementsByClassName("doc-content")[0]?.innerHTML ||
          doc.body.innerHTML;

        if (TABLE_ONLY) {
          setHtml(table?.outerHTML || content);
        } else {
          setHtml(content);
        }
      })
      .catch((e) => {
        if (abortController.signal.aborted) {
          return;
        }
        console.log(`Failed fetching lead sheet. Error: ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { html, loading };
}
