import { AdminContainer } from "@/components/AdminContainer";
import { useAdminGetEngagementQuery } from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { ReactNode } from "react";

export function AdminEngagement() {
  const { slug, engagementId } = useParamsSafe("slug", "engagementId");
  const { loading, error, data } = useAdminGetEngagementQuery({
    variables: {
      engagementId: Number(engagementId),
    },
  });

  let content: ReactNode = "";

  if (loading) {
    content = <p className="text-muted">Loading...</p>;
  } else if (error) {
    content = <p className="text-red-500">Error: {error.message}</p>;
  } else if (data?.engagement) {
    const engagement = data.engagement;
    content = (
      <div className="flex flex-col space-y-8">
        <h1 className="flex items-baseline space-x-5 text-3xl">
          <span>{engagement.title}</span>{" "}
        </h1>
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
