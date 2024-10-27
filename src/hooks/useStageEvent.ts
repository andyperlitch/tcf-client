import {
  StageGetEventDocument,
  StageGetEventQuery,
  useOnActiveEngagementChangedSubscription,
  useStageGetEventQuery,
} from "@/gql/graphql";

export function useStageEvent(slug: string) {
  const { data, loading, error } = useStageGetEventQuery({
    variables: {
      slug,
    },
  });

  // this will update the cache with the new active engagement
  useOnActiveEngagementChangedSubscription({
    variables: { eventSlug: slug },
    onData: ({ client, data }) => {
      if (data?.data?.activeEngagementChanged !== undefined) {
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
                activeEngagement: data.data?.activeEngagementChanged || null,
              },
            };
          }
        );
      }
    },
  });

  return {
    data,
    loading,
    error,
  };
}
