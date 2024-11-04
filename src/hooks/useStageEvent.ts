import {
  StageGetEventDocument,
  StageGetEventQuery,
  useOnActiveEngagementChangedSubscription,
  useOnEngagementViewDataChangedSubscription,
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

  const event = data?.event;
  const engagement = event?.activeEngagement;

  useOnEngagementViewDataChangedSubscription({
    skip: !event || !engagement || !engagement.id,
    variables: {
      engagementId: engagement?.id || 0,
    },
    onData: ({ data, client }) => {
      const viewData = data?.data?.engagementViewDataChanged?.viewData;
      if (viewData !== undefined) {
        // Update the Apollo cache with the new active engagement
        client.cache.updateQuery<StageGetEventQuery>(
          {
            query: StageGetEventDocument,
            variables: { slug: event?.slug },
          },
          (cachedData) => {
            if (!cachedData?.event) return cachedData;

            return {
              event: {
                ...cachedData.event,
                activeEngagement: {
                  ...cachedData.event.activeEngagement!,
                  viewData,
                },
              },
            } as StageGetEventQuery;
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
