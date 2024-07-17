import { useLeadSheetHtml } from "../../hooks/useLeadSheetHtml";

export function InlineLeadSheet({
  leadsheetUrl,
}: {
  leadsheetUrl: string | undefined;
}) {
  const { html, loading } = useLeadSheetHtml({
    url: leadsheetUrl,
  });

  if (!leadsheetUrl) {
    return <p>No leadsheet available</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="leadSheet"
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
}
