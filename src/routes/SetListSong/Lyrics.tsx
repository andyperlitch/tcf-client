import { CenteredMessage } from "../../CenteredMessage";
import { useLyricsHtml } from "../../hooks/useLyricsHtml";

export interface LyricsProps {
  lyricsUrl: string | undefined;
}

export function Lyrics({ lyricsUrl }: LyricsProps) {
  const { html, loading } = useLyricsHtml({ url: lyricsUrl });

  if (!lyricsUrl) {
    return <CenteredMessage>No lyrics available</CenteredMessage>;
  }

  if (loading) {
    return <CenteredMessage>Loading...</CenteredMessage>;
  }

  return (
    <div className="lyrics" dangerouslySetInnerHTML={{ __html: html || "" }} />
  );
}
