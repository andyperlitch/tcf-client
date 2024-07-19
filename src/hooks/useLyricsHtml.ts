import { useEffect, useState } from "react";

interface Props {
  url: string | undefined;
}

export function useLyricsHtml({ url }: Props) {
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // load the html of the lyrics doc
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
        throw new Error("Could not fetch lyrics");
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

        // Extract the content of the body tag
        const content =
          doc.getElementsByClassName("doc-content")[0]?.innerHTML ||
          doc.body.innerHTML;

        setHtml(content);
      })
      .catch((e) => {
        if (abortController.signal.aborted) {
          return;
        }
        console.log(`Failed fetching lyrics. Error: ${e.message}`);
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
