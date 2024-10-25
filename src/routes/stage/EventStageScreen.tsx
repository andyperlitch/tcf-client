import { CodeBlock } from "@/components/CodeBlock";
import {
  useGetEventQuery,
  useOnActiveEngagementChangedSubscription,
} from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";

export function EventStageScreen() {
  const { slug } = useParamsSafe("slug");
  const { data } = useGetEventQuery({
    variables: {
      slug,
    },
  });

  const { data: engagementData } = useOnActiveEngagementChangedSubscription({
    variables: { eventSlug: slug },
  });

  return (
    <div className="flex flex-col gap-4">
      <h2>Event</h2>
      <CodeBlock json={data} />
      <h2>Engagement</h2>
      <CodeBlock json={engagementData} />
    </div>
  );
}
