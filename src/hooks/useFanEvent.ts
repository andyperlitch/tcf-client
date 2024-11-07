import {
  FanGetEventDocument,
  FanGetEventQuery,
  useFanGetEventQuery,
  useOnActiveEngagementChangedSubscription,
} from "@/gql/graphql";

export function useFanEvent(slug: string) {
  const { data, loading, error } = useFanGetEventQuery({
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
        client.cache.updateQuery<FanGetEventQuery>(
          {
            query: FanGetEventDocument,
            variables: { slug },
          },
          (cachedData) => {
            if (!cachedData?.event) return cachedData;

            return {
              event: {
                ...cachedData.event,
                activeEngagement: data.data?.activeEngagementChanged
                  ? { submissions: [], ...data.data.activeEngagementChanged }
                  : null,
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
