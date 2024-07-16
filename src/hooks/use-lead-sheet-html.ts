import { useEffect, useState } from "react";

const TABLE_ONLY = true;

export function useLeadSheetHtml({ url }: { url: string | undefined }) {
  const [html, setHtml] = useState<string | null>(null);

  // load the html of the lead sheet
  useEffect(() => {
    setHtml("");
    if (!url) {
      return;
    }

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
        // const styles = doc.querySelectorAll("style");
        // styles.forEach((style) => style.remove());

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

        // remove height, width, and style attributes from images
        const images = doc.querySelectorAll("img");
        images.forEach((img) => {
          // img.removeAttribute("height");
          // img.removeAttribute("width");
          img.removeAttribute("style");
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
      });

    return () => {
      abortController.abort();
    };
  }, [url]);

  return html;
}
