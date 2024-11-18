import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AdminContainer } from "@/components/AdminContainer";
import { EditableText } from "@/components/EditableText";
import { CrumbMeta, SimpleCrumbs } from "@/components/SimpleCrumbs";
import { SubmissionsList } from "@/components/SubmissionsList";
import {
  useAdminGetEngagementQuery,
  useAdminGetEventQuery,
} from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { ReactNode } from "react";
import { EditableJson } from "@/components/EditableJson";
import { useUpdateFns } from "./useUpdateFns";
import { Badge } from "@/components/ui/badge";
import { EditableTextarea } from "@/components/EditableTextarea";
import { isMobile } from "react-device-detect";
import { engagementDefinitions } from "@/engagements";

export function AdminEngagementPage() {
  const { slug, engagementId } = useParamsSafe("slug", "engagementId");

  // Get the engagement
  const { loading, error, data } = useAdminGetEngagementQuery({
    variables: {
      engagementId: Number(engagementId),
    },
  });

  // Get the engagement definition
  const engagementDef = data?.engagement?.type
    ? engagementDefinitions[data?.engagement?.type]
    : null;

  // Get the event
  const {
    loading: eventLoading,
    error: eventError,
    data: eventData,
  } = useAdminGetEventQuery({
    variables: {
      slug,
    },
  });

  const {
    updateEngagementTitle,
    updateEngagementDescription,
    updateEngagementConfig,
    updateEngagementData,
    updateEngagementQrCodeCta,
  } = useUpdateFns({ data });

  let content: ReactNode = "";

  if (loading || eventLoading) {
    content = <p className="text-muted">Loading...</p>;
  } else if (error || eventError) {
    content = (
      <p className="text-red-500">Error: {(error || eventError)!.message}</p>
    );
  } else if (data?.engagement && eventData?.event) {
    const event = eventData?.event;
    const engagement = data.engagement;
    const crumbs: CrumbMeta[] = [
      ["/admin/events", "Events"],
      [`/admin/events/${slug}`, event.name],
    ];
    content = (
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <SimpleCrumbs crumbs={crumbs} />
          {/* TITLE */}
          <EditableText
            value={engagement.title}
            setValue={updateEngagementTitle}
            element="h1"
            className="flex items-baseline space-x-5 text-3xl"
          />
          <div>
            <Badge>{engagement.type}</Badge>
          </div>
        </div>
        {/* DESCRIPTION */}
        <div className="flex flex-col space-y-1">
          <EditableTextarea
            value={engagement.description || "(no description)"}
            setValue={updateEngagementDescription}
            element="p"
            className="text-foreground"
          />
          <div className="text-xs text-muted">
            Shown as instructions to fans on mobile.
          </div>
        </div>
        {/* QR CODE CTA */}
        <div className="flex flex-col space-y-1">
          <EditableTextarea
            value={engagement.qrCodeCta || "(no cta)"}
            setValue={updateEngagementQrCodeCta}
            element="p"
            className="text-foreground"
          />
          <div className="text-xs text-muted">Displayed above QR code.</div>
        </div>
        {/* CONFIG/DATA */}
        {!isMobile && (
          <div className="flex flex-col space-y-3">
            <Tabs defaultValue="config" className="w-full">
              <TabsList>
                <TabsTrigger value="config">Config</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
              </TabsList>
              <TabsContent value="config">
                <div className="rounded-lg bg-muted p-1">
                  <EditableJson
                    value={engagement.config}
                    setValue={updateEngagementConfig}
                  />
                </div>
              </TabsContent>
              <TabsContent value="data">
                <div className="rounded-lg bg-muted p-1">
                  <EditableJson
                    value={engagement.data}
                    setValue={updateEngagementData}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
        {/* SUBMISSIONS */}
        {engagementDef?.submissionsTable ? (
          <engagementDef.submissionsTable engagement={engagement} />
        ) : (
          <SubmissionsList engagement={engagement} />
        )}
      </div>
    );
  }

  return <AdminContainer section="events">{content}</AdminContainer>;
}
