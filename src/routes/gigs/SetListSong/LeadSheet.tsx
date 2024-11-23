import { CenteredMessage } from "@/components/CenteredMessage";
import { useLeadSheetHtml } from "@/hooks/useLeadSheetHtml";
import "./LeadSheet.css";

export function LeadSheet({
  leadsheetUrl,
}: {
  leadsheetUrl: string | undefined;
}) {
  const { html, loading } = useLeadSheetHtml({
    url: leadsheetUrl,
  });

  if (!leadsheetUrl) {
    return <CenteredMessage>No leadsheet available</CenteredMessage>;
  }

  if (loading) {
    return <CenteredMessage>Loading...</CenteredMessage>;
  }

  return (
    <div
      className="leadSheet pb-32"
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
}
