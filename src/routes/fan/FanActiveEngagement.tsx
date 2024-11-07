import { EngagementType } from "@/gql/graphql";

import { FanEngagementFragment } from "@/gql/graphql";
import { FanPhotoCarouselEngagement } from "./photo-carousel/FanPhotoCarouselEngagement";
import { FanVoteForEngagement } from "./vote-for/FanVoteForEngagement";

export function FanActiveEngagement({
  engagement,
}: {
  engagement: FanEngagementFragment;
}) {
  switch (engagement.type) {
    case EngagementType.PhotoCarousel:
      return <FanPhotoCarouselEngagement engagement={engagement} />;

    case EngagementType.VoteFor:
      return <FanVoteForEngagement engagement={engagement} />;
  }
}
