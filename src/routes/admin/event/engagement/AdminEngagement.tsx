import { AdminContainer } from "@/components/AdminContainer";
import { CrumbMeta, SimpleCrumbs } from "@/components/SimpleCrumbs";
import {
  useAdminGetEngagementQuery,
  useAdminGetEventQuery,
} from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { ReactNode } from "react";

export function AdminEngagement() {
  const { slug, engagementId } = useParamsSafe("slug", "engagementId");
  const { loading, error, data } = useAdminGetEngagementQuery({
    variables: {
      engagementId: Number(engagementId),
    },
  });
  const {
    loading: eventLoading,
    error: eventError,
    data: eventData,
  } = useAdminGetEventQuery({
    variables: {
      slug,
    },
  });

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
          <h1 className="flex items-baseline space-x-5 text-3xl">
            <span>{engagement.title}</span>{" "}
          </h1>
        </div>
        <p className="text-foreground">{engagement.description}</p>
        <div className="flex flex-col space-y-3"></div>

        <h2 className="mt-10 flex items-baseline space-x-5 text-2xl">
          <span>Submissions</span>{" "}
        </h2>
      </div>
    );
  }

  return <AdminContainer section="events">{content}</AdminContainer>;
}
