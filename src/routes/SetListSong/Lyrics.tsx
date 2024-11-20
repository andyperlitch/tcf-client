import { CenteredMessage } from "../../CenteredMessage";
import { useLyricsHtml } from "../../hooks/useLyricsHtml";
import styles from "./Lyrics.module.css";
import { Button } from "@/components/ui/button";
import useLocalStorage from "use-local-storage";

export interface LyricsProps {
  lyricsUrl: string | undefined;
}

const FONT_SIZES = [
  ["XS", 75],
  ["S", 100],
  ["M", 133],
  ["L", 166],
  ["XL", 200],
] as const;

export function Lyrics({ lyricsUrl }: LyricsProps) {
  const { html, loading } = useLyricsHtml({ url: lyricsUrl });
  const [fontSize, setFontSize] = useLocalStorage("lyricsFontSize", 100);

  if (!lyricsUrl) {
    return <CenteredMessage>No lyrics available</CenteredMessage>;
  }

  if (loading) {
    return <CenteredMessage>Loading...</CenteredMessage>;
  }

  return (
    <div data-name="LYRICS" className="flex flex-col items-center">
      <div
        data-name="FONT_SIZE_SELECTOR"
        className={`my-2 flex items-center gap-2`}
      >
        <span className="text-muted-foreground">Font Size:</span>
        {FONT_SIZES.map(([label, size]) => (
          <Button
            variant={fontSize === size ? "default" : "outline"}
            key={label}
            onClick={() => setFontSize(size)}
          >
            {label}
          </Button>
        ))}
      </div>
      <div
        style={{ fontSize: `${fontSize}%` }}
        className={styles.lyrics}
        dangerouslySetInnerHTML={{ __html: html || "" }}
      />
    </div>
  );
}
