import { useLyricsHtml } from "../../hooks/useLyricsHtml";

export interface LyricsProps {
  lyricsUrl: string | undefined;
}

export function Lyrics({ lyricsUrl }: LyricsProps) {
  const { html, loading } = useLyricsHtml({ url: lyricsUrl });

  if (!lyricsUrl) {
    return <p>No lyrics available</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="lyrics" dangerouslySetInnerHTML={{ __html: html || "" }} />
  );
}
