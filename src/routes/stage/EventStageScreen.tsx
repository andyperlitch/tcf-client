import { CodeBlock } from "@/components/CodeBlock";
import {
  StageGetEventDocument,
  StageGetEventQuery,
  useOnActiveEngagementChangedSubscription,
  useStageGetEventQuery,
} from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";

export function EventStageScreen() {
  const { slug } = useParamsSafe("slug");
  const { data } = useStageGetEventQuery({
    variables: {
      slug,
    },
  });

  useOnActiveEngagementChangedSubscription({
    variables: { eventSlug: slug },
    onData: ({ client, data }) => {
      if (data?.data?.activeEngagementChanged) {
        // Update the Apollo cache with the new active engagement
        client.cache.updateQuery<StageGetEventQuery>(
          {
            query: StageGetEventDocument,
            variables: { slug },
          },
          (cachedData) => {
            if (!cachedData?.event) return cachedData;

            return {
              event: {
                ...cachedData.event,
                activeEngagement: data.data?.activeEngagementChanged,
              },
            };
          }
        );
      }
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <h2>Event</h2>
      <CodeBlock json={data} />
    </div>
  );
}
