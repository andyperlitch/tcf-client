import { StageEventFragment } from "@/gql/graphql";
import { EngagementType } from "@/gql/graphql";
import { StagePhotoCarouselEngagement } from "./StagePhotoCarouselEngagement";
import { StageVoteForEngagement } from "./StageVoteForEngagement";

export function StageActiveEngagement({
  event,
}: {
  event: StageEventFragment;
}) {
  const engagement = event?.activeEngagement;

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
