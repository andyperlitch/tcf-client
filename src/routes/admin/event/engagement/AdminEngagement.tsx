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

export function AdminEngagement() {
  const { slug, engagementId } = useParamsSafe("slug", "engagementId");

  // Get the engagement
  const { loading, error, data } = useAdminGetEngagementQuery({
    variables: {
      engagementId: Number(engagementId),
    },
  });

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
            elementProps={{
              className: "flex items-baseline space-x-5 text-3xl",
            }}
          />
          <div>
            <Badge>{engagement.type}</Badge>
          </div>
        </div>
        {/* DESCRIPTION */}
        <EditableText
          value={engagement.description || "(no description)"}
          setValue={updateEngagementDescription}
          element="p"
          elementProps={{ className: "text-foreground" }}
        />
        {/* CONFIG/DATA */}
        <div className="flex flex-col space-y-3">
          <Tabs defaultValue="config" className="w-full">
            <TabsList>
              <TabsTrigger value="config">Config</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
            </TabsList>
            <TabsContent value="config">
              <EditableJson
                value={engagement.config}
                setValue={updateEngagementConfig}
              />
            </TabsContent>
            <TabsContent value="data">
              <EditableJson
                value={engagement.data}
                setValue={updateEngagementData}
              />
            </TabsContent>
          </Tabs>
        </div>
        {/* SUBMISSIONS */}
        <SubmissionsList
          engagementId={engagement.id}
          engagementType={engagement.type}
        />
      </div>
    );
  }

  return <AdminContainer section="events">{content}</AdminContainer>;
}
