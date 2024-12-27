import { AdminContainer } from "@/components/AdminContainer";
import { CrumbMeta, SimpleCrumbs } from "@/components/SimpleCrumbs";
import { engagementDefinitions } from "@/engagements";
import {
  useAdminGetEventQuery,
  useAdminGetEngagementQuery,
  useAdminGetSubmissionQuery,
} from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";

export function AdminSubmissionPage() {
  const { slug, engagementId, submissionId } = useParamsSafe(
    "slug",
    "engagementId",
    "submissionId"
  );

  const { data: eventData } = useAdminGetEventQuery({
    variables: {
      slug,
    },
  });

  const { data: engagementData } = useAdminGetEngagementQuery({
    variables: {
      engagementId: Number(engagementId),
    },
  });

  const EngagementDefinition = engagementData?.engagement?.type
    ? engagementDefinitions[engagementData.engagement.type]
    : null;

  const { data: submissionData } = useAdminGetSubmissionQuery({
    variables: {
      submissionId: Number(submissionId),
    },
  });

  const crumbs: CrumbMeta[] =
    eventData?.event?.name && engagementData?.engagement?.title
      ? [
          ["/admin/events", "Events"],
          [`/admin/events/${slug}`, eventData.event.name],
          [
            `/admin/events/${slug}/engagements/${engagementId}`,
            engagementData.engagement.title,
          ],
        ]
      : [];

  return (
    <AdminContainer section="events">
      <div className="flex flex-col space-y-4">
        <SimpleCrumbs crumbs={crumbs} />
        {EngagementDefinition?.adminSubmissionPage &&
        submissionData?.submission ? (
          <EngagementDefinition.adminSubmissionPage
            submission={submissionData?.submission}
          />
        ) : (
          <h2 className="text-3xl">Submission ID: {submissionId}</h2>
        )}
      </div>
    </AdminContainer>
  );
}

export default AdminSubmissionPage;
