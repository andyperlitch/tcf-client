import {
  StageEngagementFragment,
  useOnEngagementViewDataChangedSubscription,
  StageGetEventDocument,
  StageGetEventQuery,
  StageEventFragment,
} from "@/gql/graphql";

import { EngagementType } from "@/gql/graphql";
import { StagePhotoCarouselEngagement } from "./StagePhotoCarouselEngagement";
import { StageVoteForEngagement } from "./StageVoteForEngagement";

export function StageActiveEngagement({
  event,
}: {
  event: StageEventFragment;
}) {
  const engagement = event?.activeEngagement;
  useOnEngagementViewDataChangedSubscription({
    skip: !event || !engagement || !engagement.id,
    variables: {
      engagementId: engagement?.id || 0,
    },
    onData: ({ data, client }) => {
      console.log("viewData update:", data);
      if (data?.data?.engagementViewDataChanged?.viewData !== undefined) {
        // Update the Apollo cache with the new active engagement
        client.cache.updateQuery<StageGetEventQuery>(
          {
            query: StageGetEventDocument,
            variables: { slug: event.slug },
          },
          (cachedData) => {
            if (!cachedData?.event) return cachedData;

            return {
              event: {
                ...cachedData.event,
                activeEngagement: {
                  ...cachedData.event.activeEngagement!,
                  viewData: data.data?.engagementViewDataChanged!.viewData,
                } as StageEngagementFragment,
              },
            } as StageGetEventQuery;
          }
        );
      }
    },
  });

  if (!engagement) return null;

  switch (engagement.type) {
    case EngagementType.PhotoCarousel: {
      return <StagePhotoCarouselEngagement engagement={engagement} />;
    }
    case EngagementType.VoteFor: {
      return <StageVoteForEngagement engagement={engagement} />;
    }
    default: {
      return <div>{engagement.title}</div>;
    }
  }
}
