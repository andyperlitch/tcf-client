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
        // First, evict the existing activeEngagement from cache
        client.cache.evict({
          id: client.cache.identify({ __typename: "Event", slug }),
          fieldName: "activeEngagement",
        });

        // Then update the cache with the new data
        client.cache.updateQuery<FanGetEventQuery>(
          {
            query: FanGetEventDocument,
            variables: { slug },
          },
          (cachedData) => {
            if (!cachedData?.event) return null;

            console.log(
              `andy data.data.activeEngagementChanged`,
              data?.data?.activeEngagementChanged
            );

            return {
              event: {
                ...cachedData.event,
                activeEngagement: data.data?.activeEngagementChanged
                  ? {
                      ...data.data.activeEngagementChanged,
                      submissions: [], // Add missing required field
                    }
                  : null,
              },
            };
          }
        );

        // Garbage collect any remaining deleted references
        client.cache.gc();
      }
    },
  });

  return {
    data,
    loading,
    error,
  };
}
